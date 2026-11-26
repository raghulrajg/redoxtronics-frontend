/**
 * Latest software releases, downloaded at build time by
 * scripts/fetch-releases.mjs (sources: src/data/release-sources.json).
 *
 * The data file only exists after that script has run (the deploy workflow
 * runs it on every deploy). Without it this is empty and the Software page
 * shows "Coming soon" for those entries.
 */

export interface ReleaseFile {
  name: string;
  /** Bytes */
  size: number;
  /** Website path, e.g. /releases/gas-sensor-monitor/E-Nose-Monitor-build-2.zip */
  path: string;
}

export interface LatestRelease {
  repo: string;
  tag: string;
  title: string;
  publishedAt: string;
  assets: ReleaseFile[];
}

const generated = import.meta.glob<Record<string, LatestRelease>>('./releases.generated.json', {
  eager: true,
  import: 'default',
});

/** Latest release per software id (the keys of release-sources.json). */
export const latestReleases: Record<string, LatestRelease> = Object.values(generated)[0] ?? {};

/** 'build-2' → 'Build 2', '1.4.0' → 'v1.4.0', 'v1.4.0' → 'v1.4.0'. */
export function versionLabel(tag: string): string {
  const build = /^build[-_ ]?(\d+)$/i.exec(tag);
  if (build) return `Build ${build[1]}`;
  return /^\d/.test(tag) ? `v${tag}` : tag;
}

export function formatSize(bytes: number): string {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1e3))} KB`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
}

/** A short label for a download file, from its extension. */
export function fileKind(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  const kinds: Record<string, string> = {
    zip: 'ZIP',
    exe: 'Installer (.exe)',
    msi: 'Installer (.msi)',
    dmg: 'macOS (.dmg)',
    apk: 'Android (.apk)',
  };
  return kinds[ext] ?? ext.toUpperCase();
}
