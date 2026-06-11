<script lang="ts">
	import { cn } from '$lib/utils';
	import { personalInfo, sectionMeta } from '$lib/data/portfolio';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import PixelPanel from '$lib/components/ui/PixelPanel.svelte';
	import PixelIcon from '$lib/components/ui/PixelIcon.svelte';
	import type { PixelIconName } from '$lib/components/ui/PixelIcon.svelte';
	import { onMount } from 'svelte';
	import { scrollFadeIn, scrollStagger } from '$lib/utils/animations';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const meta = sectionMeta.find((s) => s.id === 'about')!;

	const traits: { icon: PixelIconName; title: string; line: string }[] = [
		{
			icon: 'stack',
			title: 'System Design',
			line: 'Clean Architecture — services that outlive their first author.'
		},
		{
			icon: 'shield',
			title: 'Security First',
			line: 'RBAC, JWT, tenant isolation. Locked before launch, not after.'
		},
		{
			icon: 'pulse',
			title: 'Data Pipelines',
			line: 'Time-series at sensor speed: ingest, store, alert.'
		},
		{
			icon: 'bolt',
			title: 'Ship & Operate',
			line: 'CI/CD, containers, monitoring. Deployed means watched.'
		}
	];

	const stats = [
		{ key: 'CLASS', value: 'Backend Engineer' },
		{ key: 'BASE', value: 'Surabaya, ID' },
		{ key: 'GUILD', value: "ITS · Informatics '26" },
		{ key: 'STATUS', value: 'Online' }
	];

	let headerEl: HTMLElement;
	let cardEl: HTMLElement;
	let bioEl: HTMLElement;
	let traitsEl: HTMLElement;

	onMount(() => {
		scrollFadeIn(headerEl);
		scrollFadeIn(cardEl, { delay: 0.1 });
		scrollFadeIn(bioEl, { delay: 0.2 });
		scrollStagger(traitsEl, ':scope > *', { stagger: 0.12, delay: 0.1 });
	});
</script>

<section id="about" class={cn('bg-void px-4 py-24 sm:px-6', className)}>
	<div class="mx-auto max-w-6xl">
		<div bind:this={headerEl}>
			<SectionHeader index={meta.index} title={meta.title} readout={meta.readout} />
		</div>

		<div class="grid gap-10 lg:grid-cols-[300px_1fr]">
			<!-- Save-file character card -->
			<div bind:this={cardEl}>
				<div class="px-shadow border-[3px] border-ink bg-night">
					<div class="relative overflow-hidden border-b-[3px] border-ink">
						<img
							src="/images/hero-character.png"
							alt="Pixel art of Alvin coding at a CRT terminal, headphones on"
							class="pixel-art block aspect-square w-full object-cover"
							loading="lazy"
							width="300"
							height="300"
						/>
						<div class="scanlines pointer-events-none absolute inset-0" aria-hidden="true"></div>
					</div>
					<div class="p-4">
						<p class="font-pixel mb-3 text-[0.55rem] leading-relaxed text-ink uppercase">
							{personalInfo.fullName}
						</p>
						<dl class="space-y-2">
							{#each stats as stat (stat.key)}
								<div class="flex items-baseline justify-between gap-3">
									<dt class="font-pixel text-[0.45rem] text-moss uppercase">{stat.key}</dt>
									<dd class="font-terminal text-right text-base text-fog">
										{#if stat.key === 'STATUS'}
											<span class="inline-flex items-center gap-2">
												<span class="led led-blink bg-phosphor"></span>
												<span class="text-phosphor">{stat.value}</span>
											</span>
										{:else}
											{stat.value}
										{/if}
									</dd>
								</div>
							{/each}
						</dl>
					</div>
				</div>
			</div>

			<!-- Profile readout + traits -->
			<div>
				<div bind:this={bioEl}>
					<PixelPanel title="operator.profile" variant="panel" class="mb-8 p-6">
						<div class="space-y-4 text-[0.9rem] leading-relaxed text-fog sm:text-base">
							<p>
								I'm <span class="text-ink">Alvin</span> — I build the boring-but-critical layer:
								APIs, queues, schemas, and the deploy scripts that keep them honest.
							</p>
							<p>
								Most days that means <span class="text-phosphor">Go</span> services and the data
								they move. <span class="text-phosphor">PostgreSQL</span> for facts,
								<span class="text-phosphor">InfluxDB</span> for whatever the sensors said five
								seconds ago, <span class="text-phosphor">Redis</span> so nobody has to ask twice.
							</p>
							<p>
								I study Informatics at ITS Surabaya and ship real systems on the side — industrial
								IoT monitoring, multi-tenant gateways, ML inference services.
								<span class="text-amber">Design, implement, deploy:</span> I stay for the whole loop.
							</p>
						</div>
					</PixelPanel>
				</div>

				<div bind:this={traitsEl} class="grid gap-4 sm:grid-cols-2">
					{#each traits as trait (trait.title)}
						<div class="px-shadow-sm px-hover border-[3px] border-ink bg-panel p-4">
							<div class="mb-2 flex items-center gap-3">
								<span class="text-amber"><PixelIcon name={trait.icon} size={18} /></span>
								<h3 class="font-pixel text-[0.5rem] text-ink uppercase">{trait.title}</h3>
							</div>
							<p class="text-sm leading-relaxed text-moss">{trait.line}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
