<script lang="ts">
	import { cn } from '$lib/utils';
	import { personalInfo, sectionMeta, services } from '$lib/data/portfolio';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import PixelPanel from '$lib/components/ui/PixelPanel.svelte';
	import PixelButton from '$lib/components/ui/PixelButton.svelte';
	import PixelIcon from '$lib/components/ui/PixelIcon.svelte';
	import { onMount } from 'svelte';
	import { scrollFadeIn, scrollStagger } from '$lib/utils/animations';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const meta = sectionMeta.find((s) => s.id === 'contact')!;

	const FORMSPREE_ID = 'mykdwlrj';

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

	const channels = [
		{ tag: 'IN', label: 'LinkedIn', value: 'alvin-reba', href: personalInfo.linkedin },
		{ tag: '@', label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` }
	];

	let headerEl: HTMLElement;
	let contentEl: HTMLElement;

	onMount(() => {
		scrollFadeIn(headerEl);
		scrollStagger(contentEl, ':scope > *', { stagger: 0.15, y: 30 });
	});
</script>

<section id="contact" class={cn('console-grid bg-night px-4 py-24 sm:px-6', className)}>
	<div class="mx-auto max-w-5xl">
		<div bind:this={headerEl}>
			<SectionHeader index={meta.index} title={meta.title} readout={meta.readout} />
		</div>

		<div bind:this={contentEl} class="grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
			<!-- Comm channels -->
			<PixelPanel title="comm.link" variant="panel" class="p-5 pt-7 sm:p-6 sm:pt-7">
				<p class="mb-6 text-sm leading-relaxed text-fog">
					Have a system that needs building — or one that needs rescuing? Pick a channel. I read
					everything myself.
				</p>

				<ul class="space-y-4">
					{#each channels as channel (channel.tag)}
						<li>
							<a
								href={channel.href}
								target={channel.href?.startsWith('mailto') ? undefined : '_blank'}
								rel={channel.href?.startsWith('mailto') ? undefined : 'noopener noreferrer'}
								class="group flex items-center gap-4"
							>
								<span
									class="px-shadow-sm font-pixel flex h-10 w-10 flex-none items-center justify-center border-[3px] border-ink bg-slot text-[0.55rem] text-ink uppercase transition-colors group-hover:bg-amber group-hover:text-night"
								>
									{channel.tag}
								</span>
								<span class="min-w-0">
									<span class="font-pixel block text-[0.45rem] text-moss uppercase">
										{channel.label}
									</span>
									<span class="font-terminal block truncate text-lg text-fog transition-colors group-hover:text-amber">
										{channel.value}
									</span>
								</span>
							</a>
						</li>
					{/each}
				</ul>

				<div class="mt-6 space-y-2 border-t-2 border-seam pt-5">
					<p class="flex items-center gap-2 text-sm text-moss">
						<span class="text-amber"><PixelIcon name="pin" size={14} /></span>
						{personalInfo.location} · UTC+7
					</p>
					<p class="flex items-center gap-2 text-sm text-moss">
						<span class="led led-blink bg-phosphor"></span>
						Avg response: under 24h on working days
					</p>
				</div>
			</PixelPanel>

			<!-- Transmission form -->
			<PixelPanel title="transmit.msg" accent="amber" variant="night" class="p-5 pt-7 sm:p-6 sm:pt-7">
				<form onsubmit={handleSubmit} class="space-y-4">
					<div>
						<label for="name" class="font-terminal mb-1 block text-lg text-phosphor">
							&gt; your name:
						</label>
						<input
							type="text"
							id="name"
							name="name"
							class="term-input"
							placeholder="Ada Lovelace"
							autocomplete="name"
							bind:value={formData.name}
							required
						/>
					</div>

					<div>
						<label for="email" class="font-terminal mb-1 block text-lg text-phosphor">
							&gt; reply address:
						</label>
						<input
							type="email"
							id="email"
							name="email"
							class="term-input"
							placeholder="you@company.com"
							autocomplete="email"
							bind:value={formData.email}
							required
						/>
					</div>

					<div>
						<label for="service" class="font-terminal mb-1 block text-lg text-phosphor">
							&gt; mission type:
						</label>
						<select id="service" name="service" class="term-input" bind:value={formData.service}>
							<option value="">General inquiry</option>
							{#each services as service (service.id)}
								<option value={service.title}>{service.title}</option>
							{/each}
						</select>
					</div>

					<div>
						<label for="message" class="font-terminal mb-1 block text-lg text-phosphor">
							&gt; payload:
						</label>
						<textarea
							id="message"
							name="message"
							class="term-input resize-y"
							rows="4"
							placeholder="What are you building? Rough scope, timeline, anything weird about it..."
							bind:value={formData.message}
							required
						></textarea>
					</div>

					<PixelButton variant="primary" size="md" type="submit" disabled={isSubmitting} class="w-full">
						{#if isSubmitting}
							Transmitting ▓▓▓░░
						{:else}
							Transmit <span aria-hidden="true">▸</span>
						{/if}
					</PixelButton>

					<div aria-live="polite">
						{#if submitStatus === 'success'}
							<p class="font-terminal border-2 border-phosphor px-3 py-2 text-base text-phosphor">
								✓ ACK received. I'll reply within a day — usually faster.
							</p>
						{:else if submitStatus === 'error'}
							<p class="font-terminal border-2 border-alert px-3 py-2 text-base text-alert">
								✕ Packet lost. Email me directly: {personalInfo.email}
							</p>
						{/if}
					</div>
				</form>
			</PixelPanel>
		</div>
	</div>
</section>

<style>
	.term-input {
		width: 100%;
		border: 3px solid var(--seam);
		background: var(--void);
		padding: 0.5rem 0.75rem;
		font-family: var(--font-terminal);
		font-size: 1.125rem;
		line-height: 1.35;
		color: var(--ink);
	}
	.term-input::placeholder {
		color: var(--moss);
		opacity: 0.7;
	}
	.term-input:focus {
		outline: none;
		border-color: var(--amber);
	}
	select.term-input {
		appearance: none;
		background-image: linear-gradient(45deg, transparent 50%, var(--moss) 50%),
			linear-gradient(135deg, var(--moss) 50%, transparent 50%);
		background-position:
			calc(100% - 18px) calc(50% - 2px),
			calc(100% - 12px) calc(50% - 2px);
		background-size:
			6px 6px,
			6px 6px;
		background-repeat: no-repeat;
	}
</style>
