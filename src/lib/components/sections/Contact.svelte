<script lang="ts">
	import { cn } from '$lib/utils';
	import { personalInfo, sectionMeta, services } from '$lib/data/portfolio';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollFadeIn, scrollStagger } from '$lib/utils/animations';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const contactMeta = sectionMeta.find((s) => s.id === 'contact');

	const FORMSPREE_ID = 'mykdwlrj';

	// Form state
	let formData = $state({
		name: '',
		email: '',
		service: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;
		submitStatus = 'idle';

		try {
			const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					service: formData.service || 'General Inquiry',
					message: formData.message
				})
			});

			if (response.ok) {
				submitStatus = 'success';
				formData = { name: '', email: '', service: '', message: '' };
			} else {
				submitStatus = 'error';
			}
		} catch {
			submitStatus = 'error';
		} finally {
			isSubmitting = false;
		}
	}

	// Animation refs
	let headerRef: HTMLDivElement;
	let contentRef: HTMLDivElement;

	$effect(() => {
		if (headerRef) scrollFadeIn(headerRef);
		if (contentRef) scrollStagger(contentRef, ':scope > *', { stagger: 0.2, y: 30 });
	});
</script>

<section
	id="contact"
	class={cn(
		'py-20 px-4',
		'bg-[var(--color-bg-secondary)]',
		className
	)}
>
	<div class="max-w-4xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-12" bind:this={headerRef}>
			<Container variant="dark" class="inline-block mb-4">
				<span class="font-pixel text-[0.5rem] text-[var(--color-accent-primary)] px-3 py-1 uppercase">
					{contactMeta?.systemName || 'Interface'}
				</span>
			</Container>
			<h2 class="font-pixel text-xl md:text-2xl text-[var(--color-text-primary)] mb-2">
				{contactMeta?.title || 'Contact'}
			</h2>
			<p class="font-terminal text-[var(--color-text-secondary)]">
				{contactMeta?.subtitle || 'Open Connection'}
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8" bind:this={contentRef}>
			<!-- Contact Info -->
			<Container variant="dark" title="connection.config">
				<div class="space-y-6">
					<p class="font-terminal text-base text-[var(--color-text-secondary)]">
						Need a backend solution or want to discuss a project? Send me a message and I'll get back to you.
					</p>

					<!-- Email -->
					<div class="flex items-center gap-4">
						<span class="nes-icon gmail is-medium"></span>
						<div>
							<p class="font-pixel text-[0.5rem] text-[var(--color-text-muted)] uppercase">Email</p>
							<a
								href="mailto:{personalInfo.email}"
								class="font-terminal text-[var(--color-accent-primary)] hover:text-[var(--color-pixel-green)] transition-colors"
							>
								{personalInfo.email}
							</a>
						</div>
					</div>

					<!-- GitHub -->
					{#if personalInfo.github}
						<div class="flex items-center gap-4">
							<span class="nes-icon github is-medium"></span>
							<div>
								<p class="font-pixel text-[0.5rem] text-[var(--color-text-muted)] uppercase">GitHub</p>
								<a
									href={personalInfo.github}
									target="_blank"
									rel="noopener noreferrer"
									class="font-terminal text-[var(--color-accent-primary)] hover:text-[var(--color-pixel-green)] transition-colors"
								>
									View Profile
								</a>
							</div>
						</div>
					{/if}

					<!-- LinkedIn -->
					{#if personalInfo.linkedin}
						<div class="flex items-center gap-4">
							<span class="nes-icon linkedin is-medium"></span>
							<div>
								<p class="font-pixel text-[0.5rem] text-[var(--color-text-muted)] uppercase">LinkedIn</p>
								<a
									href={personalInfo.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									class="font-terminal text-[var(--color-accent-primary)] hover:text-[var(--color-pixel-green)] transition-colors"
								>
									Connect
								</a>
							</div>
						</div>
					{/if}

					<!-- Location -->
					<div class="flex items-center gap-4">
						<span class="text-2xl">📍</span>
						<div>
							<p class="font-pixel text-[0.5rem] text-[var(--color-text-muted)] uppercase">Location</p>
							<p class="font-terminal text-[var(--color-text-primary)]">
								{personalInfo.location}
							</p>
						</div>
					</div>
				</div>
			</Container>

			<!-- Contact Form -->
			<Container variant="dark" title="send_message()">
				<form onsubmit={handleSubmit} class="space-y-4">
					<!-- Name -->
					<div class="nes-field">
						<label for="name" class="font-pixel text-[0.5rem] text-[var(--color-text-muted)] uppercase">
							Name
						</label>
						<input
							type="text"
							id="name"
							class="nes-input font-terminal"
							bind:value={formData.name}
							required
						/>
					</div>

					<!-- Email -->
					<div class="nes-field">
						<label for="email" class="font-pixel text-[0.5rem] text-[var(--color-text-muted)] uppercase">
							Email
						</label>
						<input
							type="email"
							id="email"
							class="nes-input font-terminal"
							bind:value={formData.email}
							required
						/>
					</div>

					<!-- Service Selection -->
					<div class="nes-field">
						<label for="service" class="font-pixel text-[0.5rem] text-[var(--color-text-muted)] uppercase">
							Service Needed
						</label>
						<div class="nes-select">
							<select id="service" bind:value={formData.service} class="font-terminal">
								<option value="">General Inquiry</option>
								{#each services as service (service.id)}
									<option value={service.title}>{service.title}</option>
								{/each}
							</select>
						</div>
					</div>

					<!-- Message -->
					<div class="nes-field">
						<label for="message" class="font-pixel text-[0.5rem] text-[var(--color-text-muted)] uppercase">
							Message
						</label>
						<textarea
							id="message"
							class="nes-textarea font-terminal"
							rows="4"
							bind:value={formData.message}
							required
						></textarea>
					</div>

					<!-- Submit Button -->
					<Button
						variant="primary"
						size="md"
						disabled={isSubmitting}
						class="w-full"
					>
						{#if isSubmitting}
							Sending...
						{:else}
							Send Message
						{/if}
					</Button>

					<!-- Status Messages -->
					{#if submitStatus === 'success'}
						<p class="font-terminal text-sm text-[var(--color-pixel-green)] text-center">
							✓ Message sent successfully! I'll get back to you soon.
						</p>
					{:else if submitStatus === 'error'}
						<p class="font-terminal text-sm text-[var(--color-accent-danger)] text-center">
							✕ Failed to send. Please email me directly at {personalInfo.email}
						</p>
					{/if}
				</form>
			</Container>
		</div>
	</div>
</section>
