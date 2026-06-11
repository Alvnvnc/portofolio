<script lang="ts">
	import { cn } from '$lib/utils';
	import { projects, sectionMeta } from '$lib/data/portfolio';
	import Container from '$lib/components/ui/Container.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollFadeIn, scrollStagger } from '$lib/utils/animations';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const projectsMeta = sectionMeta.find((s) => s.id === 'projects');

	// Featured projects first
	const sortedProjects = $derived(
		[...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
	);

	// Animation refs
	let headerRef: HTMLDivElement;
	let projectsListRef: HTMLDivElement;

	$effect(() => {
		if (headerRef) scrollFadeIn(headerRef);
		if (projectsListRef) {
			scrollStagger(projectsListRef, ':scope > .project-card-wrapper', { stagger: 0.25, y: 40 });
		}
	});
</script>

<section
	id="projects"
	class={cn(
		'py-20 px-4',
		'bg-[var(--color-bg-secondary)]',
		className
	)}
>
	<div class="max-w-6xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-12" bind:this={headerRef}>
			<Container variant="dark" class="inline-block mb-4">
				<span class="font-pixel text-[0.5rem] text-[var(--color-accent-primary)] px-3 py-1 uppercase">
					{projectsMeta?.systemName || 'Services'}
				</span>
			</Container>
			<h2 class="font-pixel text-xl md:text-2xl text-[var(--color-text-primary)] mb-2">
				{projectsMeta?.title || 'Projects'}
			</h2>
			<p class="font-terminal text-[var(--color-text-secondary)]">
				{projectsMeta?.subtitle || 'Production Systems'}
			</p>
		</div>

		<!-- Projects Grid -->
		<div class="space-y-8" bind:this={projectsListRef}>
			{#each sortedProjects as project (project.id)}
				<div class="project-card-wrapper">
				<Container
					variant="dark"
					title={project.featured ? '★ ' + project.title : project.title}
					class="project-card"
				>
					<div class="grid md:grid-cols-3 gap-6">
						<!-- Left: Problem & Description -->
						<div class="md:col-span-2 space-y-4">
							<!-- Thumbnail -->
							{#if project.thumbnail}
								<div class="mb-4 overflow-hidden pixel-border-sm">
									<img
										src={project.thumbnail}
										alt="{project.title} thumbnail"
										class="w-full h-40 object-cover pixel-art"
									/>
								</div>
							{/if}
							<!-- Description -->
							<p class="font-terminal text-base text-[var(--color-text-secondary)]">
								{project.description}
							</p>

							<!-- Problem Statement -->
							<div>
								<h4 class="font-pixel text-[0.55rem] text-[var(--color-accent-warning)] mb-2 uppercase">
									Problem
								</h4>
								<p class="font-terminal text-sm text-[var(--color-text-secondary)]">
									{project.problem}
								</p>
							</div>

							<!-- Architecture -->
							<div>
								<h4 class="font-pixel text-[0.55rem] text-[var(--color-accent-secondary)] mb-2 uppercase">
									Architecture
								</h4>
								<p class="font-terminal text-sm text-[var(--color-text-secondary)]">
									{project.architecture}
								</p>
							</div>

							<!-- Key Decisions -->
							<div>
								<h4 class="font-pixel text-[0.55rem] text-[var(--color-accent-primary)] mb-2 uppercase">
									Key Decisions
								</h4>
								<ul class="space-y-1">
									{#each project.keyDecisions as decision, i (i)}
										<li class="font-terminal text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
											<span class="text-[var(--color-pixel-green)]">→</span>
											{decision}
										</li>
									{/each}
								</ul>
							</div>
						</div>

						<!-- Right: Tech Stack & Links -->
						<div class="space-y-4">
							<!-- Tech Stack -->
							<div>
								<h4 class="font-pixel text-[0.55rem] text-[var(--color-text-muted)] mb-3 uppercase">
									Tech Stack
								</h4>
								<div class="flex flex-wrap gap-2">
									{#each project.techStack as tech (tech)}
										<Badge text={tech} variant="dark" />
									{/each}
								</div>
							</div>

							<!-- Links -->
							{#if project.links}
								<div class="pt-4 space-y-2">
									{#if project.links.github}
										<Button variant="ghost" size="sm" href={project.links.github} class="w-full">
											<span class="nes-icon github is-small mr-2"></span>
											View Code
										</Button>
									{/if}
									{#if project.links.demo}
										<Button variant="primary" size="sm" href={project.links.demo} class="w-full">
											Live Demo
										</Button>
									{/if}
								</div>
							{/if}
						</div>
					</div>
				</Container>
				</div>
			{/each}
		</div>
	</div>
</section>
