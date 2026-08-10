import type { ParamMatcher } from '@sveltejs/kit';

/**
 * Only `/id/*` is a locale-prefixed tree — English stays at the root so the
 * existing URLs keep their history. Anything else (e.g. `/sitemap.xml`) falls
 * through to its own route instead of being read as a language segment.
 */
export const match = ((param) => param === 'id') satisfies ParamMatcher;
