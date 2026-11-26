/**
 * Publishes the latest software releases on the website.
 *
 * For every entry in src/data/release-sources.json this script asks GitHub
 * for the newest published release of that repository, then:
 *   - downloads the matching files into public/releases/<id>/
 *     (served on the website as /releases/<id>/<file name>)
 *   - writes the version details to src/data/releases.generated.json,
 *     which the Software page reads.
 * Both outputs are git-ignored: they are recreated on every deploy.
 *
 * Private repositories need a token in RELEASES_TOKEN: a fine-grained GitHub
 * token with read-only "Contents" access to those repositories. The deploy
 * workflow passes the repository secret of the same name. See BUILD_GUIDE.md.
 *
 *   npm run releases                       # public repositories only
 *   $env:RELEASES_TOKEN="..."; npm run releases   # PowerShell, private repositories
 */
import { createWriteStream } from 'node:fs';
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcesFile = path.join(root, 'src', 'data', 'release-sources.json');
const outFile = path.join(root, 'src', 'data', 'releases.generated.json');
const publicDir = path.join(root, 'public', 'releases');
const token = (process.env.RELEASES_TOKEN ?? '').trim();
const inCI = Boolean(process.env.GITHUB_ACTIONS);

const log = {
  info: (msg) => console.log(msg),
  warn: (msg) => console.warn(inCI ? `::warning::${msg}` : `Warning: ${msg}`),
  error: (msg) => console.error(inCI ? `::error::${msg}` : `Error: ${msg}`),
};

function github(url, { accept = 'application/vnd.github+json', auth = true, redirect = 'follow' } = {}) {
  return fetch(url, {
    redirect,
    headers: {
      Accept: accept,
      'User-Agent': 'redoxtronics-website',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

/** Downloads a release asset, retrying a couple of times if the connection drops. */
async function download(asset, target, attempts = 3) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await downloadOnce(asset, target);
    } catch (err) {
      if (attempt >= attempts) throw err;
      log.warn(`${asset.name}: ${err.message}. Retrying (${attempt}/${attempts - 1})…`);
      await new Promise((resolve) => setTimeout(resolve, 3000 * attempt));
    }
  }
}

/** GitHub redirects asset downloads to a signed storage URL, which must not receive the token. */
async function downloadOnce(asset, target) {
  let res = await github(asset.url, { accept: 'application/octet-stream', redirect: 'manual' });
  if (res.status >= 300 && res.status < 400) {
    const location = res.headers.get('location');
    if (!location) throw new Error(`no redirect location for ${asset.name}`);
    res = await fetch(location, { headers: { 'User-Agent': 'redoxtronics-website' } });
  }
  if (!res.ok || !res.body) throw new Error(`download of ${asset.name} failed (HTTP ${res.status})`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(target));
  const { size } = await stat(target);
  if (size !== asset.size) throw new Error(`${asset.name} is ${size} bytes, expected ${asset.size}`);
}

const sources = JSON.parse(await readFile(sourcesFile, 'utf8'));
const result = {};
let failed = false;

if (!token) log.info('RELEASES_TOKEN is not set: only public repositories can be read.');

for (const [id, source] of Object.entries(sources)) {
  const pattern = new RegExp(source.assets ?? '.', 'i');
  try {
    const res = await github(`https://api.github.com/repos/${source.repo}/releases/latest`);
    if (res.status === 404) {
      const hint = token
        ? 'Check that it has a published release and that RELEASES_TOKEN can read it.'
        : 'If the repository is private, set RELEASES_TOKEN.';
      throw new Error(`no release found in ${source.repo}. ${hint}`);
    }
    if (!res.ok) throw new Error(`GitHub answered HTTP ${res.status} for ${source.repo}`);

    const release = await res.json();
    const assets = (release.assets ?? []).filter((a) => pattern.test(a.name));
    if (assets.length === 0) {
      log.warn(`${id}: release ${release.tag_name} of ${source.repo} has no file matching ${pattern}.`);
      continue;
    }

    const dir = path.join(publicDir, id);
    await rm(dir, { recursive: true, force: true });
    await mkdir(dir, { recursive: true });

    const files = [];
    for (const asset of assets) {
      const name = path.basename(asset.name);
      await download(asset, path.join(dir, name));
      files.push({ name, size: asset.size, path: `/releases/${id}/${encodeURIComponent(name)}` });
      log.info(`${id}: ${release.tag_name} → /releases/${id}/${name} (${(asset.size / 1e6).toFixed(1)} MB)`);
    }

    result[id] = {
      repo: source.repo,
      tag: release.tag_name,
      title: release.name || release.tag_name,
      publishedAt: release.published_at,
      assets: files,
    };
  } catch (err) {
    // Without a token this is expected for private repositories: the page shows "Coming soon".
    // With a token, a failure stops the deploy so the live site keeps its last good download.
    if (token) {
      log.error(`${id}: ${err.message}`);
      failed = true;
    } else {
      log.warn(`${id}: ${err.message}`);
    }
  }
}

await writeFile(outFile, `${JSON.stringify(result, null, 2)}\n`);
log.info(`Wrote ${path.relative(root, outFile)} (${Object.keys(result).length} release(s)).`);
if (failed) process.exit(1);
