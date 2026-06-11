<script lang="ts">
	import { cn } from '$lib/utils';
	import { services, sectionMeta } from '$lib/data/portfolio';
	import Container from '$lib/components/ui/Container.svelte';
	import { onMount } from 'svelte';
	import { scrollFadeIn, scrollStagger } from '$lib/utils/animations';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const servicesMeta = sectionMeta.find((s) => s.id === 'services');

	function scrollToContact(serviceTitle: string) {
		const contactSection = document.querySelector('#contact');
		if (contactSection) {
			contactSection.scrollIntoView({ behavior: 'smooth' });
			// Pre-fill message with service context
			setTimeout(() => {
				const messageField = document.querySelector('#message') as HTMLTextAreaElement;
				if (messageField) {
					messageField.value = `Hi, I'm interested in your ${serviceTitle} service. I'd like to discuss...`;
					messageField.dispatchEvent(new Event('input', { bubbles: true }));
				}
			}, 600);
		}
	}

	let headerRef: HTMLDivElement;
	let gridRef: HTMLDivElement;

	onMount(() => {
		scrollFadeIn(headerRef);
		scrollStagger(gridRef, ':scope > *', { stagger: 0.12, y: 25 });
	});
</script>

<section
	id="services"
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
					{servicesMeta?.systemName || 'Microservices'}
				</span>
			</Container>
			<h2 class="font-pixel text-xl md:text-2xl text-[var(--color-text-primary)] mb-2">
				{servicesMeta?.title || 'Services'}
			</h2>
			<p class="font-terminal text-[var(--color-text-secondary)]">
				{servicesMeta?.subtitle || 'Available Endpoints'}
			</p>
		</div>

		<!-- Services Grid -->
		<div bind:this={gridRef} class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each services as service (service.id)}
				<Container variant="dark" class="h-full">
					<div class="flex flex-col h-full p-2">
						<!-- Icon -->
						<span class="text-3xl mb-3">{service.icon}</span>

						<!-- Title -->
						<h3 class="font-pixel text-[0.65rem] text-[var(--color-accent-primary)] mb-3 uppercase">
							{service.title}
						</h3>

						<!-- Description -->
						<p class="font-terminal text-sm text-[var(--color-text-secondary)] mb-4 flex-1">
							{service.description}
						</p>

						<!-- Tech Stack Tags -->
						<div class="flex flex-wrap gap-2 mb-4">
							{#each service.techStack as tech}
								<span class="font-pixel text-[0.45rem] px-2 py-1 bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] uppercase">
									{tech}
								</span>
							{/each}
						</div>

						<!-- CTA -->
						<div class="flex gap-2">
							<a
								href="/services/{service.id}"
								class="nes-btn font-pixel text-[0.5rem] flex-1 py-2 text-center transition-transform active:translate-y-1"
							>
								Learn More
							</a>
							<button
								class="nes-btn is-primary font-pixel text-[0.5rem] flex-1 py-2 transition-transform active:translate-y-1"
								onclick={() => scrollToContact(service.title)}
							>
								Contact
							</button>
						</div>
					</div>
				</Container>
			{/each}
		</div>
	</div>
</section>
