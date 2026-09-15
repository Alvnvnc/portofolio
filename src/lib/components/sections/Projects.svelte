<script lang="ts">
	import { projects, sectionMeta } from '$lib/data/portfolio';
	import type { ProjectStatus } from '$lib/types';
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import ProjectDiagram from '$lib/components/sections/ProjectDiagram.svelte';

	const meta = sectionMeta.find((s) => s.id === 'projects')!;

	const statusLabel: Record<ProjectStatus, string> = {
		live: 'live in production',
		'field-test': 'field test',
		archived: 'archived'
	};
</script>

<section id="projects" class="section">
	<div class="sheet">
		<SectionHead index={meta.index} label={meta.label} title={meta.title} note={meta.note} />

		<div class="projects mt-12">
			{#each projects as project, i (project.id)}
				<article class="project" class:flip={i % 2 === 1}>
					<div class="head">
						<span class="code mono">{project.code.toLowerCase()}</span>
						<span class="kind mono">{project.classification}</span>
						<span class="status" data-status={project.status}>
							<i></i>{statusLabel[project.status]}
						</span>
					</div>

					<h3 class="ptitle display">{project.title}</h3>

					<div class="grid">
						<figure class="plate">
							<div class="frame">
								<ProjectDiagram kind={project.id as 'pome' | 'portal' | 'lecsens'} />
							</div>
							<figcaption class="mono">
								plate {String(i + 1).padStart(2, '0')} — {project.id}, architecture
							</figcaption>
						</figure>

						<div class="notes">
							<p class="desc">{project.description}</p>

							<dl>
								<div class="note">
									<dt class="mono">context</dt>
									<dd>{project.problem}</dd>
								</div>
								<div class="note">
									<dt class="mono">architecture</dt>
									<dd>{project.architecture}</dd>
								</div>
								<div class="note">
									<dt class="mono">decisions</dt>
									<dd>
										<ul class="decisions">
											{#each project.keyDecisions as decision (decision)}
												<li><span class="tick"></span>{decision}</li>
											{/each}
										</ul>
									</dd>
								</div>
							</dl>

							<p class="tech mono">{project.techStack.join(' / ')}</p>

							<div class="links">
								{#if project.links?.demo}
									<a
										class="text-action"
										href={project.links.demo}
										target="_blank"
										rel="noopener noreferrer"
									>
										Open live system — {project.links.demo.replace('https://', '')}
									</a>
								{/if}
								<p class="private mono">
									Source is private — client contracts. Walkthrough available on a call.
								</p>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.projects {
		display: flex;
		flex-direction: column;
		gap: clamp(52px, 8vh, 96px);
	}

	.project {
		background: var(--surface);
		border: 2px solid var(--ink);
		border-radius: 22px;
		box-shadow: var(--shadow-lg);
		padding: clamp(20px, 3vw, 34px);
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px 20px;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.status {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 4px 12px;
		border: 2px solid var(--ink);
		border-radius: 999px;
		background: var(--surface);
		color: var(--ink-2);
	}

	.status i {
		width: 8px;
		height: 8px;
		border-radius: 999px;
		background: var(--ink-3);
	}

	.status[data-status='live'] {
		background: var(--yellow);
		color: var(--ink);
	}

	.status[data-status='live'] i {
		background: var(--blue);
	}

	.ptitle {
		margin-top: 14px;
		font-size: clamp(1.7rem, 4.4vw, 3rem);
		color: var(--ink);
		max-width: 30ch;
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 30px;
		margin-top: 26px;
	}

	.plate {
		margin: 0;
	}

	.frame {
		background: var(--paper);
		border: 2px solid var(--ink);
		border-radius: 16px;
		padding: 14px;
	}

	.plate figcaption {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 12px;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.desc {
		font-size: 1.0625rem;
		line-height: 1.6;
		color: var(--ink-2);
		max-width: 62ch;
	}

	dl {
		margin-top: 26px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.note {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 6px;
	}

	.note dt {
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.note dd {
		font-size: 0.9375rem;
		line-height: 1.62;
		color: var(--ink-2);
		max-width: 66ch;
	}

	.decisions {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.decisions li {
		display: flex;
		gap: 12px;
	}

	.tick {
		width: 12px;
		height: 8px;
		margin-top: 8px;
		flex: none;
		border-radius: 2px;
		background: var(--yellow);
		border: 1.5px solid var(--ink);
	}

	.tech {
		margin-top: 26px;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.links {
		margin-top: 18px;
	}

	.text-action {
		display: inline-block;
		font-size: 0.875rem;
		font-weight: 520;
		color: var(--ink);
		text-decoration: none;
		border-bottom: 2px solid var(--yellow);
		padding-bottom: 2px;
		transition:
			border-color 140ms ease,
			color 140ms ease;
	}

	.text-action:hover {
		color: var(--blue);
		border-color: var(--blue);
	}

	.private {
		margin-top: 12px;
		font-size: 0.75rem;
		color: var(--ink-3);
	}

	@media (min-width: 1024px) {
		.grid {
			grid-template-columns: minmax(0, 470px) minmax(0, 1fr);
			gap: 44px;
			align-items: start;
		}

		.flip .grid {
			grid-template-columns: minmax(0, 1fr) minmax(0, 470px);
		}

		.flip .plate {
			order: 2;
		}

		.note {
			grid-template-columns: 130px minmax(0, 1fr);
			gap: 20px;
		}

		.note dt {
			padding-top: 2px;
		}
	}
</style>
