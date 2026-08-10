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
	import Seo from '$lib/components/Seo.svelte';
	import { personalInfo, services } from '$lib/data/portfolio';
	import { activeSection } from '$lib/stores';
	import { t, locale } from '$lib/i18n';
	import { SITE_URL, absoluteUrl } from '$lib/seo';
	import { onMount } from 'svelte';

	let ready = $state(false);

	const firstName = personalInfo.name.split(' ')[0];
	const marqueeText = $derived(`${$t.marquee} `);

	const PERSON_ID = `${SITE_URL}/#person`;

	/**
	 * One Person node, referenced by everything else. `knowsAbout` is the entity
	 * signal — it is how a search engine learns this person is *about* Go, APIs
	 * and full-stack work, rather than inferring it from a keyword count.
	 */
	const jsonLd = $derived([
		{
			'@context': 'https://schema.org',
			'@type': 'Person',
			'@id': PERSON_ID,
			name: 'Alvin Vincent Oswald Reba',
			alternateName: 'Alvin Vincent',
			url: absoluteUrl('/', $locale),
			email: `mailto:${personalInfo.email}`,
			jobTitle:
				$locale === 'id'
					? ['Programmer Backend', 'Full Stack Developer']
					: ['Backend Engineer', 'Full Stack Developer'],
			description: $t.seo.home.description,
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Surabaya',
				addressRegion: 'Jawa Timur',
				addressCountry: 'ID'
			},
			alumniOf: {
				'@type': 'CollegeOrUniversity',
				name: 'Institut Teknologi Sepuluh Nopember (ITS)'
			},
			knowsAbout: [
				'Backend development',
				'Full stack web development',
				'Go (Golang)',
				'Python',
				'TypeScript',
				'SvelteKit',
				'Next.js',
				'REST API design',
				'PostgreSQL',
				'InfluxDB',
				'Redis',
				'Kong API Gateway',
				'Docker',
				'Kubernetes',
				'CI/CD',
				'IoT data pipelines',
				'LLM and RAG integration'
			],
			knowsLanguage: ['id', 'en'],
			sameAs: [personalInfo.linkedin, personalInfo.website].filter(Boolean)
		},
		{
			'@context': 'https://schema.org',
			'@type': 'ProfessionalService',
			name:
				$locale === 'id'
					? 'Alvin Vincent — Programmer Backend & Full Stack'
					: 'Alvin Vincent — Backend & Full Stack Engineer',
			url: absoluteUrl('/', $locale),
			description: $t.seo.home.description,
			inLanguage: $locale === 'id' ? 'id-ID' : 'en',
			provider: { '@id': PERSON_ID },
			areaServed: [
				{ '@type': 'City', name: 'Surabaya' },
				{ '@type': 'Country', name: 'Indonesia' }
			],
			availableLanguage: ['Bahasa Indonesia', 'English'],
			hasOfferCatalog: {
				'@type': 'OfferCatalog',
				name: $t.services.kicker,
				itemListElement: services.map((service) => ({
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: $t.services.entries[service.id]?.title ?? service.title,
						url: absoluteUrl(`/services/${service.id}`, $locale)
					}
				}))
			}
		}
	]);

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

<Seo
	path="/"
	title={$t.seo.home.title}
	description={$t.seo.home.description}
	keywords={$t.seo.home.keywords}
	{jsonLd}
/>

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
