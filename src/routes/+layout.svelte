<script lang="ts">
	import '../app.css';
	import { Navbar, Footer } from '$lib/components';
	import { theme } from '$lib/stores';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	const isHome = $derived($page.route.id === '/');

	onMount(() => {
		theme.init();
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/images/favicon-pixel.png" />
	<meta name="author" content="Alvin Vincent Oswald Reba" />

	{#if isHome}
		<link rel="canonical" href="https://alvnvnc.site" />
		<title>Alvin Vincent | Backend Engineer — Freelance Backend, API & IoT Services</title>
		<meta name="description" content="Freelance Backend Engineer specializing in Golang, Python, REST API design, IoT systems, and AI/LLM integration. Available for projects worldwide. Contact for scalable backend solutions." />
		<meta name="keywords" content="Backend Engineer, Freelance Developer, Golang, Python, REST API, Clean Architecture, IoT Systems, AI Integration, Docker, CI/CD, Indonesia" />

		<!-- Open Graph -->
		<meta property="og:title" content="Alvin Vincent | Backend Engineer — Freelance Services" />
		<meta property="og:description" content="Freelance Backend Engineer building scalable systems with Golang, Clean Architecture, and modern DevOps. Available for backend, API, IoT, and AI integration projects." />
		<meta property="og:type" content="website" />
		<meta property="og:url" content="https://alvnvnc.site" />
		<meta property="og:site_name" content="Alvin Vincent - Backend Engineer" />
		<meta property="og:image" content="https://alvnvnc.site/images/hero-pixel-scene.png" />
		<meta property="og:locale" content="en_US" />

		<!-- Twitter Card -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="Alvin Vincent | Backend Engineer — Freelance Services" />
		<meta name="twitter:description" content="Freelance Backend Engineer specializing in Golang, REST APIs, IoT systems, and AI integration. Available for projects worldwide." />
		<meta name="twitter:image" content="https://alvnvnc.site/images/hero-pixel-scene.png" />

		<!-- JSON-LD Structured Data -->
		{@html `<script type="application/ld+json">${JSON.stringify({
			"@context": "https://schema.org",
			"@type": "ProfessionalService",
			"name": "Alvin Vincent - Backend Engineer",
			"url": "https://alvnvnc.site",
			"description": "Freelance Backend Engineer providing backend development, API design, IoT systems, AI/LLM integration, and DevOps services.",
			"provider": {
				"@type": "Person",
				"name": "Alvin Vincent Oswald Reba",
				"jobTitle": "Backend Engineer",
				"url": "https://alvnvnc.site",
				"email": "alvnvincent30@gmail.com",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Surabaya",
					"addressCountry": "ID"
				},
				"sameAs": [
					"https://linkedin.com/in/alvin-reba-88a857279"
				]
			},
			"areaServed": "Worldwide",
			"serviceType": [
				"Backend Development",
				"API Design & Integration",
				"IoT & Data Systems",
				"AI/LLM Integration",
				"DevOps & Deployment"
			]
		})}</script>`}
	{/if}
</svelte:head>

<div class="min-h-screen flex flex-col bg-[var(--color-bg-primary)]">
	<Navbar />

	<main class="flex-1">
		{@render children()}
	</main>

	<Footer />
</div>
