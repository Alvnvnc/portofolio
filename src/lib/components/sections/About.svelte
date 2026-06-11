<script lang="ts">
	import { cn } from '$lib/utils';
	import { sectionMeta } from '$lib/data/portfolio';
	import Container from '$lib/components/ui/Container.svelte';
	import { onMount } from 'svelte';
	import { scrollFadeIn, scrollStagger } from '$lib/utils/animations';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const aboutMeta = sectionMeta.find((s) => s.id === 'about');

	const highlights = [
		{
			icon: '🏗️',
			title: 'System Design',
			description: 'Clean Architecture patterns with focus on maintainability and testability.'
		},
		{
			icon: '🔐',
			title: 'Security First',
			description: 'RBAC, JWT authentication, and secure multi-tenant isolation.'
		},
		{
			icon: '📊',
			title: 'Data Engineering',
			description: 'Time-series databases, query optimization, and real-time analytics.'
		},
		{
			icon: '🚀',
			title: 'DevOps',
			description: 'CI/CD pipelines, containerization, and zero-downtime deployments.'
		}
	];

	let headerEl: HTMLElement;
	let descriptionEl: HTMLElement;
	let highlightsEl: HTMLElement;

	onMount(() => {
		scrollFadeIn(headerEl);
		scrollFadeIn(descriptionEl, { delay: 0.2 });
		scrollStagger(highlightsEl, ':scope > *', { stagger: 0.15, delay: 0.1 });
	});
</script>

<section
	id="about"
	class={cn(
		'py-20 px-4',
		'bg-[var(--color-bg-secondary)]',
		className
	)}
>
	<div class="max-w-6xl mx-auto">
		<!-- Section Header -->
		<div bind:this={headerEl} class="text-center mb-12">
			<Container variant="dark" class="inline-block mb-4">
				<span class="font-pixel text-[0.5rem] text-[var(--color-accent-primary)] px-3 py-1 uppercase">
					{aboutMeta?.systemName || 'System Overview'}
				</span>
			</Container>
			<h2 class="font-pixel text-xl md:text-2xl text-[var(--color-text-primary)] mb-4">
				{aboutMeta?.title || 'About'}
			</h2>
		</div>

		<!-- Main Content -->
		<div class="grid md:grid-cols-2 gap-8 items-start">
			<!-- Left: Description -->
			<div bind:this={descriptionEl}>
				<Container variant="dark" title="README.md" class="h-full">
					<div class="font-terminal text-base leading-relaxed text-[var(--color-text-secondary)] space-y-4">
						<p>
							I'm <span class="text-[var(--color-accent-primary)]">Alvin Vincent</span>, a Backend Engineer from Surabaya, Indonesia, studying Informatics at ITS.
						</p>
						<p>
							I specialize in building production-grade systems using <span class="text-[var(--color-pixel-green)]">Golang</span>, <span class="text-[var(--color-pixel-green)]">Clean Architecture</span>, and <span class="text-[var(--color-pixel-green)]">modern DevOps</span> — from IoT data pipelines to AI-powered workflows.
						</p>
						<p>
							My approach is end-to-end: <span class="text-[var(--color-accent-secondary)]">design, implement, deploy</span>. I care about maintainable code, secure APIs, and systems that scale.
						</p>
					</div>
				</Container>
			</div>

			<!-- Right: Highlights Grid -->
			<div bind:this={highlightsEl} class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{#each highlights as item, i (i)}
					<Container variant="rounded" class="text-center p-4">
						<span class="text-3xl mb-3 block">{item.icon}</span>
						<h3 class="font-pixel text-[0.6rem] text-[var(--color-accent-primary)] mb-2 uppercase">
							{item.title}
						</h3>
						<p class="font-terminal text-sm text-[var(--color-text-secondary)]">
							{item.description}
						</p>
					</Container>
				{/each}
			</div>
		</div>
	</div>
</section>
