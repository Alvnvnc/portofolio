import type { Handle } from '@sveltejs/kit';

const STATIC_ASSET = /^\/(fonts|images)\/|^\/(favicon\.svg|apple-touch-icon\.png)$/;

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	response.headers.set('x-content-type-options', 'nosniff');
	response.headers.set('referrer-policy', 'strict-origin-when-cross-origin');

	if (STATIC_ASSET.test(event.url.pathname)) {
		response.headers.set('cache-control', 'public, max-age=2592000, stale-while-revalidate=604800');
	}

	return response;
};
