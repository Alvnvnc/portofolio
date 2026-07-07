import { derived, writable } from 'svelte/store';
import { browser } from '$app/environment';
import { en, type Dict } from './en';
import { id } from './id';

export type Locale = 'en' | 'id';

const STORAGE_KEY = 'locale';
const dictionaries: Record<Locale, Dict> = { en, id };

function initialLocale(): Locale {
	if (!browser) return 'en';
	const stored = localStorage.getItem(STORAGE_KEY);
	return stored === 'id' ? 'id' : 'en';
}

export const locale = writable<Locale>(initialLocale());

/** The active dictionary — components read copy via `$t.section.key`. */
export const t = derived(locale, ($locale) => dictionaries[$locale]);

export function setLocale(next: Locale) {
	locale.set(next);
	if (browser) {
		localStorage.setItem(STORAGE_KEY, next);
		document.documentElement.lang = next;
	}
}

export function toggleLocale() {
	locale.update((current) => {
		const next: Locale = current === 'en' ? 'id' : 'en';
		if (browser) {
			localStorage.setItem(STORAGE_KEY, next);
			document.documentElement.lang = next;
		}
		return next;
	});
}

// Keep <html lang> honest on first load too.
if (browser) {
	document.documentElement.lang = initialLocale();
}
