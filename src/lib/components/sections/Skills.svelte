<script lang="ts">
	import { skills, skillCategories, levelMeta, sectionMeta } from '$lib/data/portfolio';
	import Station from '$lib/components/ui/Station.svelte';
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import Meter from '$lib/components/ui/Meter.svelte';

	const meta = sectionMeta.find((s) => s.id === 'skills')!;

	const groups = skillCategories.map((category) => ({
		...category,
		items: skills.filter((skill) => skill.category === category.id)
	}));

	const legend = [
		{ level: 'advanced' as const, ...levelMeta.advanced },
		{ level: 'intermediate' as const, ...levelMeta.intermediate },
		{ level: 'beginner' as const, ...levelMeta.beginner }
	];
</script>

<section id="skills" class="section">
	<Station id="skills" index={meta.index} label={meta.label} />
	<div class="sheet">
		<SectionHead title={meta.title} note={meta.note} />

		<div class="strips mt-12">
			{#each groups as group (group.id)}
				<div class="strip">
					<p class="strip-head mono">
						{group.name.toLowerCase()}
						<span class="count">{String(group.items.length).padStart(2, '0')}</span>
					</p>
					<ul>
						{#each group.items as skill (skill.name)}
							<li>
								<span class="name">
									{#if skill.primary}<span class="main" title="Daily driver"></span>{/if}
									{skill.name}
								</span>
								<Meter level={levelMeta[skill.level].dots} />
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div class="legend mt-14">
			<div class="legend-list">
				{#each legend as item (item.level)}
					<div class="legend-item">
						<div class="legend-scale">
							<Meter level={item.dots} />
							<span class="mono legend-label">{item.label}</span>
						</div>
						<p>{item.hint}</p>
					</div>
				{/each}
			</div>
			<p class="legend-note mono">
				<span class="main"></span>daily driver — first reach, whatever the meter says
			</p>
		</div>
	</div>
</section>

<style>
	.strips {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 36px 32px;
	}

	.strip-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 10px;
		border-top: 1px solid var(--rule-2);
		padding-top: 10px;
		font-size: 0.6875rem;
		color: var(--ink-2);
	}

	.count {
		color: var(--ink-3);
	}

	.strip ul {
		margin-top: 14px;
	}

	.strip li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 7px 0;
		border-bottom: 1px solid var(--rule);
	}

	.strip li:last-child {
		border-bottom: none;
	}

	.name {
		display: inline-flex;
		align-items: baseline;
		gap: 8px;
		min-width: 0;
		font-size: 0.875rem;
		color: var(--ink);
	}

	.main {
		align-self: center;
		width: 6px;
		height: 6px;
		flex: none;
		background: var(--signal);
	}

	.legend {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 22px;
		border-top: 1px solid var(--rule);
		padding-top: 24px;
	}

	.legend-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 18px 40px;
	}

	.legend-scale {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.legend-label {
		font-size: 0.6875rem;
		color: var(--ink);
	}

	.legend-item p {
		margin-top: 6px;
		font-size: 0.8125rem;
		line-height: 1.55;
		color: var(--ink-3);
		max-width: 36ch;
	}

	.legend-note {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	@media (min-width: 768px) {
		.strips {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	@media (min-width: 1280px) {
		.strips {
			grid-template-columns: repeat(5, minmax(0, 1fr));
		}
	}

	@media (max-width: 479px) {
		.strips {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
