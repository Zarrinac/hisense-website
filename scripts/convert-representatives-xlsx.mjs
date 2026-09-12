/* eslint-disable no-console */
/**
 * Regenerates content/service-centers/serviceCenters.json from the representatives
 * spreadsheet in public/representatives/.
 *
 * Usage:
 *   node scripts/convert-representatives-xlsx.mjs <path-to-xlsx> [--out <json>] [--check]
 *
 * --check compares against the existing JSON and exits non-zero on any difference
 * instead of writing.
 *
 * The .xlsx reader below is intentionally dependency-free (zip + SpreadsheetML)
 * so refreshing the representative list never requires adding a build dependency.
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { canonicalizeProvince } from './province-names.mjs';

/* ---------------------------------------------------------------- xlsx read */

function readZipEntries(file) {
  const buf = fs.readFileSync(file);
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error(`Not a zip/xlsx file: ${file}`);

  const count = buf.readUInt16LE(eocd + 10);
  let off = buf.readUInt32LE(eocd + 16);
  const entries = new Map();

  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(off) !== 0x02014b50) throw new Error('Corrupt central directory');
    const method = buf.readUInt16LE(off + 10);
    const compSize = buf.readUInt32LE(off + 20);
    const nameLen = buf.readUInt16LE(off + 28);
    const extraLen = buf.readUInt16LE(off + 30);
    const commentLen = buf.readUInt16LE(off + 32);
    const localOff = buf.readUInt32LE(off + 42);
    const name = buf.toString('utf8', off + 46, off + 46 + nameLen);

    const dataStart =
      localOff + 30 + buf.readUInt16LE(localOff + 26) + buf.readUInt16LE(localOff + 28);
    const raw = buf.subarray(dataStart, dataStart + compSize);
    entries.set(name, method === 0 ? raw : zlib.inflateRawSync(raw));

    off += 46 + nameLen + extraLen + commentLen;
  }
  return entries;
}

const XML_ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'" };

function unescapeXml(value) {
  return value
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&(amp|lt|gt|quot|apos);/g, (match) => XML_ENTITIES[match]);
}

function readSharedStrings(entries) {
  const raw = entries.get('xl/sharedStrings.xml');
  if (!raw) return [];
  const xml = raw.toString('utf8');
  const strings = [];
  for (const si of xml.matchAll(/<si>([\s\S]*?)<\/si>/g)) {
    let text = '';
    for (const t of si[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)) text += unescapeXml(t[1]);
    strings.push(text);
  }
  return strings;
}

function columnIndex(ref) {
  const letters = /^[A-Z]+/.exec(ref)[0];
  let n = 0;
  for (const ch of letters) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

function readFirstSheet(file) {
  const entries = readZipEntries(file);
  const shared = readSharedStrings(entries);

  const workbook = entries.get('xl/workbook.xml').toString('utf8');
  const relsXml = entries.get('xl/_rels/workbook.xml.rels').toString('utf8');
  const rels = {};
  for (const rel of relsXml.matchAll(/<Relationship\s[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"/g)) {
    rels[rel[1]] = rel[2].replace(/^\/?xl\//, '');
  }
  const first = /<sheet\s[^>]*r:id="([^"]+)"[^>]*\/>/.exec(workbook);
  if (!first) throw new Error('No sheet found in workbook');

  const xml = entries.get(`xl/${rels[first[1]]}`).toString('utf8');
  const rows = [];

  for (const rowMatch of xml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)) {
    const cells = [];
    for (const cellMatch of rowMatch[1].matchAll(/<c\s([^>]*?)\/?>(?:([\s\S]*?)<\/c>)?/g)) {
      const ref = /r="([A-Z]+\d+)"/.exec(cellMatch[1])?.[1];
      if (!ref) continue;
      const type = /t="([^"]+)"/.exec(cellMatch[1])?.[1];
      const inner = cellMatch[2] ?? '';
      let value = '';
      if (type === 'inlineStr') {
        for (const t of inner.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)) value += unescapeXml(t[1]);
      } else {
        const v = /<v>([\s\S]*?)<\/v>/.exec(inner)?.[1];
        if (v != null) value = type === 's' ? (shared[Number(v)] ?? '') : unescapeXml(v);
      }
      cells[columnIndex(ref)] = value;
    }
    rows.push(Array.from({ length: cells.length }, (_, i) => cells[i] ?? ''));
  }
  return rows;
}

/* --------------------------------------------------------------- normalizing */

const SERVICE_KINDS = new Set(['tv', 'ha', 'rac', 'cac', 'vrf']);

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

function text(value) {
  return String(value ?? '')
    .replace(/[‌‎‏]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function digits(value) {
  let out = '';
  for (const ch of String(value ?? '')) {
    const fa = PERSIAN_DIGITS.indexOf(ch);
    const ar = ARABIC_DIGITS.indexOf(ch);
    if (fa >= 0) out += String(fa);
    else if (ar >= 0) out += String(ar);
    else if (ch >= '0' && ch <= '9') out += ch;
  }
  return out;
}

/** Excel stores phones as numbers, dropping the leading 0. Restore it. */
function phone(value) {
  const raw = digits(value);
  // A handful of source rows carry 3-digit fragments in the phone columns.
  if (raw.length < 7) return '';
  if (raw.startsWith('0')) return raw;
  if (raw.length === 10) return `0${raw}`;
  return raw;
}

/** Province/city ids are space-free so they stay usable in URLs and filters. */
function slug(value) {
  return text(value).replace(/\s+/g, '-');
}

/**
 * Province labels are canonicalized against lib/iranLocations.json, so a
 * retyped cell can never mint a new province slug: the "استان" prefix, Arabic
 * letter forms and stray spaces are folded away, and anything that still does
 * not match a real province throws (see scripts/province-names.mjs). The
 * published label always carries the prefix, otherwise the same province sorts
 * as two separate blocks in the finder (which orders by provinceName).
 */
function provinceLabels(value, context) {
  const bare = canonicalizeProvince(value, context);
  return { bare, full: bare && `استان ${bare}` };
}

/**
 * A few city cells qualify the city with its county, e.g. "فیض آباد(مه ولات)".
 * The published label uses the bare city name so one city stays one entry in
 * the city dropdown.
 */
function cityLabel(value) {
  return text(text(value).replace(/\s*\([^)]*\)\s*$/, ''));
}

function serviceKind(value) {
  const code = /\(([A-Za-z]+)\)/.exec(String(value ?? ''))?.[1]?.toLowerCase();
  if (!code || !SERVICE_KINDS.has(code)) {
    throw new Error(`Unrecognized service kind: ${JSON.stringify(value)}`);
  }
  return code;
}

function localized(value) {
  const t = text(value);
  return { fa: t, en: t };
}

function convert(rows) {
  const [header, ...body] = rows;
  const expected = ['استان', 'شهر', 'نوع فعالیت نماینده', 'نام و نام خانوادگی', 'کد نمایندگی'];
  expected.forEach((label, index) => {
    if (text(header[index]) !== label) {
      throw new Error(
        `Unexpected column ${index}: got "${text(header[index])}", expected "${label}"`,
      );
    }
  });

  const centers = [];
  for (const [index, row] of body.entries()) {
    const city = cityLabel(row[1]);
    // The header is row 1, so body[0] is spreadsheet row 2.
    const { bare: provinceLabel, full: provinceFull } = provinceLabels(row[0], `row ${index + 2}`);
    if (!provinceLabel || !city) continue;

    const provinceId = slug(provinceLabel);
    const sequence = String(centers.length + 1).padStart(4, '0');

    centers.push({
      id: `rep-${sequence}`,
      provinceId,
      cityId: `${provinceId}-${slug(city)}`,
      provinceName: { fa: provinceFull, en: provinceLabel },
      cityName: { fa: city, en: city },
      serviceKind: serviceKind(row[2]),
      representativeName: localized(row[3]),
      representativeCode: text(row[4]),
      primaryPhone: phone(row[5]),
      mobilePhone: phone(row[6]),
      address: localized(row[7]),
    });
  }
  return centers;
}

/**
 * A blank cell in a refreshed spreadsheet should not wipe a field we already
 * publish, so empty address/phone values inherit the previous dataset's value
 * for the same representative. Matched on code + service kind because one
 * representative can appear under several kinds.
 */
function carryForward(centers, previous) {
  const key = (center) => `${center.representativeCode}|${center.serviceKind}`;
  const byKey = new Map(previous.map((center) => [key(center), center]));
  const carried = [];

  for (const center of centers) {
    const prev = byKey.get(key(center));
    if (!prev) continue;

    for (const field of ['primaryPhone', 'mobilePhone']) {
      if (!center[field] && prev[field]) {
        center[field] = prev[field];
        carried.push(`${center.representativeCode} ${field}`);
      }
    }
    if (!center.address.fa && prev.address.fa) {
      center.address = { ...prev.address };
      carried.push(`${center.representativeCode} address`);
    }
  }
  return carried;
}

/* ---------------------------------------------------------------------- main */

const args = process.argv.slice(2);
const check = args.includes('--check');
const outIndex = args.indexOf('--out');
const outPath = path.resolve(
  outIndex >= 0 ? args[outIndex + 1] : 'content/service-centers/serviceCenters.json',
);
const source = args.find((arg, i) => !arg.startsWith('--') && args[i - 1] !== '--out');

if (!source) {
  console.error(
    'Usage: node scripts/convert-representatives-xlsx.mjs <xlsx> [--out <json>] [--check]',
  );
  process.exit(1);
}

const centers = convert(readFirstSheet(path.resolve(source)));

const previousRaw = fs.existsSync(outPath) ? fs.readFileSync(outPath, 'utf8') : '';
if (previousRaw) {
  const carried = carryForward(centers, JSON.parse(previousRaw));
  if (carried.length)
    console.log(`Carried forward ${carried.length} blank field(s):`, carried.join(', '));
}

const json = `${JSON.stringify(centers, null, 2)}\n`;

const byKind = centers.reduce(
  (acc, c) => ({ ...acc, [c.serviceKind]: (acc[c.serviceKind] ?? 0) + 1 }),
  {},
);
console.log(`Parsed ${centers.length} representatives from ${source}`);
console.log('By service kind:', byKind);

if (check) {
  if (previousRaw.trim() === json.trim()) {
    console.log('✓ Matches existing JSON');
  } else {
    console.error('✗ Differs from existing JSON');
    process.exitCode = 1;
  }
} else {
  fs.writeFileSync(outPath, json, 'utf8');
  console.log(`Wrote ${outPath}`);
}
