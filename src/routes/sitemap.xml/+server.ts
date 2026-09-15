import { services } from '$lib/data/portfolio';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const baseUrl = 'https://alvnvnc.site';
	const today = new Date().toISOString().split('T')[0];

	const urls = [
		{
			loc: `${baseUrl}/`,
			lastmod: today,
			changefreq: 'monthly',
			priority: '1.0'
		},
		...services.map((service) => ({
			loc: `${baseUrl}/services/${service.id}`,
			lastmod: today,
			changefreq: 'monthly',
			priority: '0.8'
		}))
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
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
