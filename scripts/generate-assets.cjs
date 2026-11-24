/**
 * Regenerates the favicon set and the Open Graph share image in /public,
 * from the transparent logo files in public/brand/.
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
const dataUrl = (file, type) => `data:${type};base64,${fs.readFileSync(file).toString('base64')}`;
// Fonts are inlined as data: URLs (pages opened with setContent can't read file:// URLs).
const font = (pkg, file) =>
  dataUrl(path.join(root, 'node_modules/@fontsource-variable', pkg, 'files', file), 'font/woff2');

/** The DNA + circuit emblem, transparent (cut from the official logo). */
const MARK = dataUrl(path.join(pub, 'brand', 'redoxtronics-mark.png'), 'image/png');
const NAVY = '#071233';

const fontFaces = `
@font-face { font-family: 'Sora'; src: url(${font('sora', 'sora-latin-wght-normal.woff2')}) format('woff2'); font-weight: 100 800; }
@font-face { font-family: 'Inter'; src: url(${font('inter', 'inter-latin-wght-normal.woff2')}) format('woff2'); font-weight: 100 900; }
@font-face { font-family: 'JetBrains Mono'; src: url(${font('jetbrains-mono', 'jetbrains-mono-latin-wght-normal.woff2')}) format('woff2'); font-weight: 100 800; }
`;

/**
 * An icon: the emblem centred on navy.
 * `scale` is the emblem height as a share of the icon; `radius` rounds the tile (0 = full-bleed square).
 */
function iconPage(size, { scale = 0.74, radius = 0 } = {}) {
  return `<!doctype html><html><head><style>
    html, body { margin: 0; width: ${size}px; height: ${size}px; background: transparent; }
    .tile { width: ${size}px; height: ${size}px; display: grid; place-items: center; background: ${NAVY};
      background-image: radial-gradient(80% 80% at 50% 35%, rgb(65 105 225 / .45), transparent 70%);
      border-radius: ${radius * size}px; }
    img { height: ${Math.round(size * scale)}px; width: auto; }
  </style></head><body><div class="tile"><img src="${MARK}"></div></body></html>`;
}

const LOCKUP = `<div class="logo"><img src="${MARK}"><div class="type"><div class="name"><span class="r">REDOX</span><span class="b">TRONICS</span></div><div class="sub">TECHNOLOGIES</div></div></div>`;

function ogPage(panelSvg) {
  return `<!doctype html><html><head><style>
    ${fontFaces}
    :root { --font-mono: 'JetBrains Mono'; --font-display: 'Sora'; --royal-300: #98aff6; --cyan-400: #5ad1ff; }
    * { box-sizing: border-box; margin: 0; }
    body { width: 1200px; height: 630px; overflow: hidden; color: #f4f7ff; font-family: Inter, sans-serif; position: relative;
      background: radial-gradient(60% 80% at 80% 10%, rgb(65 105 225 / .45), transparent 62%), linear-gradient(180deg, #081538, #071233 50%, #050d27); }
    .grid { position: absolute; inset: 0; background-image: linear-gradient(rgb(255 255 255 / .045) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / .045) 1px, transparent 1px); background-size: 44px 44px; mask-image: radial-gradient(90% 90% at 75% 40%, #000 30%, transparent 80%); }
    .wrap { position: absolute; inset: 0; display: grid; grid-template-columns: 560px 1fr; padding: 48px 56px 52px 64px; gap: 40px; }
    .left { display: flex; flex-direction: column; }
    .logo { display: flex; align-items: center; gap: 16px; }
    .logo img { height: 78px; width: auto; filter: drop-shadow(0 8px 18px rgb(65 105 225 / .45)); }
    .type { display: grid; justify-items: center; line-height: 1; }
    .name { font-family: Sora; font-weight: 700; font-size: 34px; letter-spacing: .005em; }
    .name .r { color: #e2312e; } .name .b { color: #3390d6; }
    .sub { margin-top: 9px; padding-left: .3em; font-family: Sora; font-weight: 600; font-size: 16px; letter-spacing: .3em; color: #f4f7ff; }
    h1 { margin-top: 50px; font-family: Sora; font-weight: 650; font-size: 68px; line-height: 1.02; letter-spacing: -.035em; }
    h1 span { background: linear-gradient(100deg, #b9c9ff 0%, #7b9bff 38%, #4169e1 68%, #5ad1ff 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
    p.tag { margin-top: 22px; font-size: 23px; color: #c7d2ee; line-height: 1.4; max-width: 30ch; }
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
        ${LOCKUP}
        <h1>Where <span>redox</span> meets electronics.</h1>
        <p class="tag">R&amp;D in electrochemical workstations, gas sensors &amp; embedded systems</p>
        <div class="chips"><span>Electrochemical workstations</span><span>Gas sensors</span><span>Embedded systems</span></div>
      </div>
      <div class="panel">${panelSvg}</div>
    </div>
  </body></html>`;
}

async function shot(browser, size, opts, file) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(iconPage(size, opts), { waitUntil: 'load' });
  const data = await page.screenshot({ omitBackground: true, ...(file ? { path: file } : {}) });
  await page.close();
  return data;
}

(async () => {
  const browser = await chromium.launch();

  // App icons: full-bleed squares (each platform applies its own rounding).
  await shot(browser, 180, { scale: 0.74 }, path.join(pub, 'apple-touch-icon.png'));
  await shot(browser, 192, { scale: 0.74 }, path.join(pub, 'icon-192.png'));
  await shot(browser, 512, { scale: 0.74 }, path.join(pub, 'icon-512.png'));
  await shot(browser, 512, { scale: 0.56 }, path.join(pub, 'icon-maskable-512.png'));

  // favicon.ico — rounded tiles as PNG-compressed entries (16, 32, 48 px).
  const pngs = [];
  for (const size of [16, 32, 48]) pngs.push({ size, data: await shot(browser, size, { scale: 0.84, radius: 0.22 }) });
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
