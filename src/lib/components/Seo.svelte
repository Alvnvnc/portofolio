<script lang="ts">
	import { locale } from '$lib/i18n';
	import { SITE_URL, absoluteUrl, hreflangAlternates, type Path } from '$lib/seo';

	/**
	 * One place that owns canonical, hreflang, Open Graph and JSON-LD.
	 * Pages pass their *locale-neutral* path and the rest is derived, so an
	 * EN page can never accidentally canonicalise to the ID URL or drop an
	 * alternate — the failure mode that quietly de-indexes half a site.
	 */
	let {
		path,
		title,
		description,
		keywords = [],
		image = `${SITE_URL}/images/hero-pixel-scene.png`,
		type = 'website',
		jsonLd = []
	}: {
		path: Path;
		title: string;
		description: string;
		keywords?: string[];
		image?: string;
		type?: string;
		jsonLd?: unknown[];
	} = $props();

	const canonical = $derived(absoluteUrl(path, $locale));
	const alternates = $derived(hreflangAlternates(path));
	const ogLocale = $derived($locale === 'id' ? 'id_ID' : 'en_US');
	const ogLocaleAlt = $derived($locale === 'id' ? 'en_US' : 'id_ID');
	const siteName = $derived(
		$locale === 'id'
			? 'Alvin Vincent — Programmer Backend & Full Stack'
			: 'Alvin Vincent — Backend & Full Stack Engineer'
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if keywords.length}
		<meta name="keywords" content={keywords.join(', ')} />
	{/if}

	<link rel="canonical" href={canonical} />
	{#each alternates as alt (alt.hreflang)}
		<link rel="alternate" hreflang={alt.hreflang} href={alt.href} />
	{/each}

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonical} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:image" content={image} />
	<meta property="og:locale" content={ogLocale} />
	<meta property="og:locale:alternate" content={ogLocaleAlt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{#each jsonLd as block, i (i)}
		{@html `<script type="application/ld+json">${JSON.stringify(block)}</script>`}
	{/each}
</svelte:head>
