<script lang="ts">
	import { cn } from '$lib/utils';
	import { skills, skillCategories, sectionMeta } from '$lib/data/portfolio';
	import Container from '$lib/components/ui/Container.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Progress from '$lib/components/ui/Progress.svelte';
	import { scrollFadeIn, scrollStagger, animateProgress } from '$lib/utils/animations';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const skillsMeta = sectionMeta.find((s) => s.id === 'skills');

	// Group skills by category
	const skillsByCategory = $derived(
		skillCategories.map((cat) => ({
			...cat,
			skills: skills.filter((s) => s.category === cat.id)
		}))
	);

	// Level to percentage mapping
	const levelToPercent: Record<string, number> = {
		beginner: 25,
		intermediate: 50,
		advanced: 75,
		expert: 100
	};

	// Level to variant mapping
	const levelToVariant: Record<string, 'warning' | 'primary' | 'success' | 'pattern'> = {
		beginner: 'warning',
		intermediate: 'primary',
		advanced: 'success',
		expert: 'pattern'
	};

	// Animation refs
	let headerRef: HTMLDivElement;
	let gridRef: HTMLDivElement;
	let legendRef: HTMLDivElement;

	$effect(() => {
		if (headerRef) scrollFadeIn(headerRef);
		if (gridRef) {
			scrollStagger(gridRef, ':scope > *', { stagger: 0.2, y: 30 });
			// Animate progress bars inside the grid
			const progressBars = gridRef.querySelectorAll('progress');
			progressBars.forEach((bar) => {
				const targetValue = parseFloat(bar.getAttribute('value') || '0');
				animateProgress(bar as HTMLProgressElement, targetValue);
			});
		}
		if (legendRef) scrollFadeIn(legendRef, { delay: 0.5 });
	});
</script>

<section
	id="skills"
	class={cn(
		'py-20 px-4',
		'bg-[var(--color-bg-primary)]',
		className
	)}
>
	<div class="max-w-6xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-12" bind:this={headerRef}>
			<Container variant="dark" class="inline-block mb-4">
				<span class="font-pixel text-[0.5rem] text-[var(--color-accent-primary)] px-3 py-1 uppercase">
					{skillsMeta?.systemName || 'Tech Stack'}
				</span>
			</Container>
			<h2 class="font-pixel text-xl md:text-2xl text-[var(--color-text-primary)] mb-2">
				{skillsMeta?.title || 'Skills'}
			</h2>
			<p class="font-terminal text-[var(--color-text-secondary)]">
				{skillsMeta?.subtitle || 'Core Modules & Dependencies'}
			</p>
		</div>

		<!-- Skills Grid by Category -->
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6" bind:this={gridRef}>
			{#each skillsByCategory as category (category.id)}
				<Container variant="dark" title={category.name} class="h-full">
					<div class="space-y-4">
						{#each category.skills as skill (skill.name)}
							<div class="skill-item">
								<div class="flex items-center justify-between mb-1">
									<span class="font-terminal text-sm text-[var(--color-text-primary)]">
										{skill.name}
									</span>
									<Badge
										text={skill.level}
										variant={skill.level === 'expert' ? 'success' : skill.level === 'advanced' ? 'primary' : 'dark'}
									/>
								</div>
								<Progress
									value={levelToPercent[skill.level]}
									variant={levelToVariant[skill.level]}
								/>
							</div>
						{/each}
					</div>
				</Container>
			{/each}
		</div>

		<!-- Legend -->
		<div class="mt-8 flex flex-wrap items-center justify-center gap-4" bind:this={legendRef}>
			<span class="font-pixel text-[0.5rem] text-[var(--color-text-muted)]">LEVEL:</span>
			{#each Object.entries(levelToPercent) as [level, _] (level)}
				<div class="flex items-center gap-2">
					<div class="w-3 h-3 nes-progress {levelToVariant[level] === 'pattern' ? 'is-pattern' : `is-${levelToVariant[level]}`}"></div>
					<span class="font-terminal text-xs text-[var(--color-text-secondary)] capitalize">
						{level}
					</span>
				</div>
			{/each}
		</div>
	</div>
</section>
