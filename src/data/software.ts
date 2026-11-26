/**
 * ─────────────────────────────────────────────────────────────
 *  SOFTWARE DOWNLOADS
 *
 *  Each entry is published in one of two ways:
 *
 *  A. AUTOMATICALLY from a GitHub repository's Releases (recommended).
 *     Add the entry's `id` to src/data/release-sources.json with the
 *     repository name. On every deploy the website downloads the newest
 *     release's file and shows its version, date and size here.
 *     (The Gas Sensor Monitor works this way.)
 *
 *  B. MANUALLY: fill in `url` (a full link, or a file you put in
 *     public/downloads/), plus `version`, `size` and `released`.
 *
 *  An entry with neither shows "Coming soon" with a disabled button.
 * ─────────────────────────────────────────────────────────────
 */
import type { IconName } from '@/lib/icons';
import { latestReleases, type LatestRelease } from '@/data/releases';

export interface SoftwareItem {
  /** Also the key in release-sources.json for automatic releases. */
  id: string;
  name: string;
  description: string;
  /** The product this software works with. */
  product: string;
  icon: IconName;
  /** Manual download link: a path inside /public or a full URL. */
  url: string;
  /** Manual version, e.g. '1.0.0' (automatic releases fill this in). */
  version: string;
  /** e.g. 'Windows 10/11 (64-bit)' */
  platform: string;
  /** Manual size, e.g. '48 MB' (automatic releases fill this in). */
  size: string;
  /** Manual release date, e.g. 'March 2027' (automatic releases fill this in). */
  released: string;
  /** Optional link to release notes or a user manual. */
  notes?: string;
  /** Short feature list. */
  features?: string[];
  /** How to install, shown under the download button. */
  install?: string;
}

export const software: SoftwareItem[] = [
  {
    id: 'workstation-software',
    name: 'Electrochemical Workstation Software',
    description:
      'PC software for the Portable Electrochemical Workstation: set up measurements, view results as they are recorded and export your data.',
    product: 'Portable Electrochemical Workstation',
    icon: 'activity',
    url: '',
    version: '',
    platform: '',
    size: '',
    released: '',
  },
  {
    // Published automatically from github.com/raghulrajg/Gas-Sensor-Monitor (see release-sources.json).
    id: 'gas-sensor-monitor',
    name: 'Gas Sensor Monitor',
    description:
      'Desktop app for Redoxtronics gas sensor detectors. Connect the detector over USB to watch live readings, calibrate its sensors and record your measurements.',
    product: 'Gas Sensor Detectors',
    icon: 'wind',
    url: '',
    version: '',
    platform: 'Windows 10/11 (64-bit)',
    size: '',
    released: '',
    features: [
      'Live graphs for 7 gas sensors, temperature and humidity',
      'Calibrate each sensor from the app',
      'Record measurements straight to Excel',
      'Save and reload calibration profiles',
    ],
    install: 'Extract the zip file, then run “E-Nose Monitor.exe” from the extracted folder.',
  },
];

export interface DownloadFile {
  /** Path inside the site (pass through href()) or a full URL. */
  href: string;
  name: string;
  /** Bytes, when known. */
  bytes?: number;
}

/** The latest automatic release for an entry, if the build fetched one. */
export const releaseFor = (s: SoftwareItem): LatestRelease | undefined => latestReleases[s.id];

/** The files to offer for an entry: from its latest release, or its manual `url`. */
export function downloadsFor(s: SoftwareItem): DownloadFile[] {
  const release = releaseFor(s);
  if (release?.assets.length) {
    return release.assets.map((a) => ({ href: a.path, name: a.name, bytes: a.size }));
  }
  const url = s.url.trim();
  return url ? [{ href: url, name: decodeURIComponent(url.split('/').pop() ?? url) }] : [];
}

export const isAvailable = (s: SoftwareItem) => downloadsFor(s).length > 0;
