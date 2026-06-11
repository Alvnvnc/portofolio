import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

/** Honor reduced-motion: skip entrances entirely, content stays visible */
function reducedMotion(): boolean {
	return (
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	);
}

/** Fade-up entrance animation triggered on scroll */
export function scrollFadeIn(
	element: HTMLElement,
	options?: { delay?: number; y?: number; duration?: number }
) {
	if (reducedMotion()) return;
	return gsap.from(element, {
		scrollTrigger: {
			trigger: element,
			start: 'top 85%',
			toggleActions: 'play none none none'
		},
		y: options?.y ?? 30,
		opacity: 0,
		duration: options?.duration ?? 0.8,
		delay: options?.delay ?? 0,
		ease: 'power2.out'
	});
}

/** Stagger children entrance on scroll */
export function scrollStagger(
	parent: HTMLElement,
	childSelector: string,
	options?: { delay?: number; stagger?: number; y?: number }
) {
	if (reducedMotion()) return;
	return gsap.from(parent.querySelectorAll(childSelector), {
		scrollTrigger: {
			trigger: parent,
			start: 'top 85%',
			toggleActions: 'play none none none'
		},
		y: options?.y ?? 20,
		opacity: 0,
		duration: 0.6,
		stagger: options?.stagger ?? 0.15,
		delay: options?.delay ?? 0,
		ease: 'power2.out'
	});
}

/** Staggered entrance for hero elements */
export function heroEntrance(elements: HTMLElement[]) {
	if (reducedMotion()) return;
	return gsap.fromTo(
		elements,
		{ y: 40, opacity: 0 },
		{ y: 0, opacity: 1, duration: 0.7, stagger: 0.18, ease: 'power3.out' }
	);
}
