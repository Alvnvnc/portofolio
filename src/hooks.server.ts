import type { Handle } from '@sveltejs/kit';

/**
 * Stamp `<html lang>` server-side. Setting it from client JS is too late —
 * crawlers and screen readers both read the attribute off the first response.
 */
export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;
	const lang = pathname === '/id' || pathname.startsWith('/id/') ? 'id' : 'en';

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
