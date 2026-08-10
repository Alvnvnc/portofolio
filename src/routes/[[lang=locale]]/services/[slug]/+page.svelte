<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { onMount } from 'svelte';
	import { scrollFadeIn, scrollStagger } from '$lib/utils/animations';
	import { t, locale } from '$lib/i18n';
	import { copyFor } from '$lib/i18n/serviceCopy';
	import { SITE_URL, absoluteUrl, localizedPath } from '$lib/seo';

	let { data } = $props();
	const service = $derived(data.service);
	const relatedProjects = $derived(data.relatedProjects);

	/** Localized prose for this service; falls back to the English entry. */
	const copy = $derived(copyFor($locale, service.id)!);
	const ui = $derived($t.serviceDetail);
	const entry = $derived($t.services.entries[service.id]);
	const title = $derived(entry?.title ?? service.title);
	const description = $derived(entry?.description ?? service.description);

	const path = $derived(`/services/${service.id}`);
	const homeHref = $derived(localizedPath('/', $locale));

	const jsonLd = $derived([
		{
			'@context': 'https://schema.org',
			'@type': 'Service',
			name: copy.title,
			description: copy.seo.description,
			url: absoluteUrl(path, $locale),
			inLanguage: $locale === 'id' ? 'id-ID' : 'en',
			provider: {
				'@type': 'Person',
				name: 'Alvin Vincent Oswald Reba',
				jobTitle: $locale === 'id' ? 'Programmer Backend & Full Stack' : 'Backend & Full Stack Engineer',
				url: SITE_URL
			},
			areaServed: [
				{ '@type': 'Country', name: 'Indonesia' },
				{ '@type': 'City', name: 'Surabaya' }
			],
			serviceType: copy.title,
			// The offer catalog is what lets a service page answer "what exactly
			// do I get?" in the SERP rather than only on the page.
			hasOfferCatalog: {
				'@type': 'OfferCatalog',
				name: copy.title,
				itemListElement: copy.features.map((feature) => ({
					'@type': 'Offer',
					itemOffered: { '@type': 'Service', name: feature }
				}))
			}
		},
		...(copy.faq.length
			? [
					{
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						inLanguage: $locale === 'id' ? 'id-ID' : 'en',
						mainEntity: copy.faq.map((item) => ({
							'@type': 'Question',
							name: item.q,
							acceptedAnswer: { '@type': 'Answer', text: item.a }
						}))
					}
				]
			: [])
	]);

	let heroRef = $state<HTMLElement>(undefined!);
	let detailRef = $state<HTMLElement>(undefined!);
	let featuresRef = $state<HTMLElement>(undefined!);
	let processRef = $state<HTMLElement>(undefined!);
	let projectsRef = $state<HTMLElement>(undefined!);
	let ctaRef = $state<HTMLElement>(undefined!);

	onMount(() => {
		if (heroRef) scrollFadeIn(heroRef);
		if (detailRef) scrollFadeIn(detailRef, { delay: 0.15 });
		if (featuresRef) scrollStagger(featuresRef, ':scope > *', { stagger: 0.08, y: 20 });
		if (processRef) scrollStagger(processRef, ':scope > *', { stagger: 0.12, y: 25 });
		if (projectsRef) scrollStagger(projectsRef, ':scope > *', { stagger: 0.1, y: 25 });
		if (ctaRef) scrollFadeIn(ctaRef, { delay: 0.1 });
	});
</script>

<Seo
	{path}
	title={copy.seo.title}
	description={copy.seo.description}
	keywords={copy.seo.keywords}
	type="article"
	{jsonLd}
/>

<!-- Spec sheet header -->
<section bind:this={heroRef} class="grain px-6 pt-32 pb-14 sm:px-10">
	<div class="mx-auto max-w-4xl">
		<a
			href="{homeHref}#services"
			data-cursor={$t.services.cursorRead}
			class="mb-8 inline-block font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase transition-colors hover:text-accent"
		>
			← {ui.back}
		</a>

		<div class="flex flex-wrap items-center gap-4">
			<span class="flex h-12 w-12 items-center justify-center rounded-full border border-border text-accent">
				<Icon name={service.icon} size={22} />
			</span>
			<span class="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
				{service.code} · {ui.specSheet}
			</span>
		</div>

		<h1 class="mt-6 font-display text-4xl leading-[0.95] text-fg uppercase sm:text-5xl">
			{copy.title}
		</h1>
		<p class="mt-5 max-w-2xl font-body text-base leading-relaxed text-fg-muted sm:text-lg">
			{description}
		</p>
	</div>
</section>

<!-- Details + stack -->
<section bind:this={detailRef} class="border-t border-border bg-bg px-6 py-16 sm:px-10">
	<div class="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
		<div class="rounded-2xl border border-border bg-bg-elevated/40 p-6 md:col-span-2">
			<span class="font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase">{ui.details}</span>
			<p class="mt-4 font-body text-base leading-relaxed text-fg-muted">
				{copy.longDescription}
			</p>
		</div>
		<div class="rounded-2xl border border-border bg-bg-elevated/40 p-6">
			<span class="font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase">{ui.stack}</span>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each service.techStack as tech (tech)}
					<span class="rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-[0.15em] text-fg-muted uppercase">
						{tech}
					</span>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- What's included -->
{#if copy.features.length}
	<section class="border-t border-border bg-bg px-6 py-16 sm:px-10">
		<div class="mx-auto max-w-4xl">
			<h2 class="mb-8 font-display text-2xl text-fg uppercase sm:text-3xl">{ui.included}</h2>
			<div bind:this={featuresRef} class="grid gap-4 sm:grid-cols-2">
				{#each copy.features as feature (feature)}
					<div class="rounded-xl border border-border bg-bg-elevated/40 p-5">
						<p class="flex items-start gap-3 font-body text-sm leading-relaxed text-fg-muted">
							<span class="mt-2 h-1 w-1 flex-none rounded-full bg-accent"></span>
							{feature}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Process -->
{#if copy.process.length}
	<section class="border-t border-border bg-bg px-6 py-16 sm:px-10">
		<div class="mx-auto max-w-4xl">
			<h2 class="mb-8 font-display text-2xl text-fg uppercase sm:text-3xl">{ui.process}</h2>
			<div bind:this={processRef} class="space-y-4">
				{#each copy.process as step, i (step)}
					<div class="flex items-start gap-5 rounded-xl border border-border bg-bg-elevated/40 p-5">
						<span class="font-display text-2xl text-accent">{String(i + 1).padStart(2, '0')}</span>
						<p class="pt-1 font-body text-sm leading-relaxed text-fg-muted">{step}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!--
	Scope boundaries. Saying out loud what I don't do is the cheapest trust
	signal a freelance page has, and it keeps the full-stack claim honest.
-->
{#if copy.boundaries}
	<section class="border-t border-border bg-bg px-6 py-16 sm:px-10">
		<div class="mx-auto max-w-4xl">
			<h2 class="font-display text-2xl text-fg uppercase sm:text-3xl">{ui.boundariesTitle}</h2>
			<p class="mt-4 max-w-2xl font-body text-base leading-relaxed text-fg-muted">
				{copy.boundaries.intro}
			</p>
			<div class="mt-8 grid gap-6 sm:grid-cols-2">
				<div>
					<span class="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
						{ui.boundariesMine}
					</span>
					<ul class="mt-4 space-y-3">
						{#each copy.boundaries.mine as item (item)}
							<li class="flex items-start gap-3 font-body text-sm leading-relaxed text-fg-muted">
								<span class="mt-2 h-1 w-1 flex-none rounded-full bg-accent"></span>
								{item}
							</li>
						{/each}
					</ul>
				</div>
				<div>
					<span class="font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase">
						{ui.boundariesPartner}
					</span>
					<ul class="mt-4 space-y-3">
						{#each copy.boundaries.partner as item (item)}
							<li class="flex items-start gap-3 font-body text-sm leading-relaxed text-fg-muted">
								<span class="mt-2 h-1 w-1 flex-none rounded-full bg-fg-muted/40"></span>
								{item}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>
{/if}

<!-- FAQ — real client questions, mirrored into FAQPage schema above -->
{#if copy.faq.length}
	<section class="border-t border-border bg-bg px-6 py-16 sm:px-10">
		<div class="mx-auto max-w-4xl">
			<h2 class="mb-8 font-display text-2xl text-fg uppercase sm:text-3xl">{ui.faqTitle}</h2>
			<div class="divide-y divide-border border-y border-border">
				{#each copy.faq as item (item.q)}
					<details class="group py-5">
						<summary
							class="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-base text-fg sm:text-lg"
						>
							<h3 class="font-display text-base font-normal sm:text-lg">{item.q}</h3>
							<span
								class="mt-1 font-mono text-sm text-fg-muted transition-transform group-open:rotate-45"
								aria-hidden="true">+</span
							>
						</summary>
						<p class="mt-4 max-w-3xl font-body text-sm leading-relaxed text-fg-muted">{item.a}</p>
					</details>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Field evidence -->
{#if relatedProjects.length > 0}
	<section class="border-t border-border bg-bg px-6 py-16 sm:px-10">
		<div class="mx-auto max-w-4xl">
			<h2 class="font-display text-2xl text-fg uppercase sm:text-3xl">{ui.evidence}</h2>
			<p class="mt-3 font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase">
				{ui.evidenceReadout}
			</p>
			<div bind:this={projectsRef} class="mt-8 grid gap-6 sm:grid-cols-2">
				{#each relatedProjects as project (project.id)}
					{@const localized = $t.projects.entries[project.id]}
					<a
						href="{homeHref}#projects"
						data-cursor="View"
						class="group block rounded-2xl border border-border bg-bg-elevated/40 p-6 transition-colors hover:border-accent/40"
					>
						<p class="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">{project.code}</p>
						<h3 class="mt-3 font-display text-lg text-fg uppercase transition-colors group-hover:text-accent">
							{project.title}
						</h3>
						<p class="mt-3 font-body text-sm leading-relaxed text-fg-muted">
							{localized?.description ?? project.description}
						</p>
						<div class="mt-4 flex flex-wrap gap-2">
							{#each project.techStack.slice(0, 4) as tech (tech)}
								<span class="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.1em] text-fg-muted uppercase">
									{tech}
								</span>
							{/each}
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- CTA -->
<section bind:this={ctaRef} class="grain border-t border-border bg-bg px-6 py-24 sm:px-10">
	<div class="mx-auto max-w-2xl rounded-2xl border border-border bg-bg-elevated/40 p-10 text-center">
		<h2 class="font-display text-2xl text-fg uppercase sm:text-3xl">
			{ui.ctaTitle(title)}
		</h2>
		<p class="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-fg-muted">
			{ui.ctaBody}
		</p>
		<a
			href="{homeHref}#contact"
			data-cursor={$t.services.cursorAsk}
			class="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-mono text-[11px] tracking-[0.2em] text-bg uppercase transition-opacity hover:opacity-90"
		>
			{ui.ctaButton} →
		</a>
	</div>
</section>
