<script lang="ts">
	import { Hero, Marquee, About, Services, Skills, Projects, Experience, Contact } from '$lib/components';
	import { activeSection } from '$lib/stores';
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
		const sections = document.querySelectorAll('section[id]');
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) activeSection.setFromScroll(entry.target.id);
				});
			},
			{ threshold: 0.25, rootMargin: '-88px 0px -55% 0px' }
		);
		sections.forEach((section) => observer.observe(section));
		return () => sections.forEach((section) => observer.unobserve(section));
	});
</script>

<Hero />

<Marquee items={bandA} tone="yellow" duration={42} />

<About />

<Marquee items={bandB} tone="blue" duration={46} reverse />

<Services />
<Skills />
<Projects />
<Experience />
<Contact />
