<script lang="ts">
	import { experiences, education, sectionMeta } from '$lib/data/portfolio';
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import { reveal } from '$lib/utils/motion';
	import { goToSection } from '$lib/utils/scroll';

	const meta = sectionMeta.find((s) => s.id === 'experience')!;
</script>

<section id="experience" class="section">
	<div class="sheet">
		<div use:reveal={0} data-reveal="mask">
			<SectionHead index={meta.index} label={meta.label} title={meta.title} note={meta.note} accent="short" />
		</div>

		<div class="log mt-12">
			{#each experiences as job (job.id)}
				<article class="entry" use:reveal={40} data-reveal>
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
			Next entry —
			<a class="link" href="#contact" onclick={(event) => goToSection(event, '#contact')}
				>could be your project</a
			>.
		</p>
	</div>
</section>

<style>
	.log {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.entry {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 12px;
		padding: clamp(20px, 3vw, 30px) 0 clamp(20px, 3vw, 30px) 22px;
		border-top: 2px dashed #cfcfd4;
	}

	.entry::before {
		content: '';
		position: absolute;
		left: 0;
		top: clamp(24px, 3.2vw, 34px);
		width: 8px;
		height: 8px;
		background: var(--yellow);
		border: 2px solid var(--ink);
		border-radius: 2px;
	}

	.years {
		font-size: 0.8125rem;
		color: var(--ink-3);
	}

	.dash {
		margin: 0 6px;
		color: #c9cbd0;
	}

	.role {
		font-size: 1.3125rem;
		font-weight: 660;
		letter-spacing: -0.014em;
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
		width: 9px;
		height: 9px;
		margin-top: 7px;
		flex: none;
		border-radius: 2px;
		background: var(--yellow);
		border: 1.5px solid var(--ink);
	}

	.tech {
		margin-top: 20px;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.edu::before {
		background: var(--surface);
	}

	.next {
		margin-top: 22px;
		font-size: 0.75rem;
		color: var(--ink-3);
	}

	@media (min-width: 900px) {
		.entry {
			grid-template-columns: 170px minmax(0, 1fr);
			gap: 34px;
			padding: 32px 34px;
		}

		.years {
			padding-top: 6px;
		}
	}
</style>
