import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Section =
	| 'hero'
	| 'about'
	| 'services'
	| 'skills'
	| 'projects'
	| 'experience'
	| 'contact';

export const sectionIds: Section[] = [
	'hero',
	'about',
	'services',
	'skills',
	'projects',
	'experience',
	'contact'
];

function isValidSection(id: string): id is Section {
	return (sectionIds as string[]).includes(id);
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

export type Reading = {
	progress: number;
	active: Section;
};

function createReadingStore() {
	const { subscribe, set } = writable<Reading>({ progress: 0, active: 'hero' });

	let stations: { id: Section; top: number }[] = [];
	let frame = 0;

	function measure() {
		stations = [
			{ id: 'hero', top: 0 },
			...Array.from(document.querySelectorAll<HTMLElement>('[data-station-id]')).map((el) => ({
				id: el.dataset.stationId as Section,
				top: el.getBoundingClientRect().top + window.scrollY
			}))
		];
	}

	function compute() {
		frame = 0;
		const doc = document.documentElement;
		const max = Math.max(1, doc.scrollHeight - window.innerHeight);
		const progress = Math.min(1, Math.max(0, window.scrollY / max));
		const head = window.scrollY + progress * window.innerHeight;
		let active: Section = 'hero';
		for (const station of stations) {
			if (station.top <= head) active = station.id;
		}
		set({ progress, active });
		activeSection.set(active);
	}

	function schedule() {
		if (!frame) frame = requestAnimationFrame(compute);
	}

	function init() {
		if (!browser) return () => {};
		measure();
		compute();
		const remeasure = () => {
			measure();
			schedule();
		};
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', remeasure);
		window.addEventListener('load', remeasure);
		document.fonts?.ready.then(remeasure);
		return () => {
			if (frame) cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', remeasure);
			window.removeEventListener('load', remeasure);
		};
	}

	return { subscribe, init };
}

export const reading = createReadingStore();
