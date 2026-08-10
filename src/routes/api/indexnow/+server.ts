import { services } from '$lib/data/portfolio';
import { locales } from '$lib/i18n';
import { absoluteUrl, indexablePaths } from '$lib/seo';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const INDEXNOW_KEY = 'b7f3e9a1c5d2k8m4';
const BASE_URL = 'https://alvnvnc.site';

export const POST: RequestHandler = async () => {
	// Same source of truth as the sitemap, so a new service or locale can never
	// be submitted to one and forgotten by the other.
	const allUrls = indexablePaths(services.map((service) => service.id)).flatMap((path) =>
		locales.map((loc) => absoluteUrl(path, loc))
	);

	try {
		const response = await fetch('https://api.indexnow.org/indexnow', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				host: 'alvnvnc.site',
				key: INDEXNOW_KEY,
				keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
				urlList: allUrls
			})
		});

		return json({
			success: response.ok,
			status: response.status,
			urlsSubmitted: allUrls.length
		});
	} catch (err) {
		return json({ success: false, error: String(err) }, { status: 500 });
	}
};
