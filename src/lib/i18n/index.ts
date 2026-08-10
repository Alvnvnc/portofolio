import { derived, type Readable } from 'svelte/store';
import { page } from '$app/stores';
import { en, type Dict } from './en';
import { id } from './id';

export type Locale = 'en' | 'id';

export const locales: readonly Locale[] = ['en', 'id'];
export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, Dict> = { en, id };

export function isLocale(value: unknown): value is Locale {
	return value === 'en' || value === 'id';
}

/**
 * The active locale is derived from the URL (`/id/…`), never from
 * `localStorage`. Two reasons: the server renders the correct language on the
 * first byte, so Googlebot actually sees the Indonesian copy; and a per-request
 * store cannot leak one visitor's language into another's SSR response.
 */
export const locale: Readable<Locale> = derived(page, ($page) =>
	isLocale($page.data?.locale) ? $page.data.locale : defaultLocale
);

/** The active dictionary — components read copy via `$t.section.key`. */
export const t = derived(locale, ($locale) => dictionaries[$locale]);

export function dictionaryFor(loc: Locale): Dict {
	return dictionaries[loc];
}
