<script lang="ts">
	import { cn } from '$lib/utils';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
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
		if (detailRef) scrollFadeIn(detailRef, { delay: 0.2 });
		if (featuresRef) scrollStagger(featuresRef, ':scope > *', { stagger: 0.1, y: 20 });
		if (processRef) scrollStagger(processRef, ':scope > *', { stagger: 0.15, y: 25 });
		if (projectsRef) scrollStagger(projectsRef, ':scope > *', { stagger: 0.12, y: 25 });
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

<!-- Hero -->
<section bind:this={heroRef} class="pt-24 pb-16 px-4 bg-pixel-grid relative">
	<div class="max-w-4xl mx-auto text-center">
		<a
			href="/"
			class="inline-block mb-6 font-pixel text-[0.5rem] text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors uppercase"
		>
			&larr; Back to Home
		</a>

		<span class="text-5xl mb-4 block">{service.icon}</span>

		<Container variant="dark" class="inline-block mb-4">
			<span class="font-pixel text-[0.5rem] text-[var(--color-accent-primary)] px-3 py-1 uppercase">
				Service Module
			</span>
		</Container>

		<h1 class="font-pixel text-xl md:text-2xl text-[var(--color-text-primary)] mb-4">
			{service.title}
		</h1>

		<p class="font-terminal text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
			{service.description}
		</p>
	</div>
</section>

<!-- Details + Tech Stack -->
<section bind:this={detailRef} class="py-16 px-4 bg-[var(--color-bg-secondary)]">
	<div class="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
		<div class="md:col-span-2">
			<Container variant="dark" title="service.details">
				<p class="font-terminal text-base text-[var(--color-text-secondary)] leading-relaxed">
					{service.longDescription ?? service.description}
				</p>
			</Container>
		</div>
		<div>
			<Container variant="dark" title="tech.stack">
				<div class="flex flex-wrap gap-2">
					{#each service.techStack as tech}
						<Badge text={tech} variant="dark" />
					{/each}
				</div>
			</Container>
		</div>
	</div>
</section>

<!-- Features -->
{#if service.features?.length}
	<section class="py-16 px-4 bg-[var(--color-bg-primary)]">
		<div class="max-w-4xl mx-auto">
			<h2 class="font-pixel text-lg text-[var(--color-text-primary)] mb-8 text-center">
				What's Included
			</h2>
			<div bind:this={featuresRef} class="grid sm:grid-cols-2 gap-4">
				{#each service.features as feature}
					<Container variant="dark" class="p-4">
						<p class="font-terminal text-[var(--color-text-secondary)]">
							<span class="text-[var(--color-pixel-green)]">&gt;</span> {feature}
						</p>
					</Container>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Process -->
{#if service.process?.length}
	<section class="py-16 px-4 bg-[var(--color-bg-secondary)]">
		<div class="max-w-4xl mx-auto">
			<h2 class="font-pixel text-lg text-[var(--color-text-primary)] mb-8 text-center">
				Process
			</h2>
			<div bind:this={processRef} class="space-y-4">
				{#each service.process as step, i}
					<Container variant="dark">
						<div class="flex items-start gap-4 p-2">
							<span class="font-pixel text-[var(--color-accent-primary)] text-sm">
								{String(i + 1).padStart(2, '0')}
							</span>
							<p class="font-terminal text-[var(--color-text-secondary)]">{step}</p>
						</div>
					</Container>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Related Projects -->
{#if relatedProjects.length > 0}
	<section class="py-16 px-4 bg-[var(--color-bg-primary)]">
		<div class="max-w-4xl mx-auto">
			<h2 class="font-pixel text-lg text-[var(--color-text-primary)] mb-8 text-center">
				Related Projects
			</h2>
			<div bind:this={projectsRef} class="grid sm:grid-cols-2 gap-6">
				{#each relatedProjects as project}
					<Container variant="dark" class="h-full">
						<div class="p-2">
							{#if project.thumbnail}
								<img
									src={project.thumbnail}
									alt={project.title}
									class="w-full h-32 object-cover rounded mb-3 pixel-art"
								/>
							{/if}
							<h3 class="font-pixel text-[0.65rem] text-[var(--color-accent-primary)] mb-3 uppercase">
								{project.title}
							</h3>
							<p class="font-terminal text-sm text-[var(--color-text-secondary)] mb-4">
								{project.description}
							</p>
							<div class="flex flex-wrap gap-2">
								{#each project.techStack.slice(0, 4) as tech}
									<Badge text={tech} variant="dark" />
								{/each}
							</div>
						</div>
					</Container>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- CTA -->
<section bind:this={ctaRef} class="py-20 px-4 bg-[var(--color-bg-secondary)]">
	<div class="max-w-2xl mx-auto text-center">
		<Container variant="dark">
			<div class="p-4">
				<h2 class="font-pixel text-lg text-[var(--color-text-primary)] mb-4">
					Interested in {service.title}?
				</h2>
				<p class="font-terminal text-[var(--color-text-secondary)] mb-6">
					Let's discuss your project requirements.
				</p>
				<Button variant="primary" href="/#contact">
					Get In Touch
				</Button>
			</div>
		</Container>
	</div>
</section>
