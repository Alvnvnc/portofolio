import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Single source of truth for scrolling: Lenis provides the smooth virtual
 * scroll, and GSAP's ticker drives its RAF so that ScrollTrigger stays in
 * perfect sync (no double-RAF, no scroll drift between DOM tweens and the
 * WebGL scenes which also read window.scrollY).
 *
 * Respects prefers-reduced-motion: skips smooth scrolling entirely but keeps
 * ScrollTrigger working against the native scroll. Returns a cleanup fn.
 */
export function initSmoothScroll(): () => void {
	gsap.registerPlugin(ScrollTrigger);

	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReduced) {
		ScrollTrigger.refresh();
		return () => {
			ScrollTrigger.getAll().forEach((st) => st.kill());
		};
	}

	const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
	lenis.on('scroll', ScrollTrigger.update);

	const raf = (time: number) => lenis.raf(time * 1000);
	gsap.ticker.add(raf);
	gsap.ticker.lagSmoothing(0);

	const refresh = () => ScrollTrigger.refresh();
	window.addEventListener('load', refresh);
	const t = window.setTimeout(refresh, 600);

	return () => {
		gsap.ticker.remove(raf);
		lenis.destroy();
		window.removeEventListener('load', refresh);
		window.clearTimeout(t);
		ScrollTrigger.getAll().forEach((st) => st.kill());
	};
}
