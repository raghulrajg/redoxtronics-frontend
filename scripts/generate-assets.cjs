/**
 * Regenerates the favicon set and the Open Graph share image in /public.
 *
 * Optional — the generated files are committed, so you only need this after
 * changing the logo, colours or headline.
 *
 *   npm run build                     # the share image reuses the hero panel from dist/
 *   npm i -D playwright && npx playwright install chromium
 *   npm run assets
 */
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const pub = path.join(root, 'public');
// Fonts are inlined as data: URLs (pages opened with setContent can't read file:// URLs).
const font = (pkg, file) =>
  `data:font/woff2;base64,${fs
    .readFileSync(path.join(root, 'node_modules/@fontsource-variable', pkg, 'files', file))
    .toString('base64')}`;

const ARROWS = `
  <path d="M8 12.5h15.5l-4.6-4.2" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M24 19.5H8.5l4.6 4.2" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
const GRADIENT = `
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#6188f3"/><stop offset="0.45" stop-color="#4169e1"/><stop offset="1" stop-color="#2642a8"/>
  </linearGradient></defs>`;

/** Rounded tile (favicon, logo). */
const MARK = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">${GRADIENT}
  <rect width="32" height="32" rx="9" fill="url(#g)"/>${ARROWS}
</svg>`;

/** Full-bleed square (app icons: the platform applies its own rounding). */
const SQUARE = (inset = 0) => `<svg viewBox="${-inset} ${-inset} ${32 + 2 * inset} ${32 + 2 * inset}" xmlns="http://www.w3.org/2000/svg">${GRADIENT}
  <rect x="${-inset}" y="${-inset}" width="${32 + 2 * inset}" height="${32 + 2 * inset}" fill="url(#g)"/>${ARROWS}
</svg>`;

const fontFaces = `
@font-face { font-family: 'Sora'; src: url(${font('sora', 'sora-latin-wght-normal.woff2')}) format('woff2'); font-weight: 100 800; }
@font-face { font-family: 'Inter'; src: url(${font('inter', 'inter-latin-wght-normal.woff2')}) format('woff2'); font-weight: 100 900; }
@font-face { font-family: 'JetBrains Mono'; src: url(${font('jetbrains-mono', 'jetbrains-mono-latin-wght-normal.woff2')}) format('woff2'); font-weight: 100 800; }
`;

function iconPage(size, svg) {
  return `<!doctype html><html><head><style>
    html, body { margin: 0; width: ${size}px; height: ${size}px; background: transparent; }
    svg { display: block; width: ${size}px; height: ${size}px; }
  </style></head><body>${svg}</body></html>`;
}

function ogPage(panelSvg) {
  return `<!doctype html><html><head><style>
    ${fontFaces}
    :root { --font-mono: 'JetBrains Mono'; --font-display: 'Sora'; --royal-300: #98aff6; --cyan-400: #5ad1ff; }
    * { box-sizing: border-box; margin: 0; }
    body { width: 1200px; height: 630px; overflow: hidden; color: #f4f7ff; font-family: Inter, sans-serif; position: relative;
      background: radial-gradient(60% 80% at 80% 10%, rgb(65 105 225 / .45), transparent 62%), linear-gradient(180deg, #081538, #071233 50%, #050d27); }
    .grid { position: absolute; inset: 0; background-image: linear-gradient(rgb(255 255 255 / .045) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / .045) 1px, transparent 1px); background-size: 44px 44px; mask-image: radial-gradient(90% 90% at 75% 40%, #000 30%, transparent 80%); }
    .wrap { position: absolute; inset: 0; display: grid; grid-template-columns: 560px 1fr; padding: 56px 56px 52px 64px; gap: 40px; }
    .left { display: flex; flex-direction: column; }
    .logo { display: flex; align-items: center; gap: 16px; }
    .logo svg { width: 52px; height: 52px; border-radius: 15px; box-shadow: 0 10px 24px -8px rgb(65 105 225 / .9); }
    .name { font-family: Sora; font-weight: 700; font-size: 30px; letter-spacing: -.02em; line-height: 1; }
    .name b { font-weight: 500; color: #98aff6; }
    .sub { margin-top: 8px; font-family: 'JetBrains Mono'; font-size: 12px; letter-spacing: .2em; color: #7b8cb8; text-transform: uppercase; }
    h1 { margin-top: 64px; font-family: Sora; font-weight: 650; font-size: 70px; line-height: 1.02; letter-spacing: -.035em; }
    h1 span { background: linear-gradient(100deg, #b9c9ff 0%, #7b9bff 38%, #4169e1 68%, #5ad1ff 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
    p.tag { margin-top: 24px; font-size: 23px; color: #c7d2ee; line-height: 1.4; max-width: 30ch; }
    .chips { margin-top: auto; display: flex; flex-wrap: wrap; gap: 10px; }
    .chips span { padding: 7px 12px; border: 1px solid rgb(255 255 255 / .17); border-radius: 999px; font-family: 'JetBrains Mono'; font-size: 13px; letter-spacing: .02em; color: #c7d2ee; background: rgb(255 255 255 / .04); }
    .panel { align-self: center; }
    .panel svg { display: block; width: 100%; height: auto; border-radius: 18px; box-shadow: 0 40px 80px -30px #000; }
    .ill__label { font-family: 'JetBrains Mono'; font-size: 10px; letter-spacing: .06em; fill: #8ea0cc; }
    .ill__label--strong { fill: #e8eeff; }
    .ill__label--accent { fill: #98aff6; }
    .ill__label--dim { fill: #6f80ad; font-size: 9px; }
    .ip__value { font-family: Sora; font-size: 18px; font-weight: 600; letter-spacing: -.01em; fill: #eef2ff; }
  </style></head><body>
    <div class="grid"></div>
    <div class="wrap">
      <div class="left">
        <div class="logo">${MARK}<div><div class="name">Redox<b>tronics</b></div><div class="sub">Electrochemical R&amp;D</div></div></div>
        <h1>Where <span>redox</span> meets electronics.</h1>
        <p class="tag">R&amp;D in electrochemical workstations, gas sensors &amp; embedded systems</p>
        <div class="chips"><span>Electrochemical workstations</span><span>Gas sensors</span><span>Embedded systems</span></div>
      </div>
      <div class="panel">${panelSvg}</div>
    </div>
  </body></html>`;
}

async function shot(browser, size, svg, file) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(iconPage(size, svg));
  const data = await page.screenshot({ omitBackground: true, ...(file ? { path: file } : {}) });
  await page.close();
  return data;
}

(async () => {
  const browser = await chromium.launch();

  // Favicons and app icons
  fs.writeFileSync(path.join(pub, 'favicon.svg'), MARK.trim() + '\n');
  await shot(browser, 180, SQUARE(), path.join(pub, 'apple-touch-icon.png'));
  await shot(browser, 192, SQUARE(), path.join(pub, 'icon-192.png'));
  await shot(browser, 512, SQUARE(), path.join(pub, 'icon-512.png'));
  await shot(browser, 512, SQUARE(4), path.join(pub, 'icon-maskable-512.png'));

  // favicon.ico — PNG-compressed entries (16, 32, 48 px), supported by all current browsers.
  const pngs = [];
  for (const size of [16, 32, 48]) pngs.push({ size, data: await shot(browser, size, MARK) });
  const header = Buffer.alloc(6 + 16 * pngs.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach(({ size, data }, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(size, e);
    header.writeUInt8(size, e + 1);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  fs.writeFileSync(path.join(pub, 'favicon.ico'), Buffer.concat([header, ...pngs.map((p) => p.data)]));

  // Open Graph image (reuses the server-rendered instrument panel from the build)
  const distIndex = path.join(root, 'dist', 'index.html');
  if (fs.existsSync(distIndex)) {
    const html = fs.readFileSync(distIndex, 'utf8');
    const match = html.match(/<svg[^>]*data-cv-panel[^>]*>[\s\S]*?<\/svg>/);
    if (!match) throw new Error('Could not find the instrument panel SVG in dist/index.html');
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await page.setContent(ogPage(match[0]), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    // Freeze the animated trace at a nice spot on the curve.
    await page.evaluate(() => {
      const svg = document.querySelector('svg[data-cv-panel]');
      svg.pauseAnimations();
      svg.setCurrentTime(2.0);
    });
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(pub, 'og-image.png') });
    await page.close();
  } else {
    console.warn('dist/index.html not found — run `npm run build` first to regenerate og-image.png');
  }

  await browser.close();
  console.log('Assets written to /public');
})();
