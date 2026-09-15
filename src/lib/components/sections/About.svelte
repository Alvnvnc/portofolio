<script lang="ts">
	import { personalInfo, sectionMeta } from '$lib/data/portfolio';
	import Station from '$lib/components/ui/Station.svelte';
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import Plate from '$lib/components/ui/Plate.svelte';

	const meta = sectionMeta.find((s) => s.id === 'about')!;

	const facts = [
		{ label: 'role', value: 'Backend engineer' },
		{ label: 'based', value: 'Surabaya, Indonesia' },
		{ label: 'study', value: 'Informatics, ITS — 2026' },
		{ label: 'status', value: 'Available for work' }
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
	<Station id="about" index={meta.index} label={meta.label} />
	<div class="sheet">
		<SectionHead title={meta.title} note={meta.note} />

		<div class="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
			<div>
				<div class="body-copy space-y-4">
					<p>
						I'm Alvin. Most days I work in <strong class="font-medium text-ink">Go</strong> — APIs,
						queues, schemas, and the deploy scripts that keep them honest.
						<strong class="font-medium text-ink">PostgreSQL</strong> for the facts,
						<strong class="font-medium text-ink">InfluxDB</strong> for whatever the sensors said
						five seconds ago, <strong class="font-medium text-ink">Redis</strong> so nobody has to
						ask twice.
					</p>
					<p>
						I study Informatics at ITS Surabaya and ship production systems on the side: industrial
						IoT monitoring, multi-tenant gateways, ML inference services. Recent work goes all the
						way up the stack — dashboards in <strong class="font-medium text-ink">SvelteKit</strong>
						and <strong class="font-medium text-ink">TypeScript</strong> on top of the APIs, so the
						product is finished, not just callable. This site is one of them. Design, implement,
						deploy: I stay for the whole loop.
					</p>
				</div>

				<dl class="facts mt-12">
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

			<div>
				<Plate
					src="/images/hero-character.webp"
					alt="Pixel-art portrait of Alvin working at a terminal with headphones on"
					caption="fig. 01 — pixel self-portrait"
				/>
				<p class="mono mt-6 text-[0.6875rem] leading-relaxed text-ink-3">
					{personalInfo.fullName}<br />{personalInfo.title}
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	.facts {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 22px 32px;
	}

	.fact {
		border-top: 1px solid var(--rule-2);
		padding-top: 12px;
	}

	.fact dt {
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.fact dd {
		margin-top: 5px;
		font-size: 0.9375rem;
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
		width: 6px;
		height: 6px;
		margin-top: 8px;
		flex: none;
		background: var(--signal);
	}

	.trait-title {
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--ink);
	}

	.trait-line {
		margin-top: 4px;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--ink-2);
		max-width: 42ch;
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
