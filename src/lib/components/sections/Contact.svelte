<script lang="ts">
	import { personalInfo, sectionMeta, services, faqs } from '$lib/data/portfolio';
	import Action from '$lib/components/ui/Action.svelte';
	import Clock from '$lib/components/ui/Clock.svelte';
	import Sticker from '$lib/components/ui/Sticker.svelte';
	import { reveal } from '$lib/utils/motion';

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

<section id="contact" class="section section--pink on-color">
	<div class="sheet">
		<p class="kicker head mono"><span class="num">{meta.index}</span><span class="sq"></span>{meta.label}</p>
		<h2 class="statement display" use:reveal={0} data-reveal="mask">
			<span>Let's build something<br />that stays up</span>
		</h2>
		<p class="statement-sub" use:reveal={80} data-reveal>
			<span class="kicker">Start a project</span> — replies within one working day, usually faster.
		</p>

		<div class="grid mt-12">
			<div class="channels">
				<p class="k mono">email</p>
				<a class="email" href="mailto:{personalInfo.email}">{personalInfo.email}</a>

				{#if personalInfo.linkedin}
					<p class="k mono">linkedin</p>
					<a class="link social" href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
						>linkedin.com/in/alvin-reba</a
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
					<h3 class="kicker faq-title">Common questions</h3>
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
				<span class="form-sticker" aria-hidden="true">
					<Sticker name="bolt" size={78} />
				</span>

				<div class="field">
					<label for="name">Your name</label>
					<input id="name" name="name" type="text" autocomplete="name" bind:value={formData.name} required />
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
	.head {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--ink);
		font-size: 0.75rem;
	}

	.num {
		font-size: 0.6875rem;
		letter-spacing: 0;
		color: var(--ink);
	}

	.sq {
		width: 6px;
		height: 6px;
		background: var(--ink);
	}

	.statement {
		margin-top: 18px;
		font-size: clamp(2.4rem, 9.4vw, 7.6rem);
		color: var(--ink);
	}

	.statement-sub {
		margin-top: 18px;
		font-size: 1rem;
		color: var(--ink-2);
		max-width: 52ch;
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 40px;
	}

	.k {
		margin-top: 24px;
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
		font-weight: 560;
		color: var(--ink);
		text-decoration: none;
		border-bottom: 3px solid var(--yellow);
		padding-bottom: 2px;
		transition:
			color 140ms ease,
			border-color 140ms ease;
	}

	.email:hover {
		color: var(--blue);
		border-color: var(--blue);
	}

	.social {
		display: inline-block;
		margin-top: 6px;
		font-size: 0.9375rem;
	}

	.meta {
		margin-top: 32px;
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
		gap: 10px;
		color: var(--ink) !important;
	}

	.open i {
		width: 9px;
		height: 9px;
		border-radius: 999px;
		background: var(--yellow);
		border: 2px solid var(--ink);
	}

	.faq {
		margin-top: 40px;
	}

	.faq-title {
		border-top: 2px solid var(--ink);
		padding-top: 14px;
		color: var(--ink-2);
	}

	details {
		border-bottom: 1px dashed #d4d4d8;
	}

	summary {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16px;
		padding: 14px 0;
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--ink);
		cursor: pointer;
		list-style: none;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	.mark {
		position: relative;
		width: 12px;
		height: 12px;
		flex: none;
		margin-top: 5px;
	}

	.mark::before,
	.mark::after {
		content: '';
		position: absolute;
		background: var(--blue);
	}

	.mark::before {
		top: 5.25px;
		left: 0;
		width: 12px;
		height: 2px;
	}

	.mark::after {
		left: 5px;
		top: 0;
		width: 2px;
		height: 12px;
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
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 18px;
		background: var(--surface);
		border: 2px solid var(--ink);
		border-radius: 22px;
		box-shadow: var(--shadow-lg);
		padding: clamp(22px, 3vw, 34px);
	}

	.form-sticker {
		position: absolute;
		top: -34px;
		right: 26px;
		transform: rotate(9deg);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	label {
		font-size: 0.8125rem;
		font-weight: 520;
		color: var(--ink-2);
	}

	input,
	select,
	textarea {
		width: 100%;
		background: var(--paper);
		border: 2px solid var(--ink);
		border-radius: 12px;
		padding: 12px 14px;
		font-family: var(--font-sans);
		font-weight: 420;
		font-size: 0.9375rem;
		line-height: 1.5;
		color: var(--ink);
		transition:
			background-color 140ms ease,
			box-shadow 140ms ease;
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
		background: var(--surface);
		box-shadow: 3px 3px 0 var(--ink);
	}

	.status {
		font-size: 0.75rem;
		color: var(--ink-2);
	}

	@media (min-width: 1024px) {
		.grid {
			grid-template-columns: minmax(0, 400px) minmax(0, 1fr);
			gap: 72px;
		}
	}
</style>
