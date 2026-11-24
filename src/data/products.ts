/**
 * ─────────────────────────────────────────────────────────────
 *  PRODUCTS — edit this file to add product details.
 *
 *  Each product has a list of versions. While a version has no
 *  `summary` and no `specs`, the site shows it as "Details coming
 *  soon". To publish a version, fill in its fields, for example:
 *
 *    {
 *      name: 'Version 2',
 *      summary: 'Our latest portable workstation with ...',
 *      specs: [
 *        { label: 'Potential range', value: '±2 V' },
 *        { label: 'Interface', value: 'USB-C' },
 *      ],
 *      image: '/images/products/workstation-v2.jpg', // file in public/images/products/
 *      datasheet: '/downloads/workstation-v2-datasheet.pdf', // file in public/downloads/
 *    }
 * ─────────────────────────────────────────────────────────────
 */
import type { IconName } from '@/lib/icons';

export interface Spec {
  label: string;
  value: string;
}

export interface ProductVersion {
  name: string;
  /** Short description of this version. Empty = "Details coming soon". */
  summary: string;
  /** Key specifications. Empty = "Details coming soon". */
  specs: Spec[];
  /** Optional photo, path inside /public (e.g. '/images/products/workstation-v1.jpg'). */
  image?: string;
  /** Optional datasheet link: a URL or a path inside /public. */
  datasheet?: string;
}

export interface Product {
  /** Used for the page anchor, e.g. /products/#portable-electrochemical-workstation */
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: IconName;
  illustration: 'workstation' | 'gas-detector';
  /** Typical uses, shown as a checklist. */
  uses: string[];
  versions: ProductVersion[];
}

export const products: Product[] = [
  {
    slug: 'portable-electrochemical-workstation',
    name: 'Portable Electrochemical Workstation',
    short: 'Compact electrochemical measurement for the lab and the field.',
    description:
      'A portable electrochemical workstation developed by Redoxtronics. It brings electrochemical measurement off the bench and into the hands of researchers, students and field teams.',
    icon: 'activity',
    illustration: 'workstation',
    uses: [
      'Electrochemistry research and teaching labs',
      'Electrode and sensor development',
      'On-site and field measurements',
    ],
    versions: [
      { name: 'Version 1', summary: '', specs: [] },
      { name: 'Version 2', summary: '', specs: [] },
    ],
  },
  {
    slug: 'gas-sensor-detectors',
    name: 'Gas Sensor Detectors',
    short: 'Gas sensing and detection for monitoring and safety.',
    description:
      'Gas sensor detectors developed by Redoxtronics, combining gas-sensing elements with our own embedded electronics for dependable detection.',
    icon: 'wind',
    illustration: 'gas-detector',
    uses: [
      'Environmental and air-quality monitoring',
      'Workplace and industrial safety',
      'Research and sensor development',
    ],
    versions: [
      { name: 'Version 1', summary: '', specs: [] },
      { name: 'Version 2', summary: '', specs: [] },
    ],
  },
];

/** True when a version has no published details yet. */
export const isComingSoon = (v: ProductVersion) => !v.summary.trim() && v.specs.length === 0;
