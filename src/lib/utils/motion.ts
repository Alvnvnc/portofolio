import { browser } from '$app/environment';

function reduced(): boolean {
	return !browser || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Scroll-linked vertical drift. Sets `--par` on the node so the element's own
 * transform can compose it (e.g. `rotate(var(--rot)) translateY(var(--par))`).
 */
export function parallax(node: HTMLElement, speed = 0.12) {
	let strength = speed;
	let frame = 0;

	function paint() {
		frame = 0;
		const rect = node.getBoundingClientRect();
		const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
		const max = 120;
		const value = Math.max(-max, Math.min(max, -offset * strength));
		node.style.setProperty('--par', `${value.toFixed(1)}px`);
	}

	function schedule() {
		if (!frame) frame = requestAnimationFrame(paint);
	}

	if (reduced()) {
		node.style.setProperty('--par', '0px');
		return;
	}

	paint();
	window.addEventListener('scroll', schedule, { passive: true });
	window.addEventListener('resize', schedule);

	return {
		update(next: number) {
			strength = next;
			schedule();
		},
		destroy() {
			if (frame) cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
		}
	};
}

/** One-shot entrance on scroll. Add `data-reveal` styles in the stylesheet. */
export function reveal(node: HTMLElement, delay = 0) {
	if (reduced()) {
		node.classList.add('in');
		return;
	}

	node.classList.add('armed');

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				node.style.setProperty('--rd', `${delay}ms`);
				node.classList.add('in');
				observer.unobserve(node);
			}
		},
		{ rootMargin: '0px 0px 8% 0px', threshold: 0.05 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
