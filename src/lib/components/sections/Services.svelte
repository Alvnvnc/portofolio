<script lang="ts">
	import { cn } from '$lib/utils';
	import { services, sectionMeta } from '$lib/data/portfolio';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import PixelBadge from '$lib/components/ui/PixelBadge.svelte';
	import PixelButton from '$lib/components/ui/PixelButton.svelte';
	import PixelIcon from '$lib/components/ui/PixelIcon.svelte';
	import { onMount } from 'svelte';
	import { scrollFadeIn, scrollStagger } from '$lib/utils/animations';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const meta = sectionMeta.find((s) => s.id === 'services')!;

	function scrollToContact(serviceTitle: string) {
		const contactSection = document.querySelector('#contact');
		if (!contactSection) return;
		contactSection.scrollIntoView({ behavior: 'smooth' });
		// Pre-fill the message so the visitor lands mid-conversation
		setTimeout(() => {
			const messageField = document.querySelector('#message') as HTMLTextAreaElement | null;
			if (messageField) {
				messageField.value = `Hi Alvin — I'm looking at your ${serviceTitle} service. Here's what I'm building: `;
				messageField.dispatchEvent(new Event('input', { bubbles: true }));
				messageField.focus();
			}
		}, 600);
	}

	let headerEl: HTMLElement;
	let gridEl: HTMLElement;

	onMount(() => {
		scrollFadeIn(headerEl);
		scrollStagger(gridEl, ':scope > *', { stagger: 0.1, y: 25 });
	});
</script>

<section id="services" class={cn('bg-night px-4 py-24 sm:px-6', className)}>
	<div class="mx-auto max-w-6xl">
		<div bind:this={headerEl}>
			<SectionHeader index={meta.index} title={meta.title} readout={meta.readout} />
		</div>

		<div bind:this={gridEl} class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services as service (service.id)}
				<article class="px-shadow px-hover flex flex-col border-[3px] border-ink bg-panel">
					<!-- Cartridge label strip -->
					<div class="flex items-center justify-between border-b-[3px] border-ink bg-slot px-4 py-3">
						<span class="font-pixel text-[0.5rem] text-amber uppercase">{service.code}</span>
						<span class="text-moss"><PixelIcon name={service.icon} size={18} /></span>
					</div>

					<div class="flex flex-1 flex-col p-5">
						<h3 class="font-pixel mb-3 text-[0.6rem] leading-relaxed text-ink uppercase">
							{service.title}
						</h3>
						<p class="mb-5 flex-1 text-sm leading-relaxed text-fog">
							{service.description}
						</p>

						<div class="mb-5 flex flex-wrap gap-2">
							{#each service.techStack as tech (tech)}
								<PixelBadge text={tech} variant="outline" />
							{/each}
						</div>

						<div class="flex flex-wrap gap-3">
							<PixelButton variant="secondary" size="sm" href="/services/{service.id}">
								Spec sheet
							</PixelButton>
							<PixelButton variant="primary" size="sm" onclick={() => scrollToContact(service.title)}>
								Request <span aria-hidden="true">▸</span>
							</PixelButton>
						</div>
					</div>
				</article>
			{/each}

			<!-- The sixth slot stays open on purpose -->
			<article
				class="flex min-h-[260px] flex-col items-center justify-center border-[3px] border-dashed border-seam bg-transparent p-6 text-center"
			>
				<span class="font-pixel mb-4 text-[0.55rem] text-moss uppercase">[ empty slot ]</span>
				<p class="mb-6 max-w-[26ch] text-sm leading-relaxed text-moss">
					Reserved for your project. If it needs an API, a pipeline, or a deploy that doesn't wake
					anyone up at night — it docks here.
				</p>
				<PixelButton variant="ghost" size="sm" onclick={() => scrollToContact('a custom project')}>
					Claim this slot
				</PixelButton>
			</article>
		</div>
	</div>
</section>
