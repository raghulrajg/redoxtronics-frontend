import { href } from '@/lib/url';

export interface Crumb {
  label: string;
  href: string;
}

/** schema.org BreadcrumbList for a page (Home is prepended automatically). */
export function breadcrumbSchema(site: URL | undefined, crumbs: Crumb[]) {
  const items = [{ label: 'Home', href: '/' }, ...crumbs];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: new URL(href(c.href), site).toString(),
    })),
  };
}

export function organizationRef(site: URL | undefined) {
  return { '@id': `${new URL(href('/'), site).toString()}#organization` };
}
