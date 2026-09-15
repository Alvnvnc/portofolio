import { writable } from 'svelte/store';

export type Section =
	| 'hero'
	| 'about'
	| 'services'
	| 'skills'
	| 'projects'
	| 'experience'
	| 'contact';

function isValidSection(id: string): id is Section {
	return ['hero', 'about', 'services', 'skills', 'projects', 'experience', 'contact'].includes(id);
}

function createSectionStore() {
	const { subscribe, set } = writable<Section>('hero');

	return {
		subscribe,
		set,
		setFromScroll: (id: string) => {
			if (isValidSection(id)) set(id);
		}
	};
}

export const activeSection = createSectionStore();
