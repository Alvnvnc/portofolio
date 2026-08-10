import { services } from '$lib/data/portfolio';
import { locales } from '$lib/i18n';
import { absoluteUrl, hreflangAlternates, indexablePaths } from '$lib/seo';
import type { RequestHandler } from './$types';

const PRIORITY: Record<string, string> = { '/': '1.0', '/portofolio': '0.9' };

const xmlEscape = (value: string) =>
	value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: RequestHandler = async () => {
	const today = new Date().toISOString().split('T')[0];
	const paths = indexablePaths(services.map((service) => service.id));

	/**
	 * Every path is listed once per locale, and each entry carries the full
	 * alternate set including itself. Reciprocity is what makes Google trust
	 * the hreflang cluster — a one-way link is silently ignored.
	 */
	const entries = paths.flatMap((path) => {
		const alternates = hreflangAlternates(path);
		return locales.map((loc) => ({
			loc: absoluteUrl(path, loc),
			priority: PRIORITY[path] ?? '0.8',
			alternates
		}));
	});

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
	.map(
		(entry) => `  <url>
    <loc>${xmlEscape(entry.loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${entry.priority}</priority>
${entry.alternates
	.map(
		(alt) =>
			`    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${xmlEscape(alt.href)}" />`
	)
	.join('\n')}
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
