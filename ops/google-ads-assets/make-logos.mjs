// Generates upload-ready Google Ads logo PNGs from the Hisense wordmark SVG.
// Google Ads (Performance Max) needs PNG/JPG, not SVG:
//   - square logo  : 1:1  (min 128x128, recommended 1200x1200)
//   - landscape    : 4:1  (min 512x128,  recommended 1200x300)
// Run: node ops/google-ads-assets/make-logos.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..', '..');
const svg = readFileSync(join(repo, 'public', 'icons', 'hisense-logo-full.svg'));
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

async function render(svgBuf, targetWidth) {
  // Rasterize the SVG at the requested width (height follows aspect ratio).
  return sharp(svgBuf, { density: 300, limitInputPixels: false })
    .resize({ width: targetWidth })
    .png()
    .toBuffer();
}

async function build({ out, canvasW, canvasH, logoW, background }) {
  const logo = await render(svg, logoW);
  const meta = await sharp(logo).metadata();
  await sharp({
    create: { width: canvasW, height: canvasH, channels: 4, background },
  })
    .composite([
      {
        input: logo,
        left: Math.round((canvasW - meta.width) / 2),
        top: Math.round((canvasH - meta.height) / 2),
      },
    ])
    .png()
    .toFile(join(here, out));
  console.log(`wrote ${out}  (logo ${meta.width}x${meta.height} on ${canvasW}x${canvasH})`);
}

await build({
  out: 'hisense-logo-square-1200-white.png',
  canvasW: 1200,
  canvasH: 1200,
  logoW: 920,
  background: WHITE,
});
await build({
  out: 'hisense-logo-square-1200-transparent.png',
  canvasW: 1200,
  canvasH: 1200,
  logoW: 920,
  background: { r: 0, g: 0, b: 0, alpha: 0 },
});
await build({
  out: 'hisense-logo-landscape-1200x300-white.png',
  canvasW: 1200,
  canvasH: 300,
  logoW: 1040,
  background: WHITE,
});
console.log('done');
