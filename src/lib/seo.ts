import { defaultLocale, locales, type Locale } from '$lib/i18n';

export const SITE_URL = 'https://alvnvnc.site';

/**
 * A locale-neutral path: always starts with `/`, never carries the `/id`
 * prefix. Everything SEO-related is expressed in these so a page only ever
 * has to know *which* page it is, not which language tree it sits in.
 */
export type Path = string;

/** hreflang code per locale — Indonesian is region-qualified, English is not. */
const HREFLANG: Record<Locale, string> = { en: 'en', id: 'id-ID' };

export function localizedPath(path: Path, loc: Locale): string {
	const clean = path === '/' ? '' : path;
	if (loc === defaultLocale) return clean || '/';
	return `/${loc}${clean}`;
}

export function absoluteUrl(path: Path, loc: Locale): string {
	const localized = localizedPath(path, loc);
	return localized === '/' ? SITE_URL : `${SITE_URL}${localized}`;
}

/** Strip the locale segment back off a real pathname. `/id/services/x` → `/services/x` */
export function stripLocale(pathname: string): Path {
	for (const loc of locales) {
		if (loc === defaultLocale) continue;
		if (pathname === `/${loc}`) return '/';
		if (pathname.startsWith(`/${loc}/`)) return pathname.slice(loc.length + 1);
	}
	return pathname || '/';
}

/**
 * Reciprocal hreflang set for one page. Google only honours these when every
 * locale points back at every other one, so this is generated from a single
 * path rather than hand-written per page.
 */
export function hreflangAlternates(path: Path) {
	return [
		...locales.map((loc) => ({ hreflang: HREFLANG[loc], href: absoluteUrl(path, loc) })),
		{ hreflang: 'x-default', href: absoluteUrl(path, defaultLocale) }
	];
}

/** Every indexable page, as locale-neutral paths. Single source for the sitemap. */
export function indexablePaths(serviceIds: string[]): Path[] {
	return ['/', '/portofolio', ...serviceIds.map((sid) => `/services/${sid}`)];
}
