<script lang="ts">
	import {
		Hero,
		About,
		Services,
		Skills,
		Projects,
		Experience,
		Contact
	} from '$lib/components';
	import { activeSection } from '$lib/stores';
	import { onMount } from 'svelte';

	// Scroll spy to update active section
	onMount(() => {
		const sections = document.querySelectorAll('section[id]');

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection.setFromScroll(entry.target.id);
					}
				});
			},
			{
				threshold: 0.3,
				rootMargin: '-80px 0px -50% 0px'
			}
		);

		sections.forEach((section) => observer.observe(section));

		return () => {
			sections.forEach((section) => observer.unobserve(section));
		};
	});
</script>

<Hero />
<About />
<Services />
<Skills />
<Projects />
<Experience />
<Contact />
