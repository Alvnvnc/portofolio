import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

/** Honor reduced-motion: skip entrances entirely, content stays visible */
export function reducedMotion(): boolean {
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

/**
 * Panels that pop in on scroll with a tiny blocky displacement + rotation —
 * like a console module being slotted into place.
 */
export function scrollStaggerPop(
	parent: HTMLElement,
	childSelector: string,
	options?: { stagger?: number; y?: number; rotate?: number }
) {
	if (reducedMotion()) return;
	return gsap.from(parent.querySelectorAll(childSelector), {
		scrollTrigger: {
			trigger: parent,
			start: 'top 82%',
			toggleActions: 'play none none none'
		},
		y: options?.y ?? 28,
		opacity: 0,
		rotation: options?.rotate ?? 1.2,
		transformOrigin: 'left top',
		duration: 0.5,
		stagger: options?.stagger ?? 0.12,
		ease: 'back.out(1.6)'
	});
}

/**
 * Slow scroll-linked parallax. Positive `distance` drifts the element up as the
 * page scrolls past it. Transform-only, so it never triggers layout.
 */
export function parallax(element: HTMLElement, distance = 60) {
	if (reducedMotion()) return;
	return gsap.to(element, {
		yPercent: -distance,
		ease: 'none',
		scrollTrigger: {
			trigger: element,
			start: 'top bottom',
			end: 'bottom top',
			scrub: true
		}
	});
}

/**
 * Sequentially "power on" a row of nodes as the flow strip scrolls into view,
 * then run an onActivate callback per node (used to launch travelling particles).
 */
export function activateFlow(
	parent: HTMLElement,
	nodeSelector: string,
	onActivate?: (index: number) => void
) {
	const nodes = Array.from(parent.querySelectorAll<HTMLElement>(nodeSelector));
	if (reducedMotion()) {
		nodes.forEach((n) => n.classList.add('is-active'));
		return;
	}
	const tl = gsap.timeline({
		scrollTrigger: { trigger: parent, start: 'top 70%', toggleActions: 'play none none none' }
	});
	nodes.forEach((node, i) => {
		tl.from(
			node,
			{
				opacity: 0.25,
				scale: 0.9,
				duration: 0.35,
				ease: 'power2.out',
				onStart: () => {
					node.classList.add('is-active');
					onActivate?.(i);
				}
			},
			i * 0.35
		);
	});
	return tl;
}

/**
 * Hero campaign layer: staggered title reveal, moving packets, and a scrubbed
 * scroll drift. This keeps the Champions-for-Good energy while staying inside
 * the site's console/pixel language.
 */
export function heroCampaignMotion(root: HTMLElement) {
	if (reducedMotion()) return;

	return gsap.context(() => {
		const lines = root.querySelectorAll<HTMLElement>('[data-hero-line]');
		const chips = root.querySelectorAll<HTMLElement>('[data-hero-chip]');
		const packets = root.querySelectorAll<HTMLElement>('[data-hero-packet]');
		const rails = root.querySelectorAll<HTMLElement>('[data-hero-rail]');
		const sweep = root.querySelector<HTMLElement>('[data-hero-sweep]');

		gsap
			.timeline({ defaults: { ease: 'power3.out' } })
			.from(lines, {
				yPercent: 115,
				opacity: 0,
				duration: 0.85,
				stagger: 0.13,
				ease: 'back.out(1.15)'
			})
			.from(
				chips,
				{
					y: 16,
					opacity: 0,
					rotation: -2,
					duration: 0.42,
					stagger: 0.08
				},
				'-=0.38'
			)
			.from(
				rails,
				{
					scaleX: 0,
					opacity: 0,
					transformOrigin: 'left center',
					duration: 0.48,
					stagger: 0.07
				},
				'-=0.32'
			)
			.from(
				packets,
				{
					scale: 0,
					opacity: 0,
					duration: 0.25,
					stagger: 0.05
				},
				'-=0.24'
			);

		gsap.to(packets, {
			x: (i) => [120, -90, 82, -130, 58, -70][i % 6],
			y: (i) => [-34, 24, 50, -18, 14, 38][i % 6],
			rotation: (i) => (i % 2 === 0 ? 18 : -18),
			duration: (i) => 4.8 + i * 0.25,
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut',
			stagger: 0.12
		});

		if (sweep) {
			gsap.fromTo(
				sweep,
				{ xPercent: -120 },
				{ xPercent: 120, duration: 3.2, repeat: -1, ease: 'none' }
			);
		}

		gsap
			.timeline({
				scrollTrigger: {
					trigger: root,
					start: 'top top',
					end: 'bottom top',
					scrub: 0.8
				}
			})
			.to(lines, { xPercent: (i) => (i % 2 === 0 ? 4 : -4), yPercent: -8, ease: 'none' }, 0)
			.to(
				chips,
				{ yPercent: (i) => -35 - i * 8, rotation: (i) => (i % 2 === 0 ? 8 : -8), ease: 'none' },
				0
			)
			.to(packets, { yPercent: -120, opacity: 0.35, ease: 'none' }, 0);
	}, root);
}

/**
 * Scroll-progress flow activation. Instead of a one-off entrance, this keeps a
 * system diagram alive as the visitor scrolls through it.
 */
export function scrubbedFlow(parent: HTMLElement, nodeSelector: string) {
	const nodes = Array.from(parent.querySelectorAll<HTMLElement>(nodeSelector));
	if (nodes.length === 0) return;

	function setProgress(progress: number) {
		const clamped = Math.max(0, Math.min(1, progress));
		const activeIndex = Math.min(nodes.length - 1, Math.floor(clamped * nodes.length));
		parent.style.setProperty('--flow-progress', `${clamped * 100}%`);
		nodes.forEach((node, i) => {
			node.classList.toggle('is-active', i <= activeIndex);
			node.classList.toggle('is-current', i === activeIndex);
		});
	}

	if (reducedMotion()) {
		setProgress(1);
		return;
	}

	setProgress(0);

	return ScrollTrigger.create({
		trigger: parent,
		start: 'top 72%',
		end: 'bottom 38%',
		onEnter: () => setProgress(0),
		onUpdate: (self) => setProgress(self.progress),
		onLeave: () => setProgress(1),
		onLeaveBack: () => setProgress(0)
	});
}
