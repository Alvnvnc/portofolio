<script lang="ts">
	import { personalInfo } from '$lib/data/portfolio';
	import { t, locale } from '$lib/i18n';
	import { splitReveal, lineDraw } from '$lib/actions/motion';
	import HoldToBlast from '$lib/components/ui/HoldToBlast.svelte';

	const currentYear = new Date().getFullYear();

	const socials = [
		{ label: 'LinkedIn', href: personalInfo.linkedin },
		{ label: 'Email', href: `mailto:${personalInfo.email}` }
	];

	let toast = $state<string | null>(null);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(personalInfo.email);
			toast = $t.footer.copied;
		} catch {
			toast = $t.footer.copyFailed;
		}
		window.setTimeout(() => (toast = null), 4000);
	}
</script>

<footer class="grain relative border-t border-border bg-bg px-6 py-24 sm:px-10 sm:py-32">
	<div class="flex flex-col gap-14 lg:flex-row lg:items-center lg:justify-between">
		<div>
			<span class="kicker">{$t.footer.availability}</span>
			{#key $locale}
				<h2
					class="mt-6 font-display text-5xl leading-[0.95] text-fg uppercase sm:text-7xl"
					use:splitReveal={{ stagger: 0.09 }}
				>
					{$t.footer.headline}
				</h2>
			{/key}
			<a
				href="mailto:{personalInfo.email}"
				data-cursor={$t.footer.cursorMail}
				class="draw-link mt-6 inline-block font-body text-lg text-fg-muted transition-colors hover:text-fg"
			>
				{personalInfo.email}
			</a>
		</div>

		<div class="flex flex-col items-start gap-4 sm:items-center">
			<HoldToBlast label={$t.footer.hold} completedLabel={$t.footer.held} onComplete={copyEmail} />
			<p aria-live="polite" class="h-4 font-mono text-[10px] tracking-[0.15em] text-accent uppercase">
				{toast ?? ''}
			</p>
		</div>
	</div>

	<div class="mt-20">
		<div class="hairline" use:lineDraw></div>
		<div class="flex flex-col gap-8 pt-8 sm:flex-row sm:items-center sm:justify-between">
			<ul class="flex flex-wrap gap-6">
				{#each socials as social (social.label)}
					<li>
						<a
							href={social.href}
							target={social.href?.startsWith('mailto') ? undefined : '_blank'}
							rel={social.href?.startsWith('mailto') ? undefined : 'noopener noreferrer'}
							class="draw-link font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase transition-colors hover:text-fg"
						>
							{social.label}
						</a>
					</li>
				{/each}
			</ul>
			<p class="font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase">
				© {currentYear} {personalInfo.fullName} — {$t.footer.rights}
			</p>
		</div>
	</div>
</footer>
