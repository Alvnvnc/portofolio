<script lang="ts">
	import { personalInfo, services } from '$lib/data/portfolio';
	import { t } from '$lib/i18n';
	import { staggerRise } from '$lib/actions/motion';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';

	const FORMSPREE_ID = 'mykdwlrj';

	let formData = $state({ name: '', email: '', service: '', message: '' });
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
					service: formData.service || $t.contact.form.generalInquiry,
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

	const channels = $derived([
		{ label: 'LinkedIn', value: 'alvin-reba', href: personalInfo.linkedin },
		{ label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` }
	]);
</script>

<section id="contact" class="relative bg-bg px-6 py-24 sm:px-10 sm:py-32">
	<div class="mx-auto max-w-5xl">
		<SectionHeader index={$t.contact.index} title={$t.contact.kicker} readout={$t.contact.readout} />

		<div class="grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-10">
			<!-- Channels -->
			<div use:staggerRise={{ y: 20 }}>
				<p class="max-w-[44ch] font-body text-base leading-relaxed text-fg-muted">
					{$t.contact.intro}
				</p>

				<ul class="mt-10 space-y-6">
					{#each channels as channel (channel.label)}
						<li>
							<a
								href={channel.href}
								target={channel.href?.startsWith('mailto') ? undefined : '_blank'}
								rel={channel.href?.startsWith('mailto') ? undefined : 'noopener noreferrer'}
								data-cursor={$t.contact.cursorOpen}
								class="group block"
							>
								<span class="block font-mono text-[10px] tracking-[0.2em] text-fg-muted uppercase">
									{channel.label} ↗
								</span>
								<span
									class="draw-link mt-1 inline-block max-w-full truncate font-body text-lg text-fg transition-colors group-hover:text-accent"
								>
									{channel.value}
								</span>
							</a>
						</li>
					{/each}
				</ul>

				<div class="mt-10 space-y-2 border-t border-dashed border-border pt-6">
					<p class="font-mono text-[11px] tracking-[0.1em] text-fg-muted uppercase">
						{$t.hero.location} · UTC+7
					</p>
					<p class="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-fg-muted uppercase">
						<span class="h-1.5 w-1.5 rounded-full bg-accent-2" aria-hidden="true"></span>
						{$t.contact.responseLine}
					</p>
				</div>
			</div>

			<!-- Form: ruled paper, not boxes. -->
			<form onsubmit={handleSubmit} class="space-y-7" use:staggerRise={{ y: 20, stagger: 0.06 }}>
				<div class="grid gap-7 sm:grid-cols-2">
					<label class="block">
						<span class="font-mono text-[10px] tracking-[0.2em] text-fg-muted uppercase">
							{$t.contact.form.name}
						</span>
						<input
							type="text"
							name="name"
							class="editorial-input"
							placeholder={$t.contact.form.namePlaceholder}
							autocomplete="name"
							bind:value={formData.name}
							required
						/>
					</label>
					<label class="block">
						<span class="font-mono text-[10px] tracking-[0.2em] text-fg-muted uppercase">
							{$t.contact.form.email}
						</span>
						<input
							type="email"
							name="email"
							class="editorial-input"
							placeholder={$t.contact.form.emailPlaceholder}
							autocomplete="email"
							bind:value={formData.email}
							required
						/>
					</label>
				</div>

				<label class="block">
					<span class="font-mono text-[10px] tracking-[0.2em] text-fg-muted uppercase">
						{$t.contact.form.service}
					</span>
					<select name="service" class="editorial-input" bind:value={formData.service}>
						<option value="">{$t.contact.form.generalInquiry}</option>
						{#each services as service (service.id)}
							<option value={service.title}>
								{$t.services.entries[service.id]?.title ?? service.title}
							</option>
						{/each}
					</select>
				</label>

				<label class="block">
					<span class="font-mono text-[10px] tracking-[0.2em] text-fg-muted uppercase">
						{$t.contact.form.message}
					</span>
					<textarea
						id="message"
						name="message"
						class="editorial-input resize-y"
						rows="4"
						placeholder={$t.contact.form.messagePlaceholder}
						bind:value={formData.message}
						required
					></textarea>
				</label>

				<button
					type="submit"
					disabled={isSubmitting}
					data-cursor={$t.contact.cursorSend}
					class="group flex w-full items-center justify-between border border-fg bg-fg px-6 py-4 font-mono text-[12px] tracking-[0.2em] text-bg uppercase transition-colors hover:bg-transparent hover:text-fg disabled:opacity-60 disabled:hover:bg-fg disabled:hover:text-bg"
				>
					<span>{isSubmitting ? $t.contact.form.submitting : $t.contact.form.submit}</span>
					<span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-2">→</span>
				</button>

				<div aria-live="polite">
					{#if submitStatus === 'success'}
						<p class="border-l-2 border-accent-2 py-1 pl-4 font-mono text-[11px] leading-relaxed text-accent-2">
							{$t.contact.form.success}
						</p>
					{:else if submitStatus === 'error'}
						<p class="border-l-2 border-accent py-1 pl-4 font-mono text-[11px] leading-relaxed text-accent">
							{$t.contact.form.error}
							<a href="mailto:{personalInfo.email}" class="underline">{personalInfo.email}</a>
						</p>
					{/if}
				</div>
			</form>
		</div>
	</div>
</section>

<style>
	.editorial-input {
		margin-top: 0.6rem;
		width: 100%;
		border: 0;
		border-bottom: 1px solid var(--color-border);
		border-radius: 0;
		background: transparent;
		padding: 0.55rem 0;
		font-family: var(--font-body);
		font-size: 1rem;
		color: var(--color-fg);
		transition: border-color 0.25s ease;
	}
	.editorial-input::placeholder {
		color: var(--color-fg-muted);
		opacity: 0.55;
	}
	.editorial-input:focus {
		outline: none;
		border-bottom-color: var(--color-accent);
	}
	select.editorial-input {
		appearance: none;
		cursor: pointer;
	}
	textarea.editorial-input {
		border: 1px solid var(--color-border);
		padding: 0.75rem 0.85rem;
		margin-top: 0.85rem;
	}
	textarea.editorial-input:focus {
		border-color: var(--color-accent);
	}
</style>
