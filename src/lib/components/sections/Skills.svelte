<script lang="ts">
	import { cn } from '$lib/utils';
	import { skills, skillCategories, levelMeta, sectionMeta } from '$lib/data/portfolio';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import PixelPanel from '$lib/components/ui/PixelPanel.svelte';
	import PixelIcon from '$lib/components/ui/PixelIcon.svelte';
	import LevelDots from '$lib/components/ui/LevelDots.svelte';
	import { onMount } from 'svelte';
	import { scrollFadeIn, scrollStagger } from '$lib/utils/animations';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const meta = sectionMeta.find((s) => s.id === 'skills')!;

	const grouped = skillCategories.map((cat) => ({
		...cat,
		skills: skills.filter((s) => s.category === cat.id)
	}));

	// Legend order: strongest first
	const legendLevels = ['expert', 'advanced', 'intermediate', 'beginner'] as const;

	let headerEl: HTMLElement;
	let gridEl: HTMLElement;

	onMount(() => {
		scrollFadeIn(headerEl);
		scrollStagger(gridEl, ':scope > *', { stagger: 0.12, y: 25 });
	});
</script>

<section id="skills" class={cn('bg-void px-4 py-24 sm:px-6', className)}>
	<div class="mx-auto max-w-6xl">
		<div bind:this={headerEl}>
			<SectionHeader index={meta.index} title={meta.title} readout={meta.readout} />
		</div>

		<div bind:this={gridEl} class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each grouped as category (category.id)}
				<PixelPanel title={category.name} variant="panel" class="p-5 pt-6">
					<span class="absolute top-4 right-4 text-moss" aria-hidden="true">
						<PixelIcon name={category.icon} size={16} />
					</span>
					<ul class="mt-1 space-y-3">
						{#each category.skills as skill (skill.name)}
							<li class="flex items-center justify-between gap-3">
								<span class="flex items-center gap-2 text-sm text-fog">
									{skill.name}
									{#if skill.primary}
										<span
											class="font-pixel border border-amber px-1 py-[2px] text-[0.4rem] leading-none text-amber uppercase"
											title="Daily driver"
										>
											main
										</span>
									{/if}
								</span>
								<LevelDots level={levelMeta[skill.level].dots} label={skill.name} />
							</li>
						{/each}
					</ul>
				</PixelPanel>
			{/each}

			<!-- Legend panel fills the sixth slot -->
			<PixelPanel title="legend.txt" variant="night" class="p-5 pt-6">
				<ul class="mt-1 space-y-4">
					{#each legendLevels as level (level)}
						<li class="flex items-start gap-3">
							<LevelDots level={levelMeta[level].dots} label={levelMeta[level].label} class="mt-[5px]" />
							<div>
								<p class="font-pixel text-[0.5rem] text-ink uppercase">{levelMeta[level].label}</p>
								<p class="text-xs leading-relaxed text-moss">{levelMeta[level].hint}</p>
							</div>
						</li>
					{/each}
				</ul>
				<p class="font-terminal mt-5 border-t-2 border-seam pt-3 text-base text-moss">
					&gt; scale calibrated against production incidents, not confidence.
				</p>
			</PixelPanel>
		</div>
	</div>
</section>
