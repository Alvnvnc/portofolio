import { writable, derived, type Readable } from 'svelte/store';
import { browser } from '$app/environment';

// ========================================
// Theme Store
// ========================================
type Theme = 'dark' | 'light';

function createThemeStore() {
	const defaultTheme: Theme = 'dark';

	const stored = browser ? localStorage.getItem('theme') as Theme : null;
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
// Character State Store
// ========================================
export type CharacterState = 'idle' | 'walk' | 'code' | 'inspect' | 'wave';

function createCharacterStore() {
	const { subscribe, set, update } = writable<CharacterState>('idle');

	return {
		subscribe,
		set,
		idle: () => set('idle'),
		walk: () => set('walk'),
		code: () => set('code'),
		inspect: () => set('inspect'),
		wave: () => set('wave')
	};
}

export const characterState = createCharacterStore();

// ========================================
// Active Section Store (for scroll spy)
// ========================================
export type Section = 'hero' | 'about' | 'services' | 'skills' | 'projects' | 'experience' | 'contact';

function createSectionStore() {
	const { subscribe, set } = writable<Section>('hero');

	return {
		subscribe,
		set,
		setFromScroll: (sectionId: string) => {
			if (isValidSection(sectionId)) {
				set(sectionId as Section);
			}
		}
	};
}

function isValidSection(id: string): id is Section {
	return ['hero', 'about', 'services', 'skills', 'projects', 'experience', 'contact'].includes(id);
}

export const activeSection = createSectionStore();

// ========================================
// Loading State Store
// ========================================
function createLoadingStore() {
	const { subscribe, set } = writable<boolean>(true);

	return {
		subscribe,
		start: () => set(true),
		finish: () => set(false)
	};
}

export const isLoading = createLoadingStore();

// ========================================
// Terminal Messages Store (for typing effect)
// ========================================
interface TerminalMessage {
	id: string;
	text: string;
	type: 'input' | 'output' | 'error' | 'success';
}

function createTerminalStore() {
	const { subscribe, update, set } = writable<TerminalMessage[]>([]);

	return {
		subscribe,
		add: (text: string, type: TerminalMessage['type'] = 'output') => {
			update((messages) => [
				...messages,
				{
					id: `msg-${Date.now()}`,
					text,
					type
				}
			]);
		},
		clear: () => set([]),
		reset: () => set([])
	};
}

export const terminal = createTerminalStore();
