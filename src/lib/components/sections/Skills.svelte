<script lang="ts">
	import { skills, skillCategories, levelMeta, sectionMeta } from '$lib/data/portfolio';
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import Meter from '$lib/components/ui/Meter.svelte';
	import { reveal } from '$lib/utils/motion';

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

<section id="skills" class="section section--yellow on-color">
	<div class="sheet">
		<div use:reveal={0} data-reveal="mask">
			<SectionHead index={meta.index} label={meta.label} title={meta.title} note={meta.note} accent="calibrated" />
		</div>

		<div class="board mt-12" use:reveal={80} data-reveal>
			<div class="strips">
				{#each groups as group (group.id)}
					<div class="strip">
						<p class="strip-head kicker">
							{group.name}
							<span class="count mono">{String(group.items.length).padStart(2, '0')}</span>
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

			<div class="legend">
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
	</div>
</section>

<style>
	.board {
		background: var(--surface);
		border: 2px solid var(--ink);
		border-radius: 20px;
		box-shadow: var(--shadow-lg);
		padding: clamp(20px, 3vw, 34px);
	}

	.strips {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 30px 28px;
	}

	.strip-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 10px;
		border-top: 2px solid var(--ink);
		padding-top: 10px;
		color: var(--ink);
	}

	.count {
		font-size: 0.6875rem;
		letter-spacing: 0;
		color: var(--ink-3);
	}

	.strip ul {
		margin-top: 12px;
	}

	.strip li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 7px 0;
		border-bottom: 1px dashed #dcdce0;
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
		width: 8px;
		height: 8px;
		flex: none;
		border-radius: 2px;
		background: var(--yellow);
		border: 1.5px solid var(--ink);
	}

	.legend {
		margin-top: 30px;
		border-top: 2px dashed #dcdce0;
		padding-top: 22px;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 18px;
	}

	.legend-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 16px 34px;
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
		max-width: 34ch;
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
