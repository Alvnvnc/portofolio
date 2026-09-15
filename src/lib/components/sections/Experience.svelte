<script lang="ts">
	import { experiences, education, sectionMeta } from '$lib/data/portfolio';
	import Station from '$lib/components/ui/Station.svelte';
	import SectionHead from '$lib/components/ui/SectionHead.svelte';

	const meta = sectionMeta.find((s) => s.id === 'experience')!;
</script>

<section id="experience" class="section">
	<Station id="experience" index={meta.index} label={meta.label} />
	<div class="sheet">
		<SectionHead title={meta.title} note={meta.note} />

		<div class="log mt-12">
			{#each experiences as job (job.id)}
				<article class="entry">
					<p class="years mono">
						{job.period.start}<span class="dash">—</span>{job.period.end === 'Present'
							? 'now'
							: job.period.end}
					</p>
					<div>
						<h3 class="role">{job.position}</h3>
						<p class="where mono">{job.company} / {job.location}</p>
						<p class="desc">{job.description}</p>
						<ul class="wins">
							{#each job.achievements as win (win)}
								<li><span class="tick"></span>{win}</li>
							{/each}
						</ul>
						<p class="tech mono">{job.techStack.join(' / ')}</p>
					</div>
				</article>
			{/each}

			{#each education as edu (edu.institution)}
				<article class="entry edu">
					<p class="years mono">{edu.period.start}<span class="dash">—</span>{edu.period.end}</p>
					<div>
						<h3 class="role">{edu.degree}, {edu.field}</h3>
						<p class="where mono">{edu.institution}</p>
						{#if edu.achievements?.length}
							<ul class="wins">
								{#each edu.achievements as line (line)}
									<li><span class="tick"></span>{line}</li>
								{/each}
							</ul>
						{/if}
					</div>
				</article>
			{/each}
		</div>

		<p class="next mono">
			Next entry — <a class="link" href="#contact">could be your project</a>.
		</p>
	</div>
</section>

<style>
	.log {
		display: flex;
		flex-direction: column;
	}

	.entry {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 10px;
		border-top: 1px solid var(--rule);
		padding: 30px 0;
	}

	.years {
		font-size: 0.8125rem;
		color: var(--ink-3);
	}

	.dash {
		margin: 0 6px;
		color: var(--rule-2);
	}

	.role {
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: -0.012em;
		color: var(--ink);
	}

	.where {
		margin-top: 6px;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.desc {
		margin-top: 16px;
		font-size: 0.9375rem;
		line-height: 1.62;
		color: var(--ink-2);
		max-width: 68ch;
	}

	.wins {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 18px;
		max-width: 72ch;
	}

	.wins li {
		display: flex;
		gap: 12px;
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--ink-2);
	}

	.tick {
		width: 12px;
		height: 1px;
		margin-top: 12px;
		flex: none;
		background: var(--rule-2);
	}

	.tech {
		margin-top: 20px;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.edu {
		border-bottom: 1px solid var(--rule);
	}

	.next {
		margin-top: 28px;
		font-size: 0.75rem;
		color: var(--ink-3);
	}

	@media (min-width: 900px) {
		.entry {
			grid-template-columns: 180px minmax(0, 1fr);
			gap: 40px;
			padding: 38px 0;
		}

		.years {
			padding-top: 5px;
		}
	}
</style>
