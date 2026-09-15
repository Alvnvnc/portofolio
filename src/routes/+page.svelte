<script lang="ts">
	import { Hero, Marquee, About, Services, Skills, Projects, Experience, Contact } from '$lib/components';
	import { activeSection } from '$lib/stores';
	import { applyInitialHash, syncUrlToSection } from '$lib/utils/scroll';
	import { onMount } from 'svelte';

	const bandA = [
		'go apis',
		'data pipelines',
		'sveltekit dashboards',
		'docker deploys',
		'iot platforms',
		'clean architecture'
	];

	const bandB = [
		'full-stack delivery',
		'backend-deep',
		'postgresql · influxdb · redis',
		'one engineer, whole build',
		'available for freelance'
	];

	onMount(() => {
		applyInitialHash();

		const sections = document.querySelectorAll('section[id]');
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					activeSection.setFromScroll(entry.target.id);
					syncUrlToSection(entry.target.id);
				});
			},
			{ threshold: 0, rootMargin: '-45% 0px -50% 0px' }
		);
		sections.forEach((section) => observer.observe(section));
		return () => sections.forEach((section) => observer.unobserve(section));
	});
</script>

<Hero />

<Marquee items={bandA} tone="yellow" duration={42} deco="star" />

<About />

<Marquee items={bandB} tone="blue" duration={46} reverse deco="squiggle" />

<Services />
<Skills />
<Projects />
<Experience />
<Contact />
