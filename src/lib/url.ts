/**
 * Prefix an internal path with the configured base path so links keep working
 * when the site is served from a sub-folder (e.g. GitHub Pages project sites).
 * External URLs, mailto:, tel: and in-page anchors are returned untouched.
 */
export function href(path = '/'): string {
  if (/^([a-z][a-z0-9+.-]*:|#|\/\/)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Strip the base path from a pathname so it can be compared against nav paths. */
export function stripBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
  return p.endsWith('/') ? p : `${p}/`;
}

/** True when `pathname` is the given nav path or one of its children. */
export function isActive(pathname: string, path: string): boolean {
  const current = stripBase(pathname);
  if (path === '/') return current === '/';
  return current === path || current.startsWith(path);
}

/** mailto: link with an optional subject and body. */
export function mailto(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  // URLSearchParams encodes spaces as "+", which some mail apps show literally.
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${email}${query ? `?${query}` : ''}`;
}
