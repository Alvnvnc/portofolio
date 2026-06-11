<script lang="ts">
	import { cn } from '$lib/utils';
	import { experiences, education, sectionMeta } from '$lib/data/portfolio';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import PixelPanel from '$lib/components/ui/PixelPanel.svelte';
	import PixelBadge from '$lib/components/ui/PixelBadge.svelte';
	import { onMount } from 'svelte';
	import { scrollFadeIn, scrollStagger } from '$lib/utils/animations';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const meta = sectionMeta.find((s) => s.id === 'experience')!;

	let headerEl: HTMLElement;
	let timelineEl: HTMLElement;
	let eduEl: HTMLElement;

	onMount(() => {
		scrollFadeIn(headerEl);
		scrollStagger(timelineEl, ':scope > *', { stagger: 0.15, y: 30 });
		scrollFadeIn(eduEl, { delay: 0.25 });
	});
</script>

<section id="experience" class={cn('bg-void px-4 py-24 sm:px-6', className)}>
	<div class="mx-auto max-w-6xl">
		<div bind:this={headerEl}>
			<SectionHeader index={meta.index} title={meta.title} readout={meta.readout} />
		</div>

		<div class="grid gap-10 lg:grid-cols-3">
			<!-- Work log -->
			<div class="lg:col-span-2">
				<div bind:this={timelineEl} class="relative space-y-8 border-l-[3px] border-seam pl-6 sm:pl-8">
					{#each experiences as exp (exp.id)}
						<article class="relative">
							<!-- Timeline node -->
							<span
								class="absolute top-5 -left-6 h-[13px] w-[13px] border-2 border-ink bg-amber sm:-left-8"
								style="transform: translateX(-8px)"
								aria-hidden="true"
							></span>

							<div class="px-shadow border-[3px] border-ink bg-panel p-5 sm:p-6">
								<div class="mb-4 flex flex-wrap items-start justify-between gap-3">
									<div>
										<p class="font-pixel mb-2 text-[0.45rem] text-amber uppercase">
											log v{exp.period.start}.0 — {exp.period.end.toLowerCase()}
										</p>
										<h3 class="font-pixel text-[0.6rem] leading-relaxed text-ink uppercase">
											{exp.position}
										</h3>
										<p class="font-terminal mt-1 text-lg text-fog">{exp.company}</p>
									</div>
									<p class="font-terminal text-base text-moss">{exp.location}</p>
								</div>

								<p class="mb-4 text-sm leading-relaxed text-fog">{exp.description}</p>

								<ul class="mb-5 space-y-1.5">
									{#each exp.achievements as achievement (achievement)}
										<li class="flex items-start gap-2 text-sm leading-relaxed text-moss">
											<span class="font-terminal mt-[1px] text-phosphor">+</span>
											{achievement}
										</li>
									{/each}
								</ul>

								<div class="flex flex-wrap gap-2">
									{#each exp.techStack as tech (tech)}
										<PixelBadge text={tech} variant="outline" />
									{/each}
								</div>
							</div>
						</article>
					{/each}

					<!-- Next entry placeholder — the log is still being written -->
					<div class="relative">
						<span
							class="absolute top-2 -left-6 h-[13px] w-[13px] border-2 border-seam bg-transparent sm:-left-8"
							style="transform: translateX(-8px)"
							aria-hidden="true"
						></span>
						<p class="font-terminal text-base text-moss">
							&gt; next entry: <span class="cursor-block text-ink">could be your project</span>
						</p>
					</div>
				</div>
			</div>

			<!-- Education -->
			<div bind:this={eduEl}>
				{#each education as edu (edu.institution)}
					<PixelPanel title="training.arc" variant="night" class="p-5 pt-6">
						<h3 class="font-pixel mb-1 text-[0.55rem] leading-relaxed text-ink uppercase">
							{edu.degree}
						</h3>
						<p class="font-terminal text-lg text-phosphor">{edu.field}</p>
						<p class="mt-2 text-sm leading-relaxed text-fog">{edu.institution}</p>
						<p class="font-terminal mt-2 text-base text-moss">
							{edu.period.start} — {edu.period.end}
						</p>

						{#if edu.achievements}
							<ul class="mt-4 space-y-1.5 border-t-2 border-seam pt-4">
								{#each edu.achievements as achievement (achievement)}
									<li class="flex items-start gap-2 text-xs leading-relaxed text-moss">
										<span class="font-terminal text-phosphor">+</span>
										{achievement}
									</li>
								{/each}
							</ul>
						{/if}
					</PixelPanel>
				{/each}
			</div>
		</div>
	</div>
</section>
