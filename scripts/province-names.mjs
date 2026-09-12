/**
 * Canonical province names for the representative converter.
 *
 * `lib/iranLocations.json` is the canonical list of Iran's 31 provinces. The
 * representative spreadsheet is retyped by hand, so its province column drifts:
 * a stray `استان ` prefix, an Arabic ك/ي in place of the Persian ک/ی, a missing
 * or extra space. `provinceId` is a slug of that label and `cityId` is
 * `<provinceId>-<city>`, so any drift silently publishes a second province
 * block in the finder and moves every city id beneath it.
 *
 * This module folds away the differences that carry no meaning and maps the
 * result back to the canonical label. Anything it cannot match — a real
 * misspelling, a missing word, a province that does not exist — throws, so a
 * bad sheet fails the conversion instead of quietly minting a new slug. Both
 * historical typos (`کهکیلویه و بویر احمد`, `سیستان بلوچستان`) fail this way by
 * design: a wrong letter and a missing word are not formatting noise, and
 * guessing at them is how the wrong label shipped in the first place.
 *
 * Dependency-free, like the converter that uses it.
 */
import fs from 'node:fs';

/** Zero-width non-joiner and the bidi marks Excel likes to leave behind. */
const INVISIBLE = /[‌‎‏]/g;

/**
 * Arabic codepoints that are typed interchangeably with their Persian
 * counterparts. Folding them is safe: no two province names differ by one.
 */
const LETTER_VARIANTS = [
  [/ي/g, 'ی'], // ي -> ی
  [/ك/g, 'ک'], // ك -> ک
  [/ة/g, 'ه'], // ة -> ه
  [/[أإآ]/g, 'ا'], // أ إ آ -> ا
];

const PROVINCE_PREFIX = /^استان\s+/;

/**
 * Reduces a label to the form used for lookup: no `استان ` prefix, no invisible
 * characters, Persian letter forms, and no whitespace at all. Dropping
 * whitespace is what lets `بویر احمد` match `بویراحمد`; it is safe because no
 * two canonical province names collide once folded (asserted below).
 */
export function foldProvinceName(value) {
  let folded = String(value ?? '')
    .replace(INVISIBLE, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(PROVINCE_PREFIX, '');

  for (const [pattern, replacement] of LETTER_VARIANTS) {
    folded = folded.replace(pattern, replacement);
  }

  return folded.replace(/\s+/g, '');
}

/** Levenshtein distance, used only to suggest candidates in an error message. */
function editDistance(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  let previous = Array.from({ length: cols }, (_, i) => i);

  for (let i = 1; i < rows; i++) {
    const current = [i];
    for (let j = 1; j < cols; j++) {
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous = current;
  }

  return previous[cols - 1];
}

/**
 * Builds a canonicalizer over an explicit list of province names. Exported so
 * tests can exercise it without touching the real locations file.
 */
export function createProvinceCanonicalizer(names) {
  const byFold = new Map();

  for (const name of names) {
    const key = foldProvinceName(name);
    if (!key) {
      throw new Error(`Canonical province list contains an empty name: ${JSON.stringify(name)}`);
    }
    const existing = byFold.get(key);
    if (existing && existing !== name) {
      throw new Error(
        `Canonical province names "${existing}" and "${name}" fold to the same key ` +
          `(${key}). Folding is only safe while every province stays distinct.`,
      );
    }
    byFold.set(key, name);
  }

  /**
   * Returns the canonical label for a spreadsheet value. A blank value returns
   * an empty string, because the converter uses that to skip padding rows.
   * Anything non-blank that does not match throws.
   */
  function canonicalizeProvince(value, context = '') {
    const key = foldProvinceName(value);
    if (!key) {
      return '';
    }

    const canonical = byFold.get(key);
    if (canonical) {
      return canonical;
    }

    const suggestions = [...byFold.values()]
      .map((name) => [editDistance(key, foldProvinceName(name)), name])
      .sort((a, b) => a[0] - b[0])
      .slice(0, 3)
      .map(([distance, name]) => `"${name}" (distance ${distance})`)
      .join(', ');

    throw new Error(
      `Unknown province ${JSON.stringify(String(value ?? '').trim())}${context ? ` (${context})` : ''}. ` +
        `Province names are canonical in lib/iranLocations.json — fix the spreadsheet, not the JSON. ` +
        `Closest matches: ${suggestions}.`,
    );
  }

  return { canonicalizeProvince, canonicalNames: () => [...byFold.values()] };
}

/** Reads the canonical province names from the app's locations file. */
export function loadCanonicalProvinceNames(
  file = new URL('../lib/iranLocations.json', import.meta.url),
) {
  const provinces = JSON.parse(fs.readFileSync(file, 'utf8'));
  return provinces.map((province) => province.labels.fa);
}

const defaultCanonicalizer = createProvinceCanonicalizer(loadCanonicalProvinceNames());

/**
 * Canonicalizes a spreadsheet province label against `lib/iranLocations.json`.
 * Pass `context` (e.g. a row number) so a failure points at the offending row.
 */
export function canonicalizeProvince(value, context) {
  return defaultCanonicalizer.canonicalizeProvince(value, context);
}
