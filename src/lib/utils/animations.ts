import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

/** Fade-up entrance animation triggered on scroll */
export function scrollFadeIn(element: HTMLElement, options?: { delay?: number; y?: number; duration?: number }) {
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

/** Animate progress bar from 0 to target value */
export function animateProgress(element: HTMLProgressElement, targetValue: number) {
	gsap.fromTo(
		element,
		{ value: 0 },
		{
			value: targetValue,
			duration: 1.2,
			ease: 'steps(12)',
			scrollTrigger: {
				trigger: element,
				start: 'top 90%',
				toggleActions: 'play none none none'
			}
		}
	);
}

/** Typewriter text effect */
export function typewriter(element: HTMLElement, text: string, options?: { speed?: number; delay?: number }) {
	element.textContent = '';
	return gsap.to(element, {
		text: { value: text, delimiter: '' },
		duration: text.length * (options?.speed ?? 0.04),
		delay: options?.delay ?? 0,
		ease: 'none'
	});
}

/** Staggered entrance for hero elements */
export function heroEntrance(elements: HTMLElement[]) {
	return gsap.fromTo(
		elements,
		{ y: 40, opacity: 0 },
		{ y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: 'power3.out' }
	);
}

/** Pulsing glow animation (looping) */
export function pulseGlow(element: HTMLElement) {
	return gsap.to(element, {
		textShadow: '0 0 20px currentColor, 0 0 40px currentColor',
		duration: 2,
		repeat: -1,
		yoyo: true,
		ease: 'sine.inOut'
	});
}

/** Glitch effect */
export function glitchEffect(element: HTMLElement) {
	const tl = gsap.timeline({ repeat: -1, repeatDelay: 4 });
	tl.to(element, { x: -2, y: 2, duration: 0.05 })
		.to(element, { x: 2, y: -2, duration: 0.05 })
		.to(element, { x: -1, y: -1, duration: 0.05 })
		.to(element, { x: 0, y: 0, duration: 0.05 });
	return tl;
}
