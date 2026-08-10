<script lang="ts">
	import {
		Loader,
		Cursor,
		HeroCanvas,
		Hero,
		Marquee,
		Projects,
		Services,
		Skills,
		Experience,
		About,
		Contact
	} from '$lib/components';
	import { personalInfo } from '$lib/data/portfolio';
	import { activeSection } from '$lib/stores';
	import { t } from '$lib/i18n';
	import { onMount } from 'svelte';

	let ready = $state(false);

	const firstName = personalInfo.name.split(' ')[0];
	const marqueeText = $derived(`${$t.marquee} `);

	// Scroll-spy keeps the navbar's active link in sync.
	onMount(() => {
		const sections = document.querySelectorAll('section[id]');
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) activeSection.setFromScroll(entry.target.id);
				}
			},
			{ threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
		);
		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	});
</script>

<Loader name={firstName} onComplete={() => (ready = true)} />
<Cursor />
<HeroCanvas />

<div class="relative z-10">
	<Hero {ready} />
	<Marquee text={marqueeText} class="bg-bg" />
	<Projects />
	<Services />
	<Skills />
	<Experience />
	<About />
	<Contact />
</div>
