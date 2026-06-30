// IndexNow submitter for hisense-ir.com.
//
// Reads the LIVE sitemap and submits every URL to IndexNow in one bulk POST, so
// Bing / Yandex / Seznam re-crawl changed pages within minutes of a deploy.
// IndexNow is a Bing-family protocol — Google does NOT participate and ignores
// it entirely, so this can never affect Google Search Console either way.
//
// Ownership is proved by hosting the key as a plain-text file at
//   https://www.hisense-ir.com/<KEY>.txt   (public/<KEY>.txt in this repo)
// whose body is the key itself. KEY below MUST match that file's name + content.
//
// Run: node ops/indexnow-ping.mjs [--base https://www.hisense-ir.com]
// Called post-reload (backgrounded, non-fatal) by ops/deploy.sh.

const KEY = '73badcff89d65693b8c2ff1bdf9c919a';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const TIMEOUT_MS = 20000;
const MAX_URLS = 10000; // IndexNow per-request cap

const argv = process.argv.slice(2);
const BASE = (
  (argv.includes('--base') ? argv[argv.indexOf('--base') + 1] : process.env.INDEXNOW_BASE) ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://www.hisense-ir.com'
).replace(/\/+$/, '');

const host = new URL(BASE).host;

async function fetchWithTimeout(url, opts = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { signal: ctrl.signal, ...opts });
  } finally {
    clearTimeout(t);
  }
}

async function main() {
  // 1. Read the live sitemap and extract <loc> URLs (same source the audit uses).
  let urls = [];
  try {
    const res = await fetchWithTimeout(`${BASE}/sitemap.xml`);
    if (!res.ok) {
      console.error(`IndexNow: sitemap fetch failed (HTTP ${res.status}) — nothing submitted.`);
      process.exit(1);
    }
    const xml = await res.text();
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => m[1].trim())
      // IndexNow rejects the whole batch if any URL is off the keyLocation host.
      .filter((u) => {
        try {
          return new URL(u).host === host;
        } catch {
          return false;
        }
      });
  } catch (e) {
    console.error(`IndexNow: cannot read sitemap ${BASE}/sitemap.xml: ${e.message}`);
    process.exit(1);
  }

  urls = [...new Set(urls)].slice(0, MAX_URLS);
  if (urls.length === 0) {
    console.error('IndexNow: sitemap returned no same-host URLs — nothing submitted.');
    process.exit(1);
  }

  // 2. Bulk-submit.
  const body = {
    host,
    key: KEY,
    keyLocation: `${BASE}/${KEY}.txt`,
    urlList: urls,
  };

  try {
    const res = await fetchWithTimeout(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    // 200 OK / 202 Accepted both mean success. 4xx = key/host problem worth logging.
    const note = await res.text().catch(() => '');
    if (res.status === 200 || res.status === 202) {
      console.log(`IndexNow: submitted ${urls.length} URLs for ${host} (HTTP ${res.status}).`);
    } else {
      console.error(
        `IndexNow: submit returned HTTP ${res.status} for ${host}. ${note}`.trim() +
          `\n  Verify ${BASE}/${KEY}.txt is live and contains "${KEY}".`,
      );
      process.exit(1);
    }
  } catch (e) {
    console.error(`IndexNow: submit failed: ${e.message}`);
    process.exit(1);
  }
}

main();
