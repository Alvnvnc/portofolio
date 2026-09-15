<script lang="ts">
	import '../app.css';
	import { Navbar, Footer } from '$lib/components';
	import { page } from '$app/stores';
	import { faqs, personalInfo, services } from '$lib/data/portfolio';

	let { children } = $props();

	const SITE = 'https://alvnvnc.site';
	const isHome = $derived($page.route.id === '/');

	const personId = `${SITE}/#person`;
	const websiteId = `${SITE}/#website`;
	const businessId = `${SITE}/#business`;
	const faqId = `${SITE}/#faq`;

	const graph = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Person',
				'@id': personId,
				name: personalInfo.fullName,
				alternateName: personalInfo.name,
				jobTitle: 'Full-stack developer',
				description: `Freelance full-stack developer in ${personalInfo.location}. Backend-deep: Go services, PostgreSQL, IoT data pipelines, SvelteKit interfaces, and production deploys.`,
				url: SITE,
				email: `mailto:${personalInfo.email}`,
				address: {
					'@type': 'PostalAddress',
					addressLocality: 'Surabaya',
					addressRegion: 'East Java',
					addressCountry: 'ID'
				},
				sameAs: [personalInfo.linkedin].filter(Boolean),
				knowsAbout: [
					'Go',
					'Python',
					'PostgreSQL',
					'InfluxDB',
					'REST API design',
					'IoT data pipelines',
					'MQTT',
					'SvelteKit',
					'TypeScript',
					'Docker',
					'Kubernetes',
					'CI/CD',
					'Clean Architecture'
				],
				knowsLanguage: ['English', 'Indonesian']
			},
			{
				'@type': 'WebSite',
				'@id': websiteId,
				url: SITE,
				name: 'Alvin Vincent — Freelance Full-Stack Developer',
				description:
					'Freelance full-stack developer building complete products end to end: Go APIs, data pipelines, SvelteKit dashboards, and deploys.',
				inLanguage: 'en',
				publisher: { '@id': personId }
			},
			...(isHome
				? [
						{
							'@type': 'ProfessionalService',
							'@id': businessId,
							name: 'Alvin Vincent — Freelance Full-Stack Development',
							description:
								'End-to-end product builds: backend services in Go, data pipelines, SvelteKit interfaces, and production deployment. Based in Surabaya, working remotely worldwide.',
							url: SITE,
							image: `${SITE}/images/og-card.png`,
							provider: { '@id': personId },
							areaServed: { '@type': 'Place', name: 'Worldwide' },
							availableLanguage: ['English', 'Indonesian'],
							knowsAbout: ['Backend development', 'API design', 'IoT systems', 'DevOps'],
							hasOfferCatalog: {
								'@type': 'OfferCatalog',
								name: 'Freelance engineering services',
								itemListElement: services.map((service) => ({
									'@type': 'Offer',
									itemOffered: {
										'@type': 'Service',
										name: service.title,
										description: service.description,
										url: `${SITE}/services/${service.id}`
									}
								}))
							}
						},
						{
							'@type': 'FAQPage',
							'@id': faqId,
							mainEntity: faqs.map((faq) => ({
								'@type': 'Question',
								name: faq.question,
								acceptedAnswer: { '@type': 'Answer', text: faq.answer }
							}))
						}
					]
				: [])
		]
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<meta name="author" content="Alvin Vincent Oswald Reba" />
	{#if personalInfo.linkedin}
		<link rel="me" href={personalInfo.linkedin} />
	{/if}
	{#if $page.status < 400}
		<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
	{/if}

	{#if isHome}
		<link rel="canonical" href={`${SITE}/`} />
		<title>Freelance Full-Stack Developer — Alvin Vincent | Go, APIs & IoT</title>
		<meta
			name="description"
			content="I build complete products end to end: Go APIs, data pipelines, dashboards, deploys that stay up. Freelance full-stack developer — Surabaya, working worldwide."
		/>
		<meta
			name="keywords"
			content="freelance full-stack developer, freelance developer Indonesia, Go developer, backend engineer, REST API development, IoT backend, SvelteKit developer, MVP development, remote freelance developer"
		/>
		<meta name="geo.region" content="ID-JI" />
		<meta name="geo.placename" content="Surabaya" />

		<meta property="og:title" content="Freelance Full-Stack Developer — Alvin Vincent" />
		<meta
			property="og:description"
			content="Complete products end to end: Go APIs, data pipelines, SvelteKit dashboards, and deploys that stay up. Available for freelance projects worldwide."
		/>
		<meta property="og:type" content="website" />
		<meta property="og:url" content={`${SITE}/`} />
		<meta property="og:site_name" content="Alvin Vincent — Freelance Full-Stack Developer" />
		<meta property="og:image" content={`${SITE}/images/og-card.png`} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta
			property="og:image:alt"
			content="Alvin Vincent — freelance full-stack developer: Go APIs, data pipelines, SvelteKit dashboards, deploys"
		/>
		<meta property="og:locale" content="en_US" />

		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="Freelance Full-Stack Developer — Alvin Vincent" />
		<meta
			name="twitter:description"
			content="Go APIs, data pipelines, SvelteKit dashboards, and deploys that stay up. Available for freelance projects worldwide."
		/>
		<meta name="twitter:image" content={`${SITE}/images/og-card.png`} />
		<meta
			name="twitter:image:alt"
			content="Alvin Vincent — freelance full-stack developer, backend-deep"
		/>
	{/if}

	{@html `<script type="application/ld+json">${JSON.stringify(graph)}</script>`}
</svelte:head>

<a class="skip-link" href="#main">Skip to content</a>

<div class="page">
	<Navbar />

	<main id="main" class="flex-1">
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	.page {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
	}
</style>
