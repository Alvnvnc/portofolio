<script lang="ts">
	import { cn } from '$lib/utils';
	import { personalInfo } from '$lib/data/portfolio';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const currentYear = new Date().getFullYear();

	const links = [
		{ tag: 'IN', label: 'LinkedIn', href: personalInfo.linkedin },
		{ tag: '@', label: 'Email', href: `mailto:${personalInfo.email}` }
	];
</script>

<footer class={cn('border-t-[3px] border-ink bg-void', className)}>
	<div class="dither h-2 w-full" aria-hidden="true"></div>

	<div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
		<div class="flex flex-col items-center justify-between gap-6 md:flex-row">
			<!-- ID plate + copyright -->
			<div class="flex items-center gap-3">
				<span class="flex items-center gap-2 border-2 border-ink bg-panel px-2 py-[6px]">
					<span class="led bg-phosphor"></span>
					<span class="font-pixel text-[0.5rem] leading-none text-ink">ALV-01</span>
				</span>
				<p class="font-terminal text-base text-moss">
					© {currentYear} {personalInfo.fullName}
				</p>
			</div>

			<!-- Channels -->
			<div class="flex items-center gap-3">
				{#each links as link (link.tag)}
					<a
						href={link.href}
						target={link.href?.startsWith('mailto') ? undefined : '_blank'}
						rel={link.href?.startsWith('mailto') ? undefined : 'noopener noreferrer'}
						class="font-pixel flex h-9 w-9 items-center justify-center border-2 border-seam text-[0.5rem] text-moss uppercase transition-colors hover:border-ink hover:bg-amber hover:text-night"
						aria-label={link.label}
					>
						{link.tag}
					</a>
				{/each}
			</div>

			<!-- Build plate -->
			<p class="font-pixel text-center text-[0.45rem] leading-relaxed text-moss uppercase md:text-right">
				Hand-built with SvelteKit<br />
				<span class="text-phosphor">no template was used or harmed</span>
			</p>
		</div>

		<!-- Last transmission -->
		<div class="mt-7 border-t-2 border-seam pt-4 text-center">
			<p class="font-terminal text-base text-moss">
				<span class="text-phosphor">$</span> uptime
				<span class="text-fog">→ online since {currentYear}, made in Surabaya</span>
				· <span class="text-phosphor">$</span> exit 0
			</p>
		</div>
	</div>
</footer>
