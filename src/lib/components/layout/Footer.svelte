<script lang="ts">
	import { cn } from '$lib/utils';
	import { personalInfo } from '$lib/data/portfolio';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const currentYear = new Date().getFullYear();
</script>

<footer
	class={cn(
		'bg-[var(--color-bg-secondary)] border-t-4 border-[var(--color-bg-tertiary)]',
		'py-8 px-4',
		className
	)}
>
	<div class="max-w-6xl mx-auto">
		<div class="flex flex-col md:flex-row items-center justify-between gap-4">
			<!-- Logo & Copyright -->
			<div class="text-center md:text-left">
				<span class="font-pixel text-sm text-[var(--color-accent-primary)]">
					{'<ALV/>'}
				</span>
				<p class="font-terminal text-sm text-[var(--color-text-secondary)] mt-2">
					&copy; {currentYear} {personalInfo.name}. All rights reserved.
				</p>
			</div>

			<!-- Social Links -->
			<div class="flex items-center gap-4">
				{#if personalInfo.github}
					<a
						href={personalInfo.github}
						target="_blank"
						rel="noopener noreferrer"
						class="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
						aria-label="GitHub"
					>
						<span class="nes-icon github is-small"></span>
					</a>
				{/if}

				{#if personalInfo.linkedin}
					<a
						href={personalInfo.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						class="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
						aria-label="LinkedIn"
					>
						<span class="nes-icon linkedin is-small"></span>
					</a>
				{/if}

				{#if personalInfo.email}
					<a
						href="mailto:{personalInfo.email}"
						class="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
						aria-label="Email"
					>
						<span class="nes-icon gmail is-small"></span>
					</a>
				{/if}
			</div>

			<!-- Tech Stack Badge -->
			<div class="font-pixel text-[0.5rem] text-[var(--color-text-muted)] text-center md:text-right">
				<p>Built with</p>
				<p class="text-[var(--color-accent-secondary)]">
					SvelteKit + Tailwind + NES.css
				</p>
			</div>
		</div>

		<!-- Easter Egg / Fun Message -->
		<div class="mt-6 pt-4 border-t border-[var(--color-bg-tertiary)] text-center">
			<p class="font-terminal text-xs text-[var(--color-text-muted)]">
				<span class="text-[var(--color-pixel-green)]">$</span> echo "Thanks for visiting!" && exit 0
			</p>
		</div>
	</div>
</footer>
