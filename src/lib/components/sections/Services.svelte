<script lang="ts">
	import { services } from '$lib/data/portfolio';
	import { t } from '$lib/i18n';
	import { lineDraw, staggerRise } from '$lib/actions/motion';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';

	function scrollToContact(serviceTitle: string) {
		const contactSection = document.querySelector('#contact');
		if (!contactSection) return;
		contactSection.scrollIntoView({ behavior: 'smooth' });
		setTimeout(() => {
			const messageField = document.querySelector('#message') as HTMLTextAreaElement | null;
			if (messageField) {
				messageField.value = $t.services.prefill(serviceTitle);
				messageField.dispatchEvent(new Event('input', { bubbles: true }));
				messageField.focus();
			}
		}, 600);
	}
</script>

<section id="services" class="relative bg-bg px-6 py-24 sm:px-10 sm:py-32">
	<SectionHeader index={$t.services.index} title={$t.services.kicker} readout={$t.services.readout} />

	<!-- The catalog reads as an index, not a card wall: one row per service,
	     numbered, inking accent and indenting as you sweep it. -->
	<ol use:staggerRise={{ selector: 'li', y: 32, stagger: 0.08 }}>
		{#each services as service, si (service.id)}
			{@const copy = $t.services.entries[service.id]}
			<li class="group relative">
				{#if si > 0}
					<div class="hairline absolute top-0 left-0" use:lineDraw></div>
				{/if}
				<div
					class="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-4 py-8 sm:grid-cols-[64px_1fr_auto] sm:gap-x-8 sm:py-10"
				>
					<span
						class="font-mono text-xs tracking-[0.2em] text-fg-muted transition-colors duration-300 group-hover:text-accent group-focus-within:text-accent"
						aria-hidden="true"
					>
						{service.code}
					</span>

					<div class="min-w-0">
						<a
							href="/services/{service.id}"
							data-cursor={$t.services.cursorRead}
							class="block focus-visible:outline-offset-8"
						>
							<h3
								class="font-display text-2xl leading-tight text-fg uppercase transition-[transform,color] duration-300 ease-out group-hover:translate-x-3 group-hover:text-accent group-focus-within:translate-x-3 group-focus-within:text-accent sm:text-4xl"
							>
								{copy?.title ?? service.title}
							</h3>
						</a>
						<p class="mt-3 max-w-[58ch] font-body text-sm leading-relaxed text-fg-muted sm:text-base">
							{copy?.description ?? service.description}
						</p>
						<p class="mt-3 font-mono text-[10px] tracking-[0.15em] text-fg-muted/70 uppercase">
							{service.techStack.join(' · ')}
						</p>
					</div>

					<div
						class="col-span-2 flex items-center gap-6 sm:col-span-1 sm:flex-col sm:items-end sm:gap-3"
					>
						<a
							href="/services/{service.id}"
							data-cursor={$t.services.cursorRead}
							class="draw-link font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase transition-colors hover:text-fg"
						>
							{$t.services.specSheet} ↗
						</a>
						<button
							type="button"
							onclick={() => scrollToContact(copy?.title ?? service.title)}
							data-cursor={$t.services.cursorAsk}
							class="draw-link font-mono text-[11px] tracking-[0.2em] text-accent uppercase transition-colors hover:text-fg"
						>
							{$t.services.request} →
						</button>
					</div>
				</div>
			</li>
		{/each}

		<!-- The open slot stays reserved on purpose. -->
		<li class="relative">
			<div class="border-t border-dashed border-border py-8 sm:py-10">
				<div class="grid grid-cols-[auto_1fr] items-baseline gap-x-5 sm:grid-cols-[64px_1fr_auto] sm:gap-x-8">
					<span class="font-mono text-xs tracking-[0.2em] text-fg-muted/50" aria-hidden="true">
						SVC-06
					</span>
					<div>
						<h3 class="font-display text-2xl leading-tight text-fg-muted/60 uppercase sm:text-4xl">
							[ {$t.services.openSlot.label} ]
						</h3>
						<p class="mt-3 max-w-[52ch] font-body text-sm leading-relaxed text-fg-muted sm:text-base">
							{$t.services.openSlot.body}
						</p>
					</div>
					<div class="col-span-2 mt-4 sm:col-span-1 sm:mt-0 sm:self-center">
						<button
							type="button"
							onclick={() => scrollToContact($t.services.customProject)}
							data-cursor={$t.services.cursorAsk}
							class="draw-link font-mono text-[11px] tracking-[0.2em] text-accent uppercase transition-colors hover:text-fg"
						>
							{$t.services.openSlot.cta} →
						</button>
					</div>
				</div>
			</div>
		</li>
	</ol>
</section>
