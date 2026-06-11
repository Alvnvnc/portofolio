import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// ========================================
// Theme Store
// ========================================
type Theme = 'dark' | 'light';

function createThemeStore() {
	const defaultTheme: Theme = 'dark';

	const stored = browser ? (localStorage.getItem('theme') as Theme) : null;
	const initial = stored || defaultTheme;

	const { subscribe, set, update } = writable<Theme>(initial);

	return {
		subscribe,
		set: (value: Theme) => {
			if (browser) {
				localStorage.setItem('theme', value);
				document.documentElement.setAttribute('data-theme', value);
			}
			set(value);
		},
		toggle: () => {
			update((current) => {
				const next = current === 'dark' ? 'light' : 'dark';
				if (browser) {
					localStorage.setItem('theme', next);
					document.documentElement.setAttribute('data-theme', next);
				}
				return next;
			});
		},
		init: () => {
			if (browser) {
				const stored = localStorage.getItem('theme') as Theme;
				const theme = stored || defaultTheme;
				document.documentElement.setAttribute('data-theme', theme);
				set(theme);
			}
		}
	};
}

export const theme = createThemeStore();

// ========================================
// Active Section Store (for scroll spy)
// ========================================
export type Section =
	| 'hero'
	| 'about'
	| 'services'
	| 'skills'
	| 'projects'
	| 'experience'
	| 'contact';

function createSectionStore() {
	const { subscribe, set } = writable<Section>('hero');

	return {
		subscribe,
		set,
		setFromScroll: (sectionId: string) => {
			if (isValidSection(sectionId)) {
				set(sectionId);
			}
		}
	};
}

function isValidSection(id: string): id is Section {
	return ['hero', 'about', 'services', 'skills', 'projects', 'experience', 'contact'].includes(id);
}

export const activeSection = createSectionStore();
