<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		/** Zero-padded section index, e.g. "02" */
		index: string;
		title: string;
		/** Terminal-style readout line under the title */
		readout?: string;
		class?: string;
	}

	let { index, title, readout, class: className = '' }: Props = $props();
</script>

<!-- Left-aligned console rule: `01 ▪ TITLE ░░░░░░` — no centered SaaS headers here -->
<header class={cn('mb-10 sm:mb-12', className)}>
	<div class="flex items-center gap-3 sm:gap-4">
		<span class="font-pixel text-[0.6rem] leading-none text-amber">{index}</span>
		<span class="h-[10px] w-[10px] flex-none bg-amber" aria-hidden="true"></span>
		<h2 class="font-pixel text-sm leading-snug text-ink uppercase sm:text-lg">
			{title}
		</h2>
		<span class="dither h-[8px] min-w-6 flex-1" aria-hidden="true"></span>
	</div>
	{#if readout}
		<p class="font-terminal mt-2 pl-0 text-lg text-moss sm:text-xl">
			&gt;&gt; {readout}
		</p>
	{/if}
</header>
