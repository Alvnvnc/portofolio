<script lang="ts">
	import { cn } from '$lib/utils';
	import { projects, sectionMeta } from '$lib/data/portfolio';
	import type { ProjectStatus } from '$lib/types';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import PixelBadge from '$lib/components/ui/PixelBadge.svelte';
	import PixelButton from '$lib/components/ui/PixelButton.svelte';
	import { onMount } from 'svelte';
	import { scrollFadeIn, scrollStagger } from '$lib/utils/animations';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const meta = sectionMeta.find((s) => s.id === 'projects')!;

	const statusMeta: Record<ProjectStatus, { label: string; led: string; text: string }> = {
		live: { label: 'Live', led: 'bg-phosphor led-blink', text: 'text-phosphor' },
		'field-test': { label: 'Field test', led: 'bg-amber', text: 'text-amber' },
		archived: { label: 'Archived', led: 'bg-moss', text: 'text-moss' }
	};

	let headerEl: HTMLElement;
	let listEl: HTMLElement;

	onMount(() => {
		scrollFadeIn(headerEl);
		scrollStagger(listEl, ':scope > *', { stagger: 0.18, y: 35 });
	});
</script>

<section id="projects" class={cn('bg-night px-4 py-24 sm:px-6', className)}>
	<div class="mx-auto max-w-6xl">
		<div bind:this={headerEl}>
			<SectionHeader index={meta.index} title={meta.title} readout={meta.readout} />
		</div>

		<div bind:this={listEl} class="space-y-10">
			{#each projects as project (project.id)}
				{@const status = statusMeta[project.status]}
				<article class="px-shadow border-[3px] border-ink bg-panel">
					<!-- Dossier header -->
					<div
						class="flex flex-wrap items-center gap-x-4 gap-y-2 border-b-[3px] border-ink bg-slot px-5 py-3"
					>
						<span class="font-pixel text-[0.5rem] text-amber uppercase">{project.code}</span>
						<h3 class="font-pixel text-[0.6rem] leading-relaxed text-ink uppercase sm:text-[0.65rem]">
							{project.title}
						</h3>
						<span class="ml-auto flex items-center gap-4">
							<PixelBadge text={project.classification} variant="outline" class="hidden sm:inline-block" />
							<span class="flex items-center gap-2">
								<span class={cn('led', status.led)}></span>
								<span class={cn('font-pixel text-[0.45rem] uppercase', status.text)}>
									{status.label}
								</span>
							</span>
						</span>
					</div>

					<div class="grid gap-6 p-5 sm:p-6 lg:grid-cols-[280px_1fr] lg:gap-8">
						<!-- Monitor feed + stack -->
						<div>
							{#if project.thumbnail}
								<div class="relative mb-4 overflow-hidden border-2 border-seam">
									<img
										src={project.thumbnail}
										alt="Pixel art illustration for {project.title}"
										class="pixel-art block aspect-square w-full object-cover"
										loading="lazy"
										width="280"
										height="280"
									/>
									<div class="scanlines pointer-events-none absolute inset-0" aria-hidden="true"></div>
									<span
										class="font-pixel absolute bottom-2 left-2 bg-night/85 px-2 py-1 text-[0.4rem] text-phosphor uppercase"
									>
										feed · {project.code}
									</span>
								</div>
							{/if}
							<div class="flex flex-wrap gap-2">
								{#each project.techStack as tech (tech)}
									<PixelBadge text={tech} variant="outline" />
								{/each}
							</div>
						</div>

						<!-- Mission file -->
						<div class="space-y-5">
							<p class="text-[0.9rem] leading-relaxed text-fog sm:text-base">
								{project.description}
							</p>

							<div>
								<h4 class="font-pixel mb-2 text-[0.5rem] text-amber uppercase">▸ Field notes</h4>
								<p class="text-sm leading-relaxed text-moss">{project.problem}</p>
							</div>

							<div>
								<h4 class="font-pixel mb-2 text-[0.5rem] text-phosphor uppercase">▸ Architecture</h4>
								<p class="text-sm leading-relaxed text-moss">{project.architecture}</p>
							</div>

							<div>
								<h4 class="font-pixel mb-2 text-[0.5rem] text-ink uppercase">▸ Patch notes</h4>
								<ul class="space-y-1.5">
									{#each project.keyDecisions as decision (decision)}
										<li class="flex items-start gap-2 text-sm leading-relaxed text-fog">
											<span class="font-terminal mt-[1px] text-phosphor">+</span>
											{decision}
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>

					<!-- Dossier footer: public demo if one exists, otherwise the honest truth -->
					<div class="border-t-2 border-seam px-5 py-4 sm:px-6">
						{#if project.links?.demo}
							<PixelButton variant="primary" size="sm" href={project.links.demo} external>
								Live system <span aria-hidden="true">▸</span>
							</PixelButton>
						{:else}
							<p class="font-terminal text-base text-moss">
								<span class="text-phosphor">$</span> git remote -v
								<span class="text-ink">→ private (client work).</span>
								Happy to walk through the architecture on a call.
							</p>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
