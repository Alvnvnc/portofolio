<script lang="ts">
	import { skills, skillCategories, levelMeta } from '$lib/data/portfolio';
	import { t } from '$lib/i18n';
	import { staggerRise, rise } from '$lib/actions/motion';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';

	const grouped = skillCategories.map((cat) => ({
		...cat,
		skills: skills.filter((s) => s.category === cat.id)
	}));

	const legendLevels = ['expert', 'advanced', 'intermediate', 'beginner'] as const;
</script>

{#snippet dots(count: number)}
	<span class="flex items-center gap-1" aria-hidden="true">
		{#each [0, 1, 2, 3] as i (i)}
			<span class="h-1.5 w-1.5 rounded-full {i < count ? 'bg-accent' : 'bg-border'}"></span>
		{/each}
	</span>
{/snippet}

<section id="skills" class="relative bg-bg px-6 py-24 sm:px-10 sm:py-32">
	<SectionHeader index={$t.skills.index} title={$t.skills.kicker} readout={$t.skills.readout} />

	<!-- The loadout reads as a printed spec table: category ledgers, no boxes. -->
	<div class="grid gap-x-16 gap-y-14 md:grid-cols-2 lg:grid-cols-3" use:staggerRise={{ y: 24 }}>
		{#each grouped as category (category.id)}
			<div>
				<h3 class="flex items-baseline justify-between border-b border-border pb-3">
					<span class="kicker text-fg!">{$t.skills.categories[category.id] ?? category.name}</span>
					<span class="font-mono text-[10px] text-fg-muted/60" aria-hidden="true">
						×{String(category.skills.length).padStart(2, '0')}
					</span>
				</h3>
				<ul>
					{#each category.skills as skill (skill.name)}
						<li
							class="flex items-center justify-between gap-3 border-b border-border/50 py-3"
						>
							<span class="flex items-baseline gap-2.5 font-body text-sm text-fg-muted">
								{skill.name}
								{#if skill.primary}
									<span
										class="font-mono text-[9px] tracking-[0.15em] text-accent uppercase"
										title={$t.skills.mainTitle}
									>
										[{$t.skills.main}]
									</span>
								{/if}
							</span>
							{@render dots(levelMeta[skill.level].dots)}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<!-- Legend as a colophon footnote, not another card. -->
	<div class="mt-16 border-t border-dashed border-border pt-6" use:rise>
		<dl class="flex flex-wrap gap-x-10 gap-y-4">
			{#each legendLevels as level (level)}
				<div class="flex items-center gap-3">
					{@render dots(levelMeta[level].dots)}
					<dt class="font-mono text-[10px] tracking-[0.15em] text-fg uppercase">
						{$t.skills.levels[level].label}
					</dt>
					<dd class="hidden font-body text-xs text-fg-muted lg:block">
						— {$t.skills.levels[level].hint}
					</dd>
				</div>
			{/each}
		</dl>
		<p class="mt-5 font-mono text-[11px] tracking-[0.05em] text-fg-muted/80">
			{$t.skills.footnote}
		</p>
	</div>
</section>
