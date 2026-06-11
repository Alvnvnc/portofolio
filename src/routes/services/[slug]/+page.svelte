<script lang="ts">
	import PixelPanel from '$lib/components/ui/PixelPanel.svelte';
	import PixelButton from '$lib/components/ui/PixelButton.svelte';
	import PixelBadge from '$lib/components/ui/PixelBadge.svelte';
	import PixelIcon from '$lib/components/ui/PixelIcon.svelte';
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
<section bind:this={heroRef} class="console-grid px-4 pt-28 pb-14 sm:px-6">
	<div class="mx-auto max-w-4xl">
		<a
			href="/#services"
			class="font-pixel mb-8 inline-block text-[0.5rem] text-moss uppercase transition-colors hover:text-amber"
		>
			◂ back to console
		</a>

		<div class="flex flex-wrap items-center gap-4">
			<span class="px-shadow-sm flex h-12 w-12 items-center justify-center border-[3px] border-ink bg-slot text-amber">
				<PixelIcon name={service.icon} size={22} />
			</span>
			<span class="font-pixel text-[0.55rem] text-amber uppercase">{service.code} · spec sheet</span>
		</div>

		<h1 class="font-pixel mt-5 mb-4 text-lg leading-relaxed text-ink uppercase sm:text-xl">
			{service.title}
		</h1>
		<p class="max-w-2xl text-base leading-relaxed text-fog">
			{service.description}
		</p>
	</div>
	<div class="dither mx-auto mt-12 h-2 max-w-4xl" aria-hidden="true"></div>
</section>

<!-- Details + stack -->
<section bind:this={detailRef} class="bg-void px-4 py-14 sm:px-6">
	<div class="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
		<div class="md:col-span-2">
			<PixelPanel title="service.details" variant="panel" class="h-full p-6 pt-7">
				<p class="text-[0.9rem] leading-relaxed text-fog sm:text-base">
					{service.longDescription ?? service.description}
				</p>
			</PixelPanel>
		</div>
		<div>
			<PixelPanel title="stack" accent="phosphor" variant="night" class="h-full p-5 pt-7">
				<div class="flex flex-wrap gap-2">
					{#each service.techStack as tech (tech)}
						<PixelBadge text={tech} variant="ghost" />
					{/each}
				</div>
			</PixelPanel>
		</div>
	</div>
</section>

<!-- What's included -->
{#if service.features?.length}
	<section class="bg-night px-4 py-14 sm:px-6">
		<div class="mx-auto max-w-4xl">
			<h2 class="font-pixel mb-8 text-sm text-ink uppercase">
				<span class="text-amber">▸</span> What's included
			</h2>
			<div bind:this={featuresRef} class="grid gap-4 sm:grid-cols-2">
				{#each service.features as feature (feature)}
					<div class="px-shadow-sm border-[3px] border-ink bg-panel p-4">
						<p class="flex items-start gap-2 text-sm leading-relaxed text-fog">
							<span class="font-terminal text-phosphor">+</span>
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
	<section class="bg-void px-4 py-14 sm:px-6">
		<div class="mx-auto max-w-4xl">
			<h2 class="font-pixel mb-8 text-sm text-ink uppercase">
				<span class="text-amber">▸</span> How it runs
			</h2>
			<div bind:this={processRef} class="space-y-4">
				{#each service.process as step, i (step)}
					<div class="px-shadow-sm flex items-start gap-4 border-[3px] border-ink bg-panel p-4">
						<span class="font-pixel border-2 border-amber px-2 py-[6px] text-[0.55rem] leading-none text-amber">
							{String(i + 1).padStart(2, '0')}
						</span>
						<p class="pt-[2px] text-sm leading-relaxed text-fog">{step}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Field evidence -->
{#if relatedProjects.length > 0}
	<section class="bg-night px-4 py-14 sm:px-6">
		<div class="mx-auto max-w-4xl">
			<h2 class="font-pixel mb-3 text-sm text-ink uppercase">
				<span class="text-amber">▸</span> Field evidence
			</h2>
			<p class="font-terminal mb-8 text-lg text-moss">
				&gt;&gt; systems where this service is already running
			</p>
			<div bind:this={projectsRef} class="grid gap-6 sm:grid-cols-2">
				{#each relatedProjects as project (project.id)}
					<a href="/#projects" class="px-shadow px-hover block border-[3px] border-ink bg-panel">
						{#if project.thumbnail}
							<div class="relative overflow-hidden border-b-[3px] border-ink">
								<img
									src={project.thumbnail}
									alt="Pixel art illustration for {project.title}"
									class="pixel-art block aspect-[2/1] w-full object-cover"
									loading="lazy"
								/>
								<div class="scanlines pointer-events-none absolute inset-0" aria-hidden="true"></div>
							</div>
						{/if}
						<div class="p-4">
							<p class="font-pixel mb-2 text-[0.45rem] text-amber uppercase">{project.code}</p>
							<h3 class="font-pixel mb-3 text-[0.55rem] leading-relaxed text-ink uppercase">
								{project.title}
							</h3>
							<p class="mb-4 text-sm leading-relaxed text-moss">{project.description}</p>
							<div class="flex flex-wrap gap-2">
								{#each project.techStack.slice(0, 4) as tech (tech)}
									<PixelBadge text={tech} variant="outline" />
								{/each}
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- CTA -->
<section bind:this={ctaRef} class="console-grid bg-void px-4 py-20 sm:px-6">
	<div class="mx-auto max-w-2xl">
		<PixelPanel title="open.channel" accent="amber" variant="night" class="p-7 pt-8 text-center">
			<h2 class="font-pixel mb-3 text-sm leading-relaxed text-ink uppercase">
				Need {service.title.toLowerCase()}?
			</h2>
			<p class="mb-7 text-sm leading-relaxed text-moss">
				Tell me what you're building. You'll get an honest answer about scope, timeline, and
				whether I'm the right operator for it.
			</p>
			<PixelButton variant="primary" size="md" href="/#contact">
				Open channel <span aria-hidden="true">▸</span>
			</PixelButton>
		</PixelPanel>
	</div>
</section>
