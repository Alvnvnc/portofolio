<script lang="ts">
	import { featuredSystem, systemFlow, architectureNotes, projects } from '$lib/data/portfolio';
	import type { ProjectStatus } from '$lib/types';
	import Icon from '$lib/components/ui/Icon.svelte';
	import PortfolioLiveEmbed from '$lib/components/sections/PortfolioLiveEmbed.svelte';
	import { lineDraw } from '$lib/actions/motion';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { scrollFadeIn, scrollStagger, parallax, scrubbedFlow } from '$lib/utils/animations';
	import Seo from '$lib/components/Seo.svelte';
	import { t, locale } from '$lib/i18n';
	import { SITE_URL, absoluteUrl, localizedPath } from '$lib/seo';

	const ui = $derived($t.archive);
	const homeHref = $derived(localizedPath('/', $locale));
	const statusLabel = $derived($t.projects.status as Record<ProjectStatus, string>);

	const jsonLd = $derived([
		{
			'@context': 'https://schema.org',
			'@type': 'CollectionPage',
			name: $t.seo.archive.title,
			url: absoluteUrl('/portofolio', $locale),
			description: $t.seo.archive.description,
			inLanguage: $locale === 'id' ? 'id-ID' : 'en',
			author: { '@id': `${SITE_URL}/#person` },
			mainEntity: {
				'@type': 'ItemList',
				itemListElement: projects.map((project, i) => ({
					'@type': 'ListItem',
					position: i + 1,
					name: project.title,
					description: $t.projects.entries[project.id]?.description ?? project.description,
					url: project.liveUrl ?? project.demoUrl ?? absoluteUrl('/portofolio', $locale)
				}))
			}
		}
	]);

	/** strip protocol + trailing slash for a clean, printable host label */
	const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/+$/, '');

	let heroRef: HTMLElement;
	let heroArtRef: HTMLElement;
	let featuredRef: HTMLElement;
	let embedRef: HTMLElement;
	let flowRef: HTMLElement;
	let archiveRef: HTMLElement;
	let notesRef: HTMLElement;
	let ctaRef: HTMLElement;

	onMount(() => {
		const ctx = gsap.context(() => {
			scrollFadeIn(heroRef);
			if (heroArtRef) parallax(heroArtRef, 10);
			scrollFadeIn(featuredRef, { delay: 0.05 });
			scrollFadeIn(embedRef);
			scrubbedFlow(flowRef, '[data-flow-node]');
			scrollStagger(archiveRef, '[data-archive-entry]', { stagger: 0.12, y: 28 });
			scrollStagger(notesRef, '[data-note]', { stagger: 0.08, y: 20 });
			scrollFadeIn(ctaRef, { delay: 0.05 });
		});
		return () => ctx.revert();
	});
</script>

<Seo
	path="/portofolio"
	title={$t.seo.archive.title}
	description={$t.seo.archive.description}
	keywords={$t.seo.archive.keywords}
	{jsonLd}
/>

<!-- ================= HERO ================= -->
<section bind:this={heroRef} class="grain relative overflow-hidden px-6 pt-32 pb-20 sm:px-10 sm:pb-24">
	<div class="mx-auto grid max-w-6xl items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
		<div>
			<a
				href="{homeHref}#projects"
				data-cursor="Back"
				class="draw-link mb-10 inline-block font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase transition-colors hover:text-accent"
			>
				<span aria-hidden="true">←&nbsp;</span>{ui.back}
			</a>
			<p class="kicker flex items-center gap-2">
				<span class="live-dot h-1.5 w-1.5 rounded-full bg-accent-2" aria-hidden="true"></span>
				<span><span class="text-accent-2">00</span> / {ui.kicker}</span>
			</p>
			<h1 class="mt-5 font-display text-5xl leading-[0.9] text-fg uppercase sm:text-6xl lg:text-7xl">
				{ui.headingA}<br />{ui.headingB}
			</h1>
			<p class="mt-7 max-w-xl font-body text-base leading-relaxed text-fg-muted sm:text-lg">
				{ui.intro}
			</p>
		</div>

		<!-- Archive readout — editorial spec list, no card -->
		<div bind:this={heroArtRef}>
			<div class="hairline" use:lineDraw></div>
			<p class="mt-5 font-mono text-[11px] tracking-[0.25em] text-fg-muted uppercase">{ui.statusLabel}</p>
			<dl class="mt-5 font-mono text-sm">
				<div class="flex justify-between gap-4 border-b border-border py-3">
					<dt class="text-fg-muted">{ui.status.online}</dt>
					<dd class="text-accent-2">03 / 03</dd>
				</div>
				<div class="flex justify-between gap-4 border-b border-border py-3">
					<dt class="text-fg-muted">{ui.status.featured}</dt>
					<dd class="text-fg">SYS-01 · POME</dd>
				</div>
				<div class="flex justify-between gap-4 border-b border-border py-3">
					<dt class="text-fg-muted">{ui.status.classification}</dt>
					<dd class="text-accent">{ui.status.classificationValue}</dd>
				</div>
				<div class="flex justify-between gap-4 py-3">
					<dt class="text-fg-muted">{ui.status.access}</dt>
					<dd class="text-fg-muted">{ui.status.accessValue}</dd>
				</div>
			</dl>
		</div>
	</div>
</section>

<!-- ================= FEATURED LIVE SYSTEM ================= -->
<section bind:this={featuredRef} class="border-t border-border bg-bg px-6 py-20 sm:px-10 sm:py-28">
	<div class="mx-auto max-w-6xl">
		<p class="kicker flex flex-wrap items-center gap-x-4 gap-y-2">
			<span class="text-accent">{ui.featured.label}</span>
			<span class="flex items-center gap-2 text-accent-2">
				<span class="live-dot h-1.5 w-1.5 rounded-full bg-accent-2" aria-hidden="true"></span>
				{ui.online}
			</span>
		</p>

		<div class="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
			<div>
				<h2 class="font-display text-3xl text-fg uppercase sm:text-4xl">{featuredSystem.name}</h2>
				<p class="mt-3 font-mono text-sm tracking-[0.15em] text-accent uppercase">
					{ui.featured.subtitle}
				</p>
				<p class="mt-6 max-w-xl font-body text-base leading-relaxed text-fg-muted sm:text-lg">
					{ui.featured.description}
				</p>

				<p class="mt-8 font-mono text-[11px] leading-relaxed tracking-[0.15em] text-fg-muted uppercase">
					<span class="text-fg">{$t.projects.stack}</span>
					<span aria-hidden="true">&nbsp;—&nbsp;</span>{featuredSystem.techStack.join(' · ')}
				</p>

				<div class="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
					<a
						href={featuredSystem.embedUrl}
						target="_blank"
						rel="noopener noreferrer"
						data-cursor="Open"
						class="draw-link font-mono text-[11px] tracking-[0.2em] text-accent uppercase transition-colors hover:text-fg"
					>
						{ui.openDemo}<span aria-hidden="true">&nbsp;→</span>
					</a>
					<a
						href="{homeHref}#projects"
						class="draw-link font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase transition-colors hover:text-fg"
					>
						{ui.fullDossier}<span aria-hidden="true">&nbsp;→</span>
					</a>
				</div>
			</div>

			<div bind:this={embedRef}>
				<PortfolioLiveEmbed
					url={featuredSystem.embedUrl}
					title={ui.featured.embedTitle}
					fallback={ui.featured.embedFallback}
				/>
			</div>
		</div>
	</div>
</section>

<!-- ================= SYSTEM FLOW ================= -->
<section class="border-t border-border bg-bg px-6 py-24 sm:px-10 sm:py-32">
	<div class="mx-auto max-w-6xl">
		<p class="kicker"><span class="text-accent">↳</span> / {ui.flowKicker}</p>
		<h2 class="mt-5 font-display text-3xl leading-[0.95] text-fg uppercase sm:text-4xl">
			{ui.flowHeadingA}<br />{ui.flowHeadingB}
		</h2>
		<div class="hairline mt-8" use:lineDraw></div>

		<div bind:this={flowRef} class="flow-stage relative mt-12 overflow-hidden py-8">
			<div class="flow-progress" aria-hidden="true"><span></span></div>

			<div class="grid gap-8 md:grid-cols-3 xl:grid-cols-6">
				{#each systemFlow as step (step.id)}
					<div data-flow-node class="flow-node flex flex-col items-center text-center">
						<span class="flow-icon flex h-14 w-14 items-center justify-center rounded-full border border-border text-fg-muted">
							<Icon name={step.icon} size={22} />
						</span>
						<span class="mt-4 font-mono text-[10px] tracking-[0.2em] text-accent uppercase">{step.index}</span>
						<span class="mt-1 font-display text-sm text-fg uppercase">{ui.flow[step.id]?.label ?? step.label}</span>
						<span class="mt-1 font-mono text-[11px] text-fg-muted">{ui.flow[step.id]?.readout ?? step.readout}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ================= PROJECT ARCHIVE ================= -->
<section class="border-t border-border bg-bg px-6 py-24 sm:px-10 sm:py-32">
	<div class="mx-auto max-w-6xl">
		<p class="kicker"><span class="text-accent">↳</span> / {ui.fleetKicker}</p>
		<h2 class="mt-5 font-display text-3xl leading-[0.95] text-fg uppercase sm:text-4xl">
			{ui.fleetHeading}
		</h2>
		<p class="mt-4 max-w-xl font-body text-sm leading-relaxed text-fg-muted">
			{ui.fleetIntro}
		</p>
		<div class="hairline mt-8" use:lineDraw></div>

		<div bind:this={archiveRef} class="flex flex-col">
			{#each projects as project, i (project.id)}
				<article
					data-archive-entry
					class="relative grid gap-8 py-14 sm:py-20 lg:grid-cols-[minmax(0,190px)_1fr] lg:gap-16"
				>
					{#if i > 0}
						<div class="hairline absolute top-0 left-0" use:lineDraw></div>
					{/if}

					<!-- Margin column -->
					<div class="flex items-baseline gap-6 lg:flex-col lg:gap-4">
						<span
							class="font-display text-5xl leading-none text-fg-muted/40 select-none sm:text-6xl"
							aria-hidden="true"
						>
							{String(i + 1).padStart(2, '0')}
						</span>
						<div class="space-y-2">
							<p class="font-mono text-xs tracking-[0.2em] text-accent uppercase">{project.code}</p>
							<p class="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-fg-muted uppercase">
								<span
									class="h-1.5 w-1.5 rounded-full {project.status === 'live' ? 'bg-accent-2' : 'bg-accent'}"
									aria-hidden="true"
								></span>
								{statusLabel[project.status]}
							</p>
							{#if project.gated}
								<p class="font-mono text-[10px] tracking-[0.15em] text-fg-muted/70 uppercase">
									{ui.ssoGated}
								</p>
							{/if}
						</div>
					</div>

					<!-- Body -->
					<div>
						<header class="flex flex-wrap items-baseline gap-x-6 gap-y-2">
							<h3 class="font-display text-2xl text-fg uppercase sm:text-3xl">{project.title}</h3>
							<span class="kicker">{ui.classification[project.id] ?? project.classification}</span>
						</header>

						<p class="mt-5 max-w-3xl font-body text-base leading-relaxed text-fg-muted">
							{ui.projectNotes[project.id]}
						</p>

						<!-- Proof: real screenshots, framed like a live console -->
						{#if project.shots?.length}
							<figure class="mt-8">
								<figcaption class="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-fg-muted uppercase">
									<span class="live-dot h-1.5 w-1.5 rounded-full bg-accent-2" aria-hidden="true"></span>
									{host(project.liveUrl ?? '')} · {ui.liveConsole}
								</figcaption>
								<div class="grid gap-3 sm:grid-cols-3">
									{#each project.shots as shot, si (shot)}
										<a
											href={project.liveUrl}
											target="_blank"
											rel="noopener noreferrer"
											data-cursor="Open"
											class="group block overflow-hidden border border-border bg-bg-elevated/40 transition-colors hover:border-accent/50"
										>
											<img
												src={shot}
												alt="{project.title} — console view {si + 1}"
												loading="lazy"
												class="aspect-[16/10] w-full object-cover object-top opacity-85 transition duration-300 group-hover:opacity-100"
											/>
										</a>
									{/each}
								</div>
							</figure>
						{/if}

						<p class="mt-8 font-mono text-[11px] leading-relaxed tracking-[0.15em] text-fg-muted uppercase">
							<span class="text-fg">{$t.projects.stack}</span>
							<span aria-hidden="true">&nbsp;—&nbsp;</span>{project.techStack.join(' · ')}
						</p>

						<!-- Live links -->
						<div class="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
							{#if project.demoUrl}
								<a
									href={project.demoUrl}
									target="_blank"
									rel="noopener noreferrer"
									data-cursor="Open"
									class="draw-link font-mono text-[11px] tracking-[0.2em] text-accent uppercase transition-colors hover:text-fg"
								>
									{ui.openDemo}<span aria-hidden="true">&nbsp;→</span>
								</a>
							{/if}
							{#if project.liveUrl}
								<span class="flex flex-wrap items-center gap-x-3 gap-y-1">
									<a
										href={project.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										data-cursor="Open"
										class="draw-link font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase transition-colors hover:text-fg"
									>
										{host(project.liveUrl)}<span aria-hidden="true">&nbsp;→</span>
									</a>
									{#if project.gated}
										<span class="font-mono text-[10px] tracking-[0.15em] text-fg-muted/60 uppercase">
											· {ui.loginRequired}
										</span>
									{/if}
								</span>
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- ================= ARCHITECTURE NOTES ================= -->
<section class="border-t border-border bg-bg px-6 py-24 sm:px-10 sm:py-32">
	<div class="mx-auto max-w-5xl">
		<p class="kicker"><span class="text-accent">↳</span> / {ui.notesKicker}</p>
		<h2 class="mt-5 font-display text-3xl leading-[0.95] text-fg uppercase sm:text-4xl">
			{ui.notesHeading}
		</h2>
		<p class="mt-4 max-w-xl font-body text-sm leading-relaxed text-fg-muted">
			{ui.notesIntro}
		</p>
		<div class="hairline mt-8" use:lineDraw></div>

		<ul bind:this={notesRef} class="mt-4">
			{#each architectureNotes as note (note.tag)}
				<li
					data-note
					class="grid grid-cols-[auto_1fr] items-baseline gap-x-4 border-b border-border/60 py-6 sm:grid-cols-[minmax(0,160px)_1fr] sm:gap-x-8"
				>
					<span class="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
						<span aria-hidden="true">(+)&nbsp;</span>{ui.notes[note.tag]?.tag ?? note.tag}
					</span>
					<div>
						<h3 class="font-display text-base text-fg uppercase">{ui.notes[note.tag]?.title ?? note.title}</h3>
						<p class="mt-2 max-w-2xl font-body text-sm leading-relaxed text-fg-muted">{ui.notes[note.tag]?.body ?? note.body}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ================= CTA ================= -->
<section bind:this={ctaRef} class="grain relative border-t border-border bg-bg px-6 py-28 text-center sm:px-10 sm:py-36">
	<div class="mx-auto max-w-2xl">
		<p class="kicker justify-center"><span class="text-accent">↳</span> / {ui.ctaKicker}</p>
		<h2 class="mt-5 font-display text-3xl leading-[1.05] text-fg uppercase sm:text-4xl">
			{ui.ctaHeading}
		</h2>
		<p class="mx-auto mt-5 max-w-md font-body text-base leading-relaxed text-fg-muted">
			{ui.ctaBody}
		</p>
		<a
			href="{homeHref}#contact"
			data-cursor="Talk"
			class="draw-link mt-9 inline-block font-mono text-[11px] tracking-[0.2em] text-accent uppercase transition-colors hover:text-fg"
		>
			{ui.ctaButton}<span aria-hidden="true">&nbsp;→</span>
		</a>
	</div>
</section>

<style>
	.flow-stage {
		--flow-progress: 0%;
	}
	.flow-progress {
		position: absolute;
		top: 0;
		left: 0;
		height: 1px;
		width: 100%;
		background: var(--color-border);
	}
	.flow-progress span {
		display: block;
		height: 100%;
		width: var(--flow-progress);
		background: linear-gradient(90deg, var(--color-accent), var(--color-accent-2));
		transition: width 120ms linear;
	}
	.flow-node {
		opacity: 0.4;
		transform: translateY(6px);
		transition:
			opacity 250ms ease,
			transform 250ms ease;
	}
	.flow-node:global(.is-active) {
		opacity: 1;
		transform: translateY(0);
	}
	.flow-node :global(.flow-icon) {
		transition:
			color 250ms ease,
			border-color 250ms ease;
	}
	.flow-node:global(.is-active) :global(.flow-icon) {
		color: var(--color-accent);
		border-color: var(--color-accent);
	}
	.flow-node:global(.is-current) :global(.flow-icon) {
		box-shadow: 0 0 0 4px var(--color-accent-soft);
	}
	.live-dot {
		animation: live-blink 2.4s steps(1) infinite;
	}
	@keyframes live-blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.25;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.flow-node,
		.live-dot {
			transition: none;
			animation: none;
		}
	}
</style>
