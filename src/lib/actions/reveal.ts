import type { Action } from 'svelte/action';

/**
 * Reveal-on-scroll: adds `is-inview` to the node the first time it enters the
 * viewport. Pair with CSS that animates from a hidden state to visible when
 * `.is-inview` is present. Reduced-motion users get the visible state instantly
 * because the transition is neutralized globally in app.css.
 */
export const reveal: Action<HTMLElement, { threshold?: number; margin?: string } | undefined> = (
	node,
	params
) => {
	const threshold = params?.threshold ?? 0.15;
	const margin = params?.margin ?? '0px 0px -10% 0px';

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-inview');
					observer.unobserve(node);
				}
			}
		},
		{ threshold, rootMargin: margin }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
