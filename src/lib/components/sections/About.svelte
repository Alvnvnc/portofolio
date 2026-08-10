<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { splitReveal, staggerRise, countUp, rise, lineDraw } from '$lib/actions/motion';
</script>

<section
	id="about"
	class="relative grid grid-cols-1 gap-14 bg-bg px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-2 lg:gap-24"
>
	<div>
		<p class="kicker" use:rise>
			<span class="text-accent">{$t.about.index}</span>
			<span aria-hidden="true">/</span>
			{$t.about.kicker}
		</p>
		{#key $locale}
			<p
				class="mt-6 font-display text-3xl leading-[1.15] text-fg sm:text-4xl"
				use:splitReveal={{ stagger: 0.03 }}
			>
				{$t.about.statement}
			</p>
		{/key}
		<div
			class="mt-8 max-w-lg space-y-5 font-body text-base leading-relaxed text-fg-muted sm:text-lg"
			use:staggerRise={{ y: 18 }}
		>
			<p>{$t.about.p1}</p>
			<p>{$t.about.p2}</p>
			<p>{$t.about.p3}</p>
		</div>
	</div>

	<div class="flex flex-col justify-between gap-14">
		<!-- Traits as an annotated field list, not an icon-card grid. -->
		<ul use:staggerRise={{ selector: 'li', y: 20, stagger: 0.1 }}>
			{#each $t.about.traits as trait, i (trait.title)}
				<li
					class="grid grid-cols-[auto_1fr] items-baseline gap-x-4 py-4 {i > 0
						? 'border-t border-border/60'
						: ''}"
				>
					<span class="trait-plus font-mono text-xs text-accent" aria-hidden="true">(+)</span>
					<div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
						<h3 class="font-display text-sm text-fg uppercase">{trait.title}</h3>
						<p class="font-body text-sm leading-relaxed text-fg-muted">{trait.line}</p>
					</div>
				</li>
			{/each}
		</ul>

		<div>
			<div class="hairline" use:lineDraw></div>
			<div class="grid grid-cols-3 gap-6 pt-8">
				{#each $t.about.stats as stat (stat.label)}
					<div>
						<p class="font-display text-4xl text-fg tabular-nums sm:text-5xl" use:countUp={{ to: stat.value }}>
							{String(stat.value).padStart(2, '0')}
						</p>
						<p class="mt-2 font-mono text-[10px] leading-tight tracking-[0.15em] text-fg-muted uppercase">
							{stat.label}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	li:hover .trait-plus {
		display: inline-block;
		transform: rotate(90deg);
	}
	.trait-plus {
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}
	@media (prefers-reduced-motion: reduce) {
		.trait-plus {
			transition: none;
		}
	}
</style>
