<script lang="ts">
	import { personalInfo, sectionMeta } from '$lib/data/portfolio';
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import Sticker from '$lib/components/ui/Sticker.svelte';
	import type { StickerName } from '$lib/types';
	import { reveal } from '$lib/utils/motion';

	const meta = sectionMeta.find((s) => s.id === 'about')!;

	const facts = [
		{ label: 'role', value: 'Full-stack developer' },
		{ label: 'based', value: 'Surabaya, Indonesia' },
		{ label: 'study', value: 'Informatics, ITS — 2026' },
		{ label: 'status', value: 'Available for work' }
	];

	const toolkit: { name: StickerName; label: string; rot: string }[] = [
		{ name: 'server', label: 'services', rot: '-6deg' },
		{ name: 'terminal', label: 'go + sveltekit', rot: '4deg' },
		{ name: 'database', label: 'postgresql', rot: '-3deg' },
		{ name: 'sensor', label: 'iot / mqtt', rot: '5deg' },
		{ name: 'queue', label: 'async jobs', rot: '-5deg' },
		{ name: 'chip', label: 'ml / llm', rot: '3deg' },
		{ name: 'shield', label: 'auth / rbac', rot: '-4deg' },
		{ name: 'cloud', label: 'deploys', rot: '6deg' },
		{ name: 'bolt', label: 'ci / cd', rot: '-7deg' }
	];

	const traits = [
		{
			title: 'System design',
			line: 'Services organised so the next person can change them: Clean Architecture, explicit boundaries, boring dependencies.'
		},
		{
			title: 'Security first',
			line: 'RBAC, JWT, tenant isolation. Locked down before launch, not patched after it.'
		},
		{
			title: 'Data pipelines',
			line: 'Sensor-speed ingestion — streams in, time-series stored, thresholds checked on the way through.'
		},
		{
			title: 'Ship and operate',
			line: 'Containers, pipelines, monitoring. If I deploy it, I watch it.'
		}
	];
</script>

<section id="about" class="section">
	<div class="sheet">
		<div use:reveal={0} data-reveal="mask">
			<SectionHead index={meta.index} label={meta.label} title={meta.title} note={meta.note} accent="full-stack" />
		</div>

		<div class="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
			<div>
				<div class="body-copy space-y-4">
					<p>
						I'm Alvin. Most days I work in <strong class="strong">Go</strong> — APIs, queues, schemas,
						and the deploy scripts that keep them honest.
						<strong class="strong">PostgreSQL</strong> for the facts,
						<strong class="strong">InfluxDB</strong> for whatever the sensors said five seconds ago,
						<strong class="strong">Redis</strong> so nobody has to ask twice.
					</p>
					<p>
						I study Informatics at ITS Surabaya and ship production systems on the side: industrial
						IoT monitoring, multi-tenant gateways, ML inference services. Recent work goes all the way
						up the stack — dashboards in <strong class="strong">SvelteKit</strong> and
						<strong class="strong">TypeScript</strong> on top of the APIs, so the product is finished,
						not just callable. This site is one of them. Design, implement, deploy: I stay for the
						whole loop.
					</p>
				</div>

				<dl class="facts mt-10">
					{#each facts as fact (fact.label)}
						<div class="fact">
							<dt class="mono">{fact.label}</dt>
							<dd>{fact.value}</dd>
						</div>
					{/each}
				</dl>

				<ul class="traits mt-12">
					{#each traits as trait (trait.title)}
						<li>
							<span class="sq"></span>
							<div>
								<h3 class="trait-title">{trait.title}</h3>
								<p class="trait-line">{trait.line}</p>
							</div>
						</li>
					{/each}
				</ul>
			</div>

			<div class="sheet-panel" use:reveal={120} data-reveal>
				<p class="kicker panel-title">The toolkit</p>
				<ul class="toolkit">
					{#each toolkit as tool (tool.label)}
						<li>
							<span class="tool-sticker" style="--rot:{tool.rot}">
								<Sticker name={tool.name} size={64} />
							</span>
							<span class="mono tool-label">{tool.label}</span>
						</li>
					{/each}
				</ul>
				<p class="mono panel-note">{personalInfo.fullName}<br />{personalInfo.title}</p>
			</div>
		</div>
	</div>
</section>

<style>
	.strong {
		font-weight: 620;
		color: var(--ink);
	}

	.facts {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 14px;
	}

	.fact {
		background: var(--surface);
		border: 2px solid var(--ink);
		border-radius: 12px;
		padding: 12px 14px;
		box-shadow: 3px 3px 0 var(--ink);
	}

	.fact dt {
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.fact dd {
		margin-top: 4px;
		font-size: 0.875rem;
		font-weight: 520;
		color: var(--ink);
	}

	.traits {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 26px 40px;
	}

	.traits li {
		display: flex;
		gap: 12px;
	}

	.sq {
		width: 8px;
		height: 8px;
		margin-top: 7px;
		flex: none;
		background: var(--blue);
		border-radius: 2px;
	}

	.trait-title {
		font-size: 0.9375rem;
		font-weight: 640;
		color: var(--ink);
	}

	.trait-line {
		margin-top: 4px;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--ink-2);
		max-width: 42ch;
	}

	.sheet-panel {
		align-self: start;
		background: var(--surface);
		border: 2px solid var(--ink);
		border-radius: 20px;
		box-shadow: var(--shadow-lg);
		padding: 22px;
	}

	.panel-title {
		color: var(--ink-2);
	}

	.toolkit {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 18px 10px;
		margin-top: 20px;
	}

	.toolkit li {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		text-align: center;
	}

	.tool-sticker {
		display: block;
		transform: rotate(var(--rot, 0deg));
		transition: transform 240ms cubic-bezier(0.2, 0.7, 0.2, 1);
	}

	.toolkit li:hover .tool-sticker {
		transform: rotate(0deg) scale(1.12);
	}

	.tool-label {
		font-size: 0.625rem;
		line-height: 1.3;
		color: var(--ink-2);
	}

	.panel-note {
		margin-top: 20px;
		border-top: 2px dashed #d4d4d8;
		padding-top: 14px;
		font-size: 0.6875rem;
		line-height: 1.7;
		color: var(--ink-3);
	}

	@media (min-width: 640px) {
		.facts {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	@media (max-width: 639px) {
		.traits {
			grid-template-columns: 1fr;
		}
	}
</style>
