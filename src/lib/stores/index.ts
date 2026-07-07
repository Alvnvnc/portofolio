import { writable } from 'svelte/store';

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
