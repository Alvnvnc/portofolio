<script lang="ts">
	import { cn } from '$lib/utils';
	import { experiences, education, sectionMeta } from '$lib/data/portfolio';
	import Container from '$lib/components/ui/Container.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { scrollFadeIn, scrollStagger } from '$lib/utils/animations';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const expMeta = sectionMeta.find((s) => s.id === 'experience');

	// Animation refs
	let headerRef: HTMLDivElement;
	let timelineRef: HTMLDivElement;
	let educationRef: HTMLDivElement;

	$effect(() => {
		if (headerRef) scrollFadeIn(headerRef);
		if (timelineRef) {
			scrollStagger(timelineRef, ':scope > *', { stagger: 0.2, y: 30 });
			// Animate timeline dots
			const dots = timelineRef.querySelectorAll('.timeline-dot');
			dots.forEach((dot) => {
				gsap.to(dot, {
					scrollTrigger: {
						trigger: dot,
						start: 'top 85%',
						toggleActions: 'play none none none'
					},
					boxShadow: '0 0 10px var(--color-accent-primary), 0 0 20px var(--color-accent-primary)',
					duration: 0.6,
					delay: 0.3
				});
			});
		}
		if (educationRef) scrollFadeIn(educationRef, { delay: 0.3 });
	});
</script>

<section
	id="experience"
	class={cn(
		'py-20 px-4',
		'bg-[var(--color-bg-primary)]',
		className
	)}
>
	<div class="max-w-6xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-12" bind:this={headerRef}>
			<Container variant="dark" class="inline-block mb-4">
				<span class="font-pixel text-[0.5rem] text-[var(--color-accent-primary)] px-3 py-1 uppercase">
					{expMeta?.systemName || 'System Evolution'}
				</span>
			</Container>
			<h2 class="font-pixel text-xl md:text-2xl text-[var(--color-text-primary)] mb-2">
				{expMeta?.title || 'Experience'}
			</h2>
			<p class="font-terminal text-[var(--color-text-secondary)]">
				{expMeta?.subtitle || 'Version History'}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			<!-- Experience Timeline -->
			<div class="lg:col-span-2 space-y-6" bind:this={timelineRef}>
				<h3 class="font-pixel text-xs text-[var(--color-text-muted)] uppercase mb-4">
					Work Experience
				</h3>

				{#each experiences as exp (exp.id)}
					<Container variant="dark" class="relative">
						<!-- Timeline dot -->
						<div class="timeline-dot absolute -left-3 top-6 w-6 h-6 bg-[var(--color-accent-primary)] border-4 border-[var(--color-bg-primary)] rounded-full hidden lg:block"></div>

						<div class="space-y-4">
							<!-- Header -->
							<div class="flex flex-wrap items-start justify-between gap-2">
								<div>
									<h4 class="font-pixel text-[0.65rem] text-[var(--color-accent-primary)]">
										{exp.position}
									</h4>
									<p class="font-terminal text-base text-[var(--color-text-primary)]">
										{exp.company}
									</p>
								</div>
								<div class="text-right">
									<Badge text="{exp.period.start} - {exp.period.end}" variant="dark" />
									<p class="font-terminal text-xs text-[var(--color-text-muted)] mt-1">
										{exp.location}
									</p>
								</div>
							</div>

							<!-- Description -->
							<p class="font-terminal text-sm text-[var(--color-text-secondary)]">
								{exp.description}
							</p>

							<!-- Achievements -->
							<div>
								<h5 class="font-pixel text-[0.5rem] text-[var(--color-accent-secondary)] mb-2 uppercase">
									Key Achievements
								</h5>
								<ul class="space-y-2">
									{#each exp.achievements as achievement, i (i)}
										<li class="font-terminal text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
											<span class="text-[var(--color-pixel-green)]">✓</span>
											{achievement}
										</li>
									{/each}
								</ul>
							</div>

							<!-- Tech Stack -->
							<div class="flex flex-wrap gap-2 pt-2">
								{#each exp.techStack as tech (tech)}
									<Badge text={tech} variant="primary" />
								{/each}
							</div>
						</div>
					</Container>
				{/each}
			</div>

			<!-- Education -->
			<div bind:this={educationRef}>
				<h3 class="font-pixel text-xs text-[var(--color-text-muted)] uppercase mb-4">
					Education
				</h3>

				{#each education as edu, i (i)}
					<Container variant="dark" class="mb-4">
						<div class="space-y-2">
							<h4 class="font-pixel text-[0.6rem] text-[var(--color-accent-primary)]">
								{edu.degree}
							</h4>
							<p class="font-terminal text-sm text-[var(--color-text-primary)]">
								{edu.field}
							</p>
							<p class="font-terminal text-sm text-[var(--color-text-secondary)]">
								{edu.institution}
							</p>
							<Badge text="{edu.period.start} - {edu.period.end}" variant="dark" />

							{#if edu.achievements}
								<ul class="pt-2 space-y-1">
									{#each edu.achievements as achievement, j (j)}
										<li class="font-terminal text-xs text-[var(--color-text-muted)]">
											• {achievement}
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					</Container>
				{/each}
			</div>
		</div>
	</div>
</section>
