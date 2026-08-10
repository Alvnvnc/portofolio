import { defaultLocale, isLocale } from '$lib/i18n';
import { stripLocale } from '$lib/seo';
import type { LayoutLoad } from './$types';

/**
 * Resolves the language for everything below it. `path` is the locale-neutral
 * page identity, which the head uses to build canonical + hreflang links.
 */
export const load: LayoutLoad = ({ params, url }) => ({
	locale: isLocale(params.lang) ? params.lang : defaultLocale,
	path: stripLocale(url.pathname)
});
