<script lang="ts">
	import { projects, sectionMeta } from '$lib/data/portfolio';
	import type { ProjectStatus } from '$lib/types';
	import Station from '$lib/components/ui/Station.svelte';
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import Plate from '$lib/components/ui/Plate.svelte';

	const meta = sectionMeta.find((s) => s.id === 'projects')!;

	const statusLabel: Record<ProjectStatus, string> = {
		live: 'live in production',
		'field-test': 'field test',
		archived: 'archived'
	};
</script>

<section id="projects" class="section">
	<Station id="projects" index={meta.index} label={meta.label} />
	<div class="sheet">
		<SectionHead title={meta.title} note={meta.note} />

		<div class="projects mt-12">
			{#each projects as project, i (project.id)}
				<article class="project" class:flip={i % 2 === 1}>
					<p class="head mono">
						<span class="code">{project.code.toLowerCase()}</span>
						<span class="kind">{project.classification}</span>
						<span class="status" data-status={project.status}>
							<i></i>{statusLabel[project.status]}
						</span>
					</p>

					<h3 class="ptitle">{project.title}</h3>

					<div class="grid">
						<div class="plate-col">
							{#if project.thumbnail}
								<Plate
									src={project.thumbnail}
									alt="Pixel-art illustration for {project.title}"
									caption="plate {String(i + 1).padStart(2, '0')} — {project.id}"
								/>
							{/if}
						</div>

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
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.projects {
		display: flex;
		flex-direction: column;
		gap: clamp(56px, 9vh, 104px);
	}

	.project {
		border-top: 1px solid var(--rule);
		padding-top: 26px;
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px 24px;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.status {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	.status i {
		width: 6px;
		height: 6px;
		background: var(--rule-2);
	}

	.status[data-status='live'] i {
		background: var(--signal);
	}

	.status[data-status='live'] {
		color: var(--signal);
	}

	.ptitle {
		margin-top: 14px;
		font-size: clamp(1.6rem, 3.4vw, 2.6rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.08;
		color: var(--ink);
		max-width: 26ch;
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 32px;
		margin-top: 28px;
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
		height: 1px;
		margin-top: 12px;
		flex: none;
		background: var(--rule-2);
	}

	.tech {
		margin-top: 26px;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.private {
		margin-top: 14px;
		font-size: 0.75rem;
		color: var(--ink-3);
	}

	.text-action {
		display: inline-block;
		margin-top: 16px;
		font-size: 0.875rem;
		color: var(--ink);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 3px;
		transition: color 140ms ease;
	}

	.text-action:hover {
		color: var(--signal);
	}

	@media (min-width: 1024px) {
		.grid {
			grid-template-columns: minmax(0, 380px) minmax(0, 1fr);
			gap: 56px;
			align-items: start;
		}

		.flip .grid {
			grid-template-columns: minmax(0, 1fr) minmax(0, 380px);
		}

		.flip .plate-col {
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
