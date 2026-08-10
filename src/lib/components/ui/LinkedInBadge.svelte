<script lang="ts">
	import { personalInfo } from '$lib/data/portfolio';
	import { t } from '$lib/i18n';

	// Derive the vanity handle from the profile URL, editorial-style.
	const handle = $derived(
		personalInfo.linkedin?.replace(/^https?:\/\/(www\.)?linkedin\.com\//, '/') ?? ''
	);
</script>

<!-- Editorial LinkedIn credential — a hairline block, not a card. -->
<a
	href={personalInfo.linkedin}
	target="_blank"
	rel="noopener noreferrer me"
	data-cursor={$t.contact.cursorOpen}
	class="group block border-t border-dashed border-border pt-6"
>
	<span class="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-fg-muted uppercase">
		<span>{$t.contact.linkedin.kicker} ↗</span>
		<span aria-hidden="true" class="text-fg-muted/60">(+)</span>
	</span>

	<div class="mt-4 flex items-start gap-4">
		<!-- Monogram plate, aligned to the site's terracotta accent. -->
		<span
			class="grid h-11 w-11 shrink-0 place-items-center border border-border font-mono text-sm lowercase text-accent transition-colors group-hover:border-accent"
			aria-hidden="true"
		>
			in
		</span>

		<span class="min-w-0">
			<span
				class="draw-link block truncate font-body text-lg text-fg transition-colors group-hover:text-accent"
			>
				{personalInfo.fullName}
			</span>
			<span class="mt-0.5 block font-body text-sm text-fg-muted">
				{personalInfo.title}
			</span>
		</span>
	</div>

	<span class="mt-3 block truncate font-mono text-[11px] tracking-[0.1em] text-fg-muted">
		linkedin.com{handle}
	</span>
</a>
