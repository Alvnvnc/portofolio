<script lang="ts">
	import { personalInfo, sectionMeta, services, faqs } from '$lib/data/portfolio';
	import Station from '$lib/components/ui/Station.svelte';
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import Action from '$lib/components/ui/Action.svelte';
	import Clock from '$lib/components/ui/Clock.svelte';

	const meta = sectionMeta.find((s) => s.id === 'contact')!;

	const FORMSPREE_ID = 'mykdwlrj';

	let formData = $state({ name: '', email: '', service: '', message: '' });
	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');

	async function handleSubmit(event: Event) {
		event.preventDefault();
		isSubmitting = true;
		submitStatus = 'idle';

		try {
			const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					service: formData.service || 'General inquiry',
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
</script>

<section id="contact" class="section contact">
	<Station id="contact" index={meta.index} label={meta.label} />
	<div class="sheet">
		<SectionHead title={meta.title} note={meta.note} />

		<div class="grid mt-12">
			<div class="channels">
				<p class="k mono">email</p>
				<a class="email" href="mailto:{personalInfo.email}">{personalInfo.email}</a>

				{#if personalInfo.linkedin}
					<p class="k mono">linkedin</p>
					<a
						class="link social"
						href={personalInfo.linkedin}
						target="_blank"
						rel="noopener noreferrer">linkedin.com/in/alvin-reba</a
					>
				{/if}

				<dl class="meta">
					<div>
						<dt class="mono">based in</dt>
						<dd>{personalInfo.location} · <Clock /></dd>
					</div>
					<div>
						<dt class="mono">reply time</dt>
						<dd>Under 24 hours on working days</dd>
					</div>
					<div>
						<dt class="mono">status</dt>
						<dd class="open"><i></i>Taking new projects</dd>
					</div>
				</dl>

				<div class="faq">
					<h3 class="mono faq-title">Common questions</h3>
					{#each faqs as faq (faq.question)}
						<details>
							<summary>
								<span>{faq.question}</span>
								<span class="mark" aria-hidden="true"></span>
							</summary>
							<p>{faq.answer}</p>
						</details>
					{/each}
				</div>
			</div>

			<form onsubmit={handleSubmit}>
				<div class="field">
					<label for="name">Your name</label>
					<input
						id="name"
						name="name"
						type="text"
						autocomplete="name"
						bind:value={formData.name}
						required
					/>
				</div>

				<div class="field">
					<label for="email">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						bind:value={formData.email}
						required
					/>
				</div>

				<div class="field">
					<label for="service">What do you need?</label>
					<select id="service" name="service" bind:value={formData.service}>
						<option value="">General inquiry</option>
						{#each services as service (service.id)}
							<option value={service.title}>{service.title}</option>
						{/each}
					</select>
				</div>

				<div class="field">
					<label for="message">What are you building?</label>
					<textarea
						id="message"
						name="message"
						rows="4"
						placeholder="Rough scope, timeline, anything unusual about it."
						bind:value={formData.message}
						required
					></textarea>
				</div>

				<Action type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Sending…' : 'Send message'}
				</Action>

				<div class="status mono" aria-live="polite">
					{#if submitStatus === 'success'}
						<p>Message received. I'll reply within a day — usually faster.</p>
					{:else if submitStatus === 'error'}
						<p>
							Something failed on the way. Email me directly:
							<a class="link" href="mailto:{personalInfo.email}">{personalInfo.email}</a>
						</p>
					{/if}
				</div>
			</form>
		</div>
	</div>
</section>

<style>
	.contact {
		background: var(--paper-2);
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 44px;
	}

	.k {
		margin-top: 26px;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.k:first-child {
		margin-top: 0;
	}

	.email {
		display: inline-block;
		margin-top: 6px;
		font-size: clamp(1.05rem, 2vw, 1.35rem);
		color: var(--ink);
		text-decoration: none;
		border-bottom: 1px solid var(--rule-2);
		padding-bottom: 3px;
		transition:
			color 140ms ease,
			border-color 140ms ease;
	}

	.email:hover {
		color: var(--signal);
		border-color: var(--signal);
	}

	.social {
		display: inline-block;
		margin-top: 6px;
		font-size: 0.9375rem;
	}

	.meta {
		margin-top: 36px;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.meta dt {
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.meta dd {
		margin-top: 4px;
		font-size: 0.9375rem;
		color: var(--ink-2);
	}

	.open {
		display: flex;
		align-items: center;
		gap: 9px;
		color: var(--ink) !important;
	}

	.open i {
		width: 7px;
		height: 7px;
		background: var(--live);
	}

	.faq {
		margin-top: 44px;
	}

	.faq-title {
		border-top: 1px solid var(--rule);
		padding-top: 14px;
		font-size: 0.6875rem;
		font-weight: 400;
		color: var(--ink-3);
	}

	details {
		border-bottom: 1px solid var(--rule);
	}

	summary {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16px;
		padding: 14px 0;
		font-size: 0.9375rem;
		color: var(--ink);
		cursor: pointer;
		list-style: none;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	.mark {
		position: relative;
		width: 11px;
		height: 11px;
		flex: none;
		margin-top: 5px;
	}

	.mark::before,
	.mark::after {
		content: '';
		position: absolute;
		background: var(--signal);
	}

	.mark::before {
		top: 5px;
		left: 0;
		width: 11px;
		height: 1.5px;
	}

	.mark::after {
		left: 5px;
		top: 0;
		width: 1.5px;
		height: 11px;
		transition:
			transform 200ms ease,
			opacity 200ms ease;
	}

	details[open] .mark::after {
		transform: scaleY(0);
		opacity: 0;
	}

	details p {
		padding-bottom: 16px;
		font-size: 0.875rem;
		line-height: 1.62;
		color: var(--ink-2);
		max-width: 46ch;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	label {
		font-size: 0.8125rem;
		color: var(--ink-2);
	}

	input,
	select,
	textarea {
		width: 100%;
		background: var(--paper);
		border: 1px solid var(--rule-2);
		padding: 12px 14px;
		font-family: var(--font-sans);
		font-size: 0.9375rem;
		line-height: 1.5;
		color: var(--ink);
		transition: border-color 140ms ease;
	}

	textarea {
		resize: vertical;
	}

	input::placeholder,
	textarea::placeholder {
		color: var(--ink-3);
	}

	input:focus,
	select:focus,
	textarea:focus {
		border-color: var(--ink);
	}

	.status {
		font-size: 0.75rem;
		color: var(--ink-2);
	}

	@media (min-width: 1024px) {
		.grid {
			grid-template-columns: minmax(0, 400px) minmax(0, 1fr);
			gap: 80px;
		}
	}
</style>
