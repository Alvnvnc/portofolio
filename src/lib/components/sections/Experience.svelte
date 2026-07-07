<script lang="ts">
	import { experiences, education } from '$lib/data/portfolio';
	import { t } from '$lib/i18n';
	import { staggerRise, spineDraw, rise } from '$lib/actions/motion';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
</script>

<section id="experience" class="relative bg-bg px-6 py-24 sm:px-10 sm:py-32">
	<SectionHeader
		index={$t.experience.index}
		title={$t.experience.kicker}
		readout={$t.experience.readout}
	/>

	<div class="grid gap-14 lg:grid-cols-3 lg:gap-16">
		<!-- Work log: the spine draws itself in as you scroll past it. -->
		<div class="lg:col-span-2">
			<div class="relative space-y-10 pl-8">
				<div class="absolute top-0 left-0 h-full w-px bg-border" aria-hidden="true"></div>
				<div class="absolute top-0 left-0 h-full w-px bg-accent" aria-hidden="true" use:spineDraw></div>

				{#each experiences as exp (exp.id)}
					{@const copy = $t.experience.entries[exp.id]}
					<article class="relative" use:staggerRise={{ y: 20, stagger: 0.07 }}>
						<span
							class="absolute top-2 -left-[calc(2rem+3.5px)] h-2 w-2 rounded-full bg-accent"
							aria-hidden="true"
						></span>

						<p class="font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase">
							{exp.period.start} — {exp.period.end === 'Present' ? $t.experience.present : exp.period.end}
						</p>
						<h3 class="mt-3 font-display text-2xl text-fg uppercase">
							{copy?.position ?? exp.position}
						</h3>
						<p class="mt-1 font-body text-lg text-accent">{copy?.company ?? exp.company}</p>
						<p class="mt-1 font-mono text-[11px] tracking-[0.15em] text-fg-muted uppercase">
							{copy?.location ?? exp.location}
						</p>

						<p class="mt-5 max-w-[68ch] font-body text-base leading-relaxed text-fg-muted">
							{copy?.description ?? exp.description}
						</p>

						<ul class="mt-5 space-y-2.5">
							{#each copy?.achievements ?? exp.achievements as achievement (achievement)}
								<li class="flex items-start gap-3 font-body text-sm leading-relaxed text-fg-muted">
									<span class="mt-px font-mono text-xs text-accent-2" aria-hidden="true">(+)</span>
									{achievement}
								</li>
							{/each}
						</ul>

						<p class="mt-5 font-mono text-[10px] tracking-[0.15em] text-fg-muted/70 uppercase">
							{exp.techStack.join(' · ')}
						</p>
					</article>
				{/each}

				<div class="relative" use:rise>
					<span
						class="absolute top-2 -left-[calc(2rem+3.5px)] h-2 w-2 rounded-full border border-border bg-bg"
						aria-hidden="true"
					></span>
					<p class="font-mono text-[11px] tracking-[0.15em] text-fg-muted uppercase">
						{$t.experience.nextEntry}
					</p>
				</div>
			</div>
		</div>

		<!-- Education: colophon block, not a card. -->
		<div use:rise>
			{#each education as edu (edu.institution)}
				<div class="border-t-2 border-fg pt-5">
					<span class="kicker">{$t.experience.education}</span>
					<h3 class="mt-4 font-display text-lg text-fg uppercase">{$t.experience.edu.degree}</h3>
					<p class="mt-1 font-body text-base text-accent">{$t.experience.edu.field}</p>
					<p class="mt-2 font-body text-sm leading-relaxed text-fg-muted">
						{$t.experience.edu.institution}
					</p>
					<p class="mt-2 font-mono text-[11px] tracking-[0.15em] text-fg-muted uppercase">
						{edu.period.start} — {edu.period.end}
					</p>
					<p class="mt-4 border-t border-border pt-4 font-body text-xs leading-relaxed text-fg-muted">
						{$t.experience.edu.note}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
