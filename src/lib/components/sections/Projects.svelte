<script lang="ts">
	import { onMount } from 'svelte';
	import { projects } from '$lib/data/portfolio';
	import { t, locale } from '$lib/i18n';
	import { localizedPath } from '$lib/seo';
	import { lineDraw, staggerRise } from '$lib/actions/motion';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import HelixCanvas from '$lib/components/three/HelixCanvas.svelte';

	// Shared ref-like object read by the helix render loop each frame.
	const progress = { current: 0 };
	let helixEl: HTMLElement;

	onMount(() => {
		const update = () => {
			const rect = helixEl.getBoundingClientRect();
			const total = rect.height - window.innerHeight;
			const scrolled = -rect.top;
			progress.current = Math.max(0, Math.min(1, total <= 0 ? 0 : scrolled / total));
		};
		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	});
</script>

<section id="projects" aria-label={$t.projects.kicker}>
	<!-- The ribbon: a floating helix of work cards you travel by scrolling. -->
	<div bind:this={helixEl} class="relative h-[320vh] bg-bg">
		<div class="sticky top-0 h-dvh w-full overflow-hidden">
			<HelixCanvas {progress} />

			<!-- Melt scrims top + bottom so the archive has no hard seam. -->
			<div
				aria-hidden="true"
				class="pointer-events-none absolute inset-x-0 top-0 h-[40vh] bg-gradient-to-b from-bg via-bg/60 to-transparent"
			></div>
			<div
				aria-hidden="true"
				class="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-bg via-bg/60 to-transparent"
			></div>

			<div class="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
				<div class="flex items-start justify-between kicker">
					<span><span class="text-accent">{$t.projects.index}</span> / {$t.projects.kicker}</span>
					<span class="hidden sm:block">{$t.projects.helixHint}</span>
				</div>
				<h2 class="max-w-md font-display text-2xl leading-tight text-fg/90 sm:text-3xl">
					{#each $t.projects.helixLine.split('\n') as line, i (i)}
						{#if i > 0}<br />{/if}{line}
					{/each}
				</h2>
			</div>
		</div>
	</div>

	<!-- The dossiers: real deployed systems, printed in full. -->
	<div class="relative bg-bg px-6 py-24 sm:px-10 sm:py-32">
		<SectionHeader
			index={$t.projects.index}
			title={$t.projects.kicker}
			readout="{String(projects.length).padStart(2, '0')} {$t.projects.count} — {$t.projects.readout}"
		/>

		<div class="flex flex-col">
			{#each projects as project, pi (project.id)}
				{@const copy = $t.projects.entries[project.id]}
				<article class="relative py-12 sm:py-16">
					{#if pi > 0}
						<div class="hairline absolute top-0 left-0" use:lineDraw></div>
					{/if}

					<div class="grid gap-8 lg:grid-cols-[minmax(0,180px)_1fr] lg:gap-16" use:staggerRise={{ y: 28 }}>
						<!-- Margin column: oversized index, code, status -->
						<div class="flex items-baseline gap-6 lg:flex-col lg:gap-4">
							<span
								class="font-display text-5xl leading-none text-fg-muted/40 select-none sm:text-6xl"
								aria-hidden="true"
							>
								{String(pi + 1).padStart(2, '0')}
							</span>
							<div class="space-y-2">
								<p class="font-mono text-xs tracking-[0.2em] text-accent uppercase">{project.code}</p>
								<p class="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-fg-muted uppercase">
									<span
										class="h-1.5 w-1.5 rounded-full {project.status === 'live' ? 'bg-accent-2' : 'bg-accent'}"
										aria-hidden="true"
									></span>
									{$t.projects.status[project.status]}
								</p>
							</div>
						</div>

						<!-- Body -->
						<div>
							<header class="flex flex-wrap items-baseline gap-x-6 gap-y-2">
								<h3 class="font-display text-2xl text-fg uppercase sm:text-3xl">
									{project.title}
								</h3>
								<span class="kicker">{project.classification}</span>
							</header>

							<p class="mt-6 max-w-3xl font-body text-base leading-relaxed text-fg-muted sm:text-lg">
								{copy?.description ?? project.description}
							</p>

							<div class="mt-10 grid gap-10 lg:grid-cols-2">
								<div>
									<h4 class="kicker text-accent!">{$t.projects.fieldNotes}</h4>
									<p class="mt-3 max-w-[62ch] font-body text-sm leading-relaxed text-fg-muted">
										{copy?.problem ?? project.problem}
									</p>
								</div>
								<div>
									<h4 class="kicker">{$t.projects.architecture}</h4>
									<p class="mt-3 max-w-[62ch] font-body text-sm leading-relaxed text-fg-muted">
										{copy?.architecture ?? project.architecture}
									</p>
								</div>
							</div>

							<div class="mt-10">
								<h4 class="kicker">{$t.projects.keyDecisions}</h4>
								<ul class="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2">
									{#each copy?.keyDecisions ?? project.keyDecisions as decision (decision)}
										<li class="flex items-start gap-3 font-body text-sm leading-relaxed text-fg-muted">
											<span class="mt-px font-mono text-xs text-accent" aria-hidden="true">(+)</span>
											{decision}
										</li>
									{/each}
								</ul>
							</div>

							<p class="mt-10 font-mono text-[11px] leading-relaxed tracking-[0.15em] text-fg-muted uppercase">
								<span class="text-fg">{$t.projects.stack}</span>
								<span aria-hidden="true">&nbsp;—&nbsp;</span>{project.techStack.join(' · ')}
							</p>

							<a
								href={localizedPath('/portofolio', $locale)}
								data-cursor="Open"
								class="draw-link mt-8 inline-block font-mono text-[11px] tracking-[0.2em] text-accent uppercase transition-colors hover:text-fg"
							>
								{$t.projects.seeLive}
								<span aria-hidden="true">&nbsp;→</span>
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
