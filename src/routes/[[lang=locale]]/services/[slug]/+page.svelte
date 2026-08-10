<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import { onMount } from 'svelte';
	import { scrollFadeIn, scrollStagger } from '$lib/utils/animations';

	let { data } = $props();
	const service = $derived(data.service);
	const relatedProjects = $derived(data.relatedProjects);

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

<svelte:head>
	<title>{service.seo?.title ?? `${service.title} | Alvin Vincent`}</title>
	<meta name="description" content={service.seo?.description ?? service.description} />
	{#if service.seo?.keywords}
		<meta name="keywords" content={service.seo.keywords.join(', ')} />
	{/if}
	<link rel="canonical" href={`https://alvnvnc.site/services/${service.id}`} />

	<meta property="og:title" content={service.seo?.title ?? service.title} />
	<meta property="og:description" content={service.seo?.description ?? service.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`https://alvnvnc.site/services/${service.id}`} />
	<meta property="og:image" content="https://alvnvnc.site/images/hero-pixel-scene.png" />
	<meta property="og:site_name" content="Alvin Vincent - Backend Engineer" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={service.seo?.title ?? service.title} />
	<meta name="twitter:description" content={service.seo?.description ?? service.description} />
	<meta name="twitter:image" content="https://alvnvnc.site/images/hero-pixel-scene.png" />

	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Service",
		"name": service.title,
		"description": service.seo?.description ?? service.description,
		"url": `https://alvnvnc.site/services/${service.id}`,
		"provider": {
			"@type": "Person",
			"name": "Alvin Vincent Oswald Reba",
			"jobTitle": "Backend Engineer",
			"url": "https://alvnvnc.site"
		},
		"areaServed": "Worldwide",
		"serviceType": service.title
	})}</script>`}
</svelte:head>

<!-- Spec sheet header -->
<section bind:this={heroRef} class="grain px-6 pt-32 pb-14 sm:px-10">
	<div class="mx-auto max-w-4xl">
		<a
			href="/#services"
			data-cursor="Back"
			class="mb-8 inline-block font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase transition-colors hover:text-accent"
		>
			← back to services
		</a>

		<div class="flex flex-wrap items-center gap-4">
			<span class="flex h-12 w-12 items-center justify-center rounded-full border border-border text-accent">
				<Icon name={service.icon} size={22} />
			</span>
			<span class="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
				{service.code} · spec sheet
			</span>
		</div>

		<h1 class="mt-6 font-display text-4xl leading-[0.95] text-fg uppercase sm:text-5xl">
			{service.title}
		</h1>
		<p class="mt-5 max-w-2xl font-body text-base leading-relaxed text-fg-muted sm:text-lg">
			{service.description}
		</p>
	</div>
</section>

<!-- Details + stack -->
<section bind:this={detailRef} class="border-t border-border bg-bg px-6 py-16 sm:px-10">
	<div class="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
		<div class="rounded-2xl border border-border bg-bg-elevated/40 p-6 md:col-span-2">
			<span class="font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase">Details</span>
			<p class="mt-4 font-body text-base leading-relaxed text-fg-muted">
				{service.longDescription ?? service.description}
			</p>
		</div>
		<div class="rounded-2xl border border-border bg-bg-elevated/40 p-6">
			<span class="font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase">Stack</span>
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
{#if service.features?.length}
	<section class="border-t border-border bg-bg px-6 py-16 sm:px-10">
		<div class="mx-auto max-w-4xl">
			<h2 class="mb-8 font-display text-2xl text-fg uppercase sm:text-3xl">What's included</h2>
			<div bind:this={featuresRef} class="grid gap-4 sm:grid-cols-2">
				{#each service.features as feature (feature)}
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
{#if service.process?.length}
	<section class="border-t border-border bg-bg px-6 py-16 sm:px-10">
		<div class="mx-auto max-w-4xl">
			<h2 class="mb-8 font-display text-2xl text-fg uppercase sm:text-3xl">How it runs</h2>
			<div bind:this={processRef} class="space-y-4">
				{#each service.process as step, i (step)}
					<div class="flex items-start gap-5 rounded-xl border border-border bg-bg-elevated/40 p-5">
						<span class="font-display text-2xl text-accent">{String(i + 1).padStart(2, '0')}</span>
						<p class="pt-1 font-body text-sm leading-relaxed text-fg-muted">{step}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Field evidence -->
{#if relatedProjects.length > 0}
	<section class="border-t border-border bg-bg px-6 py-16 sm:px-10">
		<div class="mx-auto max-w-4xl">
			<h2 class="font-display text-2xl text-fg uppercase sm:text-3xl">Field evidence</h2>
			<p class="mt-3 font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase">
				Systems where this service is already running
			</p>
			<div bind:this={projectsRef} class="mt-8 grid gap-6 sm:grid-cols-2">
				{#each relatedProjects as project (project.id)}
					<a
						href="/#projects"
						data-cursor="View"
						class="group block rounded-2xl border border-border bg-bg-elevated/40 p-6 transition-colors hover:border-accent/40"
					>
						<p class="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">{project.code}</p>
						<h3 class="mt-3 font-display text-lg text-fg uppercase transition-colors group-hover:text-accent">
							{project.title}
						</h3>
						<p class="mt-3 font-body text-sm leading-relaxed text-fg-muted">{project.description}</p>
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
			Need {service.title.toLowerCase()}?
		</h2>
		<p class="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-fg-muted">
			Tell me what you're building. You'll get an honest answer about scope, timeline, and whether
			I'm the right person for it.
		</p>
		<a
			href="/#contact"
			data-cursor="Talk"
			class="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-mono text-[11px] tracking-[0.2em] text-bg uppercase transition-opacity hover:opacity-90"
		>
			Open channel →
		</a>
	</div>
</section>
