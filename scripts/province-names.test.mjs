/**
 * Tests for the province canonicalization the representative converter applies.
 *
 * Run with `npm test` (Node's built-in runner — no test dependency).
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
  canonicalizeProvince,
  createProvinceCanonicalizer,
  foldProvinceName,
  loadCanonicalProvinceNames,
} from './province-names.mjs';

const CANONICAL = loadCanonicalProvinceNames();

const KOHGILUYEH = 'کهگیلویه و بویراحمد';
const SISTAN = 'سیستان و بلوچستان';
const RAZAVI = 'خراسان رضوی';

test('the canonical list is the 31 provinces from lib/iranLocations.json', () => {
  assert.equal(CANONICAL.length, 31);
  assert.ok(CANONICAL.includes(KOHGILUYEH));
  assert.ok(CANONICAL.includes(SISTAN));
});

test('every canonical province round-trips to itself', () => {
  for (const name of CANONICAL) {
    assert.equal(canonicalizeProvince(name), name);
  }
});

test('the استان prefix is stripped and the canonical bare name returned', () => {
  assert.equal(canonicalizeProvince(`استان ${RAZAVI}`), RAZAVI);
  assert.equal(canonicalizeProvince(`استان   ${RAZAVI}  `), RAZAVI);
});

test('Arabic letter forms fold to their Persian counterparts', () => {
  // كرمان with an Arabic ك, and آذربايجان with an Arabic ي.
  assert.equal(canonicalizeProvince('كرمان'), 'کرمان');
  assert.equal(canonicalizeProvince('آذربايجان شرقی'), 'آذربایجان شرقی');
});

test('spacing differences fold, including the historical بویر احمد split', () => {
  assert.equal(canonicalizeProvince('کهگیلویه و بویر احمد'), KOHGILUYEH);
  assert.equal(canonicalizeProvince('استان کهگیلویه و بویر احمد'), KOHGILUYEH);
  assert.equal(canonicalizeProvince('خراسان    رضوی'), RAZAVI);
});

test('a zero-width non-joiner does not defeat the match', () => {
  assert.equal(canonicalizeProvince(`خراسان‌رضوی`), RAZAVI);
});

test('both historical typos now fail instead of minting a new slug', () => {
  // ک instead of گ — a wrong letter, not formatting noise.
  assert.throws(() => canonicalizeProvince('کهکیلویه و بویر احمد'), /Unknown province/);
  // missing و
  assert.throws(() => canonicalizeProvince('سیستان بلوچستان'), /Unknown province/);
});

test('an unknown province fails with an actionable message', () => {
  assert.throws(
    () => canonicalizeProvince('استان ناکجاآباد', 'row 42'),
    (error) => {
      assert.match(error.message, /Unknown province/);
      assert.match(error.message, /ناکجاآباد/);
      assert.match(error.message, /row 42/);
      assert.match(error.message, /lib\/iranLocations\.json/);
      assert.match(error.message, /Closest matches/);
      return true;
    },
  );
});

test('the failure names the near-miss as a closest match', () => {
  try {
    canonicalizeProvince('سیستان بلوچستان');
    assert.fail('expected a throw');
  } catch (error) {
    assert.match(error.message, new RegExp(SISTAN));
  }
});

test('a blank cell returns an empty string so padding rows stay skippable', () => {
  for (const blank of ['', '   ', null, undefined, '‌']) {
    assert.equal(canonicalizeProvince(blank), '');
  }
});

test('folding is stable for values that differ only in invisible characters', () => {
  assert.equal(foldProvinceName(`استان ${RAZAVI}`), foldProvinceName(RAZAVI));
  assert.equal(foldProvinceName('کهگیلویه و بویر احمد'), foldProvinceName(KOHGILUYEH));
  assert.notEqual(foldProvinceName('کهکیلویه و بویراحمد'), foldProvinceName(KOHGILUYEH));
});

test('no two canonical provinces collide once folded', () => {
  const keys = CANONICAL.map(foldProvinceName);
  assert.equal(new Set(keys).size, keys.length);
});

test('constructing over a colliding list is rejected', () => {
  assert.throws(
    () => createProvinceCanonicalizer(['خراسان رضوی', 'خراسانرضوی']),
    /fold to the same key/,
  );
});

test('an empty canonical name is rejected', () => {
  assert.throws(() => createProvinceCanonicalizer(['کرمان', '  ']), /empty name/);
});

test('the published serviceCenters.json uses only canonical province names', () => {
  const centers = JSON.parse(
    fs.readFileSync(new URL('../content/service-centers/serviceCenters.json', import.meta.url)),
  );
  const labels = [...new Set(centers.map((center) => center.provinceName.en))];

  assert.ok(labels.length > 0);
  for (const label of labels) {
    assert.equal(canonicalizeProvince(label), label, `"${label}" is not canonical`);
  }
});
