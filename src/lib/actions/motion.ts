import type { Action } from 'svelte/action';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

function reduced(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Split the element's text nodes into word spans and reveal them with the
 * blur-focus rise when the element scrolls into view. Elements (like <br>)
 * are preserved. Content is only hidden by GSAP itself, so no-JS and
 * reduced-motion visitors always see the text.
 *
 * i18n note: the split rewrites Svelte's text nodes — wrap usage in
 * `{#key $locale}` so a locale switch re-renders and re-runs the action.
 */
export const splitReveal: Action<
	HTMLElement,
	{ delay?: number; start?: string; stagger?: number; once?: boolean } | undefined
> = (node, params) => {
	if (reduced()) return;

	const words: HTMLElement[] = [];
	for (const child of [...node.childNodes]) {
		if (child.nodeType !== Node.TEXT_NODE || !child.textContent?.trim()) continue;
		const frag = document.createDocumentFragment();
		for (const piece of child.textContent.split(/(\s+)/)) {
			if (!piece) continue;
			if (/^\s+$/.test(piece)) {
				frag.append(piece);
				continue;
			}
			const w = document.createElement('span');
			w.className = 'inline-block will-change-transform';
			w.textContent = piece;
			frag.append(w);
			words.push(w);
		}
		child.replaceWith(frag);
	}
	if (words.length === 0) return;

	const ctx = gsap.context(() => {
		gsap.fromTo(
			words,
			{ opacity: 0, y: '0.35em', filter: 'blur(8px)' },
			{
				opacity: 1,
				y: 0,
				filter: 'blur(0px)',
				duration: 0.9,
				delay: params?.delay ?? 0,
				stagger: params?.stagger ?? 0.045,
				ease: 'power2.inOut',
				clearProps: 'filter,willChange',
				scrollTrigger: {
					trigger: node,
					start: params?.start ?? 'top 82%',
					once: params?.once ?? true
				}
			}
		);
	});

	return { destroy: () => ctx.revert() };
};

/** Hairline rule that draws itself in from the left when it enters the viewport. */
export const lineDraw: Action<HTMLElement, { delay?: number; duration?: number } | undefined> = (
	node,
	params
) => {
	if (reduced()) return;

	const ctx = gsap.context(() => {
		gsap.fromTo(
			node,
			{ scaleX: 0, transformOrigin: 'left center' },
			{
				scaleX: 1,
				duration: params?.duration ?? 1.1,
				delay: params?.delay ?? 0,
				ease: 'power3.inOut',
				scrollTrigger: { trigger: node, start: 'top 88%', once: true }
			}
		);
	});

	return { destroy: () => ctx.revert() };
};

/** Simple block rise for a single element. */
export const rise: Action<HTMLElement, { delay?: number; y?: number } | undefined> = (
	node,
	params
) => {
	if (reduced()) return;

	const ctx = gsap.context(() => {
		gsap.fromTo(
			node,
			{ opacity: 0, y: params?.y ?? 20 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				delay: params?.delay ?? 0,
				ease: 'power3.out',
				scrollTrigger: { trigger: node, start: 'top 88%', once: true }
			}
		);
	});

	return { destroy: () => ctx.revert() };
};

/**
 * Stagger-rise the element's children (or a selector within it) as the
 * element scrolls into view — one trigger, one timeline, no per-child drift.
 */
export const staggerRise: Action<
	HTMLElement,
	{ selector?: string; stagger?: number; y?: number; start?: string } | undefined
> = (node, params) => {
	if (reduced()) return;

	const targets = params?.selector
		? node.querySelectorAll(params.selector)
		: node.children;
	if (targets.length === 0) return;

	const ctx = gsap.context(() => {
		gsap.fromTo(
			targets,
			{ opacity: 0, y: params?.y ?? 24 },
			{
				opacity: 1,
				y: 0,
				duration: 0.7,
				stagger: params?.stagger ?? 0.09,
				ease: 'power3.out',
				scrollTrigger: { trigger: node, start: params?.start ?? 'top 82%', once: true }
			}
		);
	});

	return { destroy: () => ctx.revert() };
};

/** Count a number up from 0 when it scrolls into view. Zero-pads to `pad` digits. */
export const countUp: Action<HTMLElement, { to: number; pad?: number; duration?: number }> = (
	node,
	params
) => {
	const pad = params.pad ?? 2;
	const format = (v: number) => String(Math.round(v)).padStart(pad, '0');
	node.textContent = format(reduced() ? params.to : 0);
	if (reduced()) return;

	const counter = { v: 0 };
	const ctx = gsap.context(() => {
		gsap.to(counter, {
			v: params.to,
			duration: params.duration ?? 1.4,
			ease: 'power2.out',
			scrollTrigger: { trigger: node, start: 'top 88%', once: true },
			onUpdate: () => {
				node.textContent = format(counter.v);
			}
		});
	});

	return {
		destroy: () => ctx.revert(),
		update(next) {
			node.textContent = format(next.to);
		}
	};
};

/**
 * Skew the node with scroll velocity — gives marquees and oversized type a
 * physical, printed-ribbon feel while the page is moving.
 */
export const velocitySkew: Action<HTMLElement, { max?: number } | undefined> = (node, params) => {
	if (reduced()) return;

	const max = params?.max ?? 6;
	const proxy = { skew: 0 };
	const setSkew = gsap.quickSetter(node, 'skewX', 'deg');

	const ctx = gsap.context(() => {
		ScrollTrigger.create({
			onUpdate: (self) => {
				const target = gsap.utils.clamp(-max, max, self.getVelocity() / -350);
				if (Math.abs(target) > Math.abs(proxy.skew)) {
					proxy.skew = target;
					gsap.to(proxy, {
						skew: 0,
						duration: 0.8,
						ease: 'power3.out',
						overwrite: true,
						onUpdate: () => setSkew(proxy.skew)
					});
				}
			}
		});
	});

	return { destroy: () => ctx.revert() };
};

/**
 * Scrub a vertical spine (timeline rule) so it draws itself while the
 * section scrolls through the viewport.
 */
export const spineDraw: Action<HTMLElement> = (node) => {
	if (reduced()) return;

	const ctx = gsap.context(() => {
		gsap.fromTo(
			node,
			{ scaleY: 0, transformOrigin: 'top center' },
			{
				scaleY: 1,
				ease: 'none',
				scrollTrigger: {
					trigger: node,
					start: 'top 80%',
					end: 'bottom 45%',
					scrub: 0.6
				}
			}
		);
	});

	return { destroy: () => ctx.revert() };
};
