// Single source of truth for site facts and URL building.
// All absolute URLs must come from absUrl() so preview/production modes
// and the eventual domain cutover cannot drift apart.

// Build-time only (this module is imported from .astro frontmatter).
export const SITE_MODE: 'preview' | 'production' =
  process.env.SITE_MODE === 'production' ? 'production' : 'preview';

export const BUSINESS = {
  name: 'Hopping Mouse Automation',
  legal: 'Hopping Mouse Automation is a trading name of Qualitiv Pty Ltd.',
  // ABN intentionally absent until the owner provides it (see TODOS).
  // No phone/email anywhere in this repo or the rendered site — direct
  // details attract spam (owner decision). The form is the contact channel.
  location: 'Brisbane, Queensland',
  serviceArea: 'Australia-wide',
  positioning:
    'Industrial automation consultancy — SCADA, PLC & control systems. Brisbane, Australia-wide.',
} as const;

// FormSubmit AJAX endpoint, pre-encoded so the delivery address is never
// plain text in the repo or the built HTML; form.ts decodes at submit time.
// Swap for FormSubmit's hashed alias (re-encoded) once activation issues it.
export const FORM_ENDPOINT_AJAX_B64 =
  'aHR0cHM6Ly9mb3Jtc3VibWl0LmNvL2FqYXgvcmljaGFyZEBxdWFsaXRpdi5jbw==';

// Buyer-priority navigation (final gate D7.1).
export const NAV = [
  { n: '01', label: 'HOME', href: '/' },
  { n: '02', label: 'FIELD REPORTS', href: '/case-studies/' },
  { n: '03', label: 'SERVICES', href: '/services/' },
  { n: '04', label: 'SECTORS', href: '/sectors/' },
  { n: '05', label: 'PROTOTYPING', href: '/prototyping/' },
  { n: '06', label: 'EXPERIENCE', href: '/about/' },
  { n: '07', label: 'CONTACT', href: '/contact/' },
] as const;

/** Prefix an internal path with the configured base (works in both modes). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Fully-qualified URL for canonical/OG/JSON-LD/form redirects. */
export function absUrl(path: string, site: URL | undefined): string {
  const origin = (site ?? new URL('https://richardbh.github.io')).origin;
  return `${origin}${withBase(path)}`;
}
