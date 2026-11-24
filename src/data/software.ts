/**
 * ─────────────────────────────────────────────────────────────
 *  SOFTWARE DOWNLOADS — edit this file to publish a download.
 *
 *  While `url` is empty, the entry shows "Coming soon" and the
 *  download button is disabled. To publish a release:
 *
 *   1. Attach the installer to a GitHub Release (recommended, any size),
 *      or put a small file (under 25 MB) in public/downloads/,
 *      e.g. public/downloads/workstation-software-1.0.0-setup.exe.
 *   2. Fill in `url` (e.g. '/downloads/workstation-software-1.0.0-setup.exe'
 *      or the GitHub Release link), `version`, `platform`, `size` and
 *      `released`.
 *   3. Commit and push; the site redeploys automatically.
 * ─────────────────────────────────────────────────────────────
 */
import type { IconName } from '@/lib/icons';

export interface SoftwareItem {
  id: string;
  name: string;
  description: string;
  /** The product this software works with. */
  product: string;
  icon: IconName;
  /** Download link: a path inside /public or a full URL. Empty = coming soon. */
  url: string;
  version: string;
  /** e.g. 'Windows 10/11 (64-bit)' */
  platform: string;
  /** e.g. '48 MB' */
  size: string;
  /** e.g. 'March 2027' */
  released: string;
  /** Optional link to release notes or a user manual. */
  notes?: string;
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
    id: 'gas-detector-software',
    name: 'Gas Sensor Detector Software',
    description:
      'Software for Redoxtronics gas sensor detectors: view readings, review recorded data and manage your detectors.',
    product: 'Gas Sensor Detectors',
    icon: 'wind',
    url: '',
    version: '',
    platform: '',
    size: '',
    released: '',
  },
];

export const isAvailable = (s: SoftwareItem) => s.url.trim().length > 0;
