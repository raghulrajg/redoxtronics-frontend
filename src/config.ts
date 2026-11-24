/**
 * ─────────────────────────────────────────────────────────────
 *  SITE SETTINGS — edit this file first.
 *  Everything company-specific (contact details, address, socials,
 *  form delivery) lives here so the rest of the code stays clean.
 * ─────────────────────────────────────────────────────────────
 */

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  /** Main contact address: shown across the site and used for enquiries. */
  email: string;
  /** Phone in international format. Leave empty to hide. */
  phone: string;
  /** Registered office address. */
  address: {
    street: string;
    locality: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    countryCode: string;
  };
  /** Optional profile URLs. Empty values are hidden automatically. */
  socials: { linkedin: string; youtube: string; x: string; github: string };
  form: { web3formsKey: string; endpoint: string };
}

export const site: SiteConfig = {
  name: 'Redoxtronics',
  tagline: 'R&D in electrochemical workstations, gas sensors & embedded systems',
  description:
    'Redoxtronics is an R&D company specialising in electrochemical workstations, gas sensors and embedded systems. We develop portable electrochemical workstations, gas sensor detectors and the software that runs them.',

  email: 'sales@redoxtronics.com',
  phone: '+91 99444 68391',

  address: {
    street: '54/C FFE, Priyas Preethi Apartment',
    locality: 'New Colony, Woriur',
    city: 'Tiruchirappalli',
    region: 'Tamil Nadu',
    postalCode: '620003',
    country: 'India',
    countryCode: 'IN',
  },

  socials: {
    linkedin: '',
    youtube: '',
    x: '',
    github: '',
  },

  /**
   * Contact form delivery:
   * - web3formsKey: Web3Forms access key (https://web3forms.com). Every enquiry is
   *   emailed to the inbox the key was created for (use sales@redoxtronics.com).
   *   It is NOT stored in the code: it comes from the PUBLIC_WEB3FORMS_KEY
   *   environment variable at build time, which the GitHub workflow fills from the
   *   repository secret WEB3FORMS_KEY. For local builds, put it in a .env file.
   * - endpoint: any other service that accepts form POSTs (e.g. Formspree:
   *   'https://formspree.io/f/abcdwxyz').
   * With neither set, the form opens the visitor's email app with the message
   * pre-filled and addressed to `email`.
   */
  form: {
    web3formsKey: (import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '').trim(),
    endpoint: '',
  },
};

/** tel: link target, e.g. 'tel:+919944468391'. */
export const phoneHref = `tel:${site.phone.replace(/[^\d+]/g, '')}`;

/** The registered office address as display lines. */
export const addressLines = [
  site.address.street,
  site.address.locality,
  `${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
  site.address.country,
];

export const addressOneLine = addressLines.join(', ');

/** Opens the address in Google Maps. */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressOneLine)}`;

/** Short location label, e.g. 'Tiruchirappalli, Tamil Nadu'. */
export const locationLabel = `${site.address.city}, ${site.address.region}`;

/** Main navigation. */
export const nav = [
  { label: 'Products', path: '/products/' },
  { label: 'Software', path: '/software/' },
  { label: 'About', path: '/about/' },
  { label: 'Contact', path: '/contact/' },
] as const;
