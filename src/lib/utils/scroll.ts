import { browser } from '$app/environment';
import { replaceState } from '$app/navigation';

/** Smooth scrolling unless the visitor asked for less motion. */
function reduced(): boolean {
	return !browser || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * While a click-triggered scroll is in flight the scroll-spy would rewrite the
 * hash for every section it passes through. Mute it until the scroll settles.
 */
let mutedUntil = 0;

/** URL updates go through SvelteKit's router so its state stays consistent. */
function setUrl(url: string) {
	replaceState(url, history.state);
}

function mute(milliseconds: number) {
	mutedUntil = Date.now() + milliseconds;
	if (browser && 'onscrollend' in window) {
		window.addEventListener('scrollend', () => (mutedUntil = 0), { once: true, passive: true });
	}
}

/** Jump or glide to a section without adding a history entry. */
export function goToSection(event: MouseEvent | undefined, hash: string) {
	if (event) event.preventDefault();
	if (!browser) return;

	const id = hash.replace(/^#/, '');
	document.getElementById(id)?.scrollIntoView({
		behavior: reduced() ? 'auto' : 'smooth',
		block: 'start'
	});

	mute(reduced() ? 200 : 2400);
	const bare = location.pathname + location.search;
	setUrl(id === 'hero' ? bare : hash);
}

/** Keep the URL honest while the visitor scrolls (no history entries). */
export function syncUrlToSection(id: string) {
	if (!browser || Date.now() < mutedUntil) return;

	const bare = location.pathname + location.search;
	if (id === 'hero') {
		if (!location.hash) return;
		setUrl(bare);
		return;
	}

	const hash = `#${id}`;
	if (location.hash === hash) return;
	setUrl(hash);
}

/**
 * Deep links have to survive hydration: browsers scroll to the element before
 * fonts and reveals settle, which lands in the wrong place. Re-align once the
 * webfonts are ready and once more after the first paint has settled.
 */
export function applyInitialHash() {
	if (!browser) return;

	const id = location.hash.replace(/^#/, '');
	if (!id || !document.getElementById(id)) return;

	const align = () => document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
	const soon = () => requestAnimationFrame(align);

	if (document.fonts?.ready) {
		document.fonts.ready.then(() => setTimeout(soon, 60));
	} else {
		setTimeout(soon, 200);
	}

	mute(1200);
	window.setTimeout(align, 900);
}
