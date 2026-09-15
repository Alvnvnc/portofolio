<script lang="ts">
	import type { StickerName } from '$lib/types';

	let {
		name,
		size = 112,
		class: className = ''
	}: { name: StickerName; size?: number; class?: string } = $props();

	const uid = Math.random().toString(36).slice(2, 7);
	const dotsId = `dots-${uid}`;
</script>

<svg
	viewBox="0 0 96 96"
	width={size}
	height={size}
	class={className}
	fill="none"
	stroke-linejoin="round"
	stroke-linecap="round"
	aria-hidden="true"
>
	<defs>
		<pattern id={dotsId} width="9" height="9" patternUnits="userSpaceOnUse">
			<rect width="9" height="9" fill="var(--yellow)" />
			<circle cx="4.5" cy="4.5" r="2.4" fill="var(--ink)" />
		</pattern>
	</defs>

	{#if name === 'server'}
		<rect x="20" y="12" width="56" height="72" rx="11" fill="var(--surface)" stroke="var(--ink)" stroke-width="3" />
		<rect x="30" y="23" width="36" height="13" rx="6.5" fill="var(--yellow)" stroke="var(--ink)" stroke-width="3" />
		<rect x="30" y="42" width="36" height="13" rx="6.5" fill="var(--mint)" stroke="var(--ink)" stroke-width="3" />
		<rect x="30" y="61" width="36" height="13" rx="6.5" fill="var(--pink)" stroke="var(--ink)" stroke-width="3" />
	{:else if name === 'database'}
		<path d="M22 26 v42 a26 11 0 0 0 52 0 V26" fill="var(--surface)" stroke="var(--ink)" stroke-width="3" />
		<path d="M22 44 a26 11 0 0 0 52 0" stroke="var(--ink)" stroke-width="3" />
		<path d="M22 62 a26 11 0 0 0 52 0" stroke="var(--ink)" stroke-width="3" />
		<ellipse cx="48" cy="26" rx="26" ry="11" fill="var(--yellow)" stroke="var(--ink)" stroke-width="3" />
	{:else if name === 'queue'}
		<rect x="12" y="28" width="50" height="40" rx="12" fill="var(--surface)" stroke="var(--ink)" stroke-width="3" />
		<circle cx="26" cy="48" r="5.5" fill="var(--orange)" stroke="var(--ink)" stroke-width="3" />
		<circle cx="41" cy="48" r="5.5" fill="var(--orange)" stroke="var(--ink)" stroke-width="3" />
		<circle cx="56" cy="48" r="5.5" fill="var(--orange)" stroke="var(--ink)" stroke-width="3" />
		<path d="M68 48 h13 M74 41 l7 7 -7 7" stroke="var(--ink)" stroke-width="3" />
	{:else if name === 'terminal'}
		<rect x="12" y="18" width="72" height="60" rx="12" fill="var(--ink)" stroke="var(--ink)" stroke-width="3" />
		<circle cx="26" cy="31" r="3.2" fill="var(--yellow)" />
		<circle cx="37" cy="31" r="3.2" fill="var(--orange)" />
		<circle cx="48" cy="31" r="3.2" fill="var(--pink)" />
		<path d="M26 50 l8 8 -8 8" stroke="var(--surface)" stroke-width="3.4" />
		<path d="M42 66 h20" stroke="var(--yellow)" stroke-width="3.4" />
	{:else if name === 'cloud'}
		<path
			d="M31 60 a14 14 0 0 1 -1 -28 a18 18 0 0 1 34 -4 a13.5 13.5 0 0 1 2 32 z"
			fill="var(--surface)"
			stroke="var(--ink)"
			stroke-width="3"
		/>
		<path d="M48 84 V64 M40 72 l8 -9 8 9" stroke="var(--ink)" stroke-width="3" />
	{:else if name === 'shield'}
		<path
			d="M48 12 l27 10 v23 c0 18 -12 28 -27 35 c-15 -7 -27 -17 -27 -35 V22 z"
			fill="var(--blue)"
			stroke="var(--ink)"
			stroke-width="3"
		/>
		<path d="M35 48 l9 9 17 -19" stroke="var(--surface)" stroke-width="4.4" />
	{:else if name === 'sensor'}
		<rect x="29" y="46" width="38" height="36" rx="10" fill="var(--surface)" stroke="var(--ink)" stroke-width="3" />
		<circle cx="48" cy="64" r="5.5" fill="var(--mint)" stroke="var(--ink)" stroke-width="3" />
		<path d="M48 46 V30" stroke="var(--ink)" stroke-width="3" />
		<path d="M36 24 a17 17 0 0 1 24 0" stroke="var(--ink)" stroke-width="3" />
		<path d="M29 12 a30 30 0 0 1 38 0" stroke="var(--orange)" stroke-width="3" />
	{:else if name === 'bolt'}
		<path d="M55 8 L24 52 h15 l-7 36 31 -46 h-15 z" fill="var(--yellow)" stroke="var(--ink)" stroke-width="3" />
	{:else if name === 'chip'}
		<rect x="24" y="24" width="48" height="48" rx="10" fill="var(--surface)" stroke="var(--ink)" stroke-width="3" />
		<rect x="38" y="38" width="20" height="20" rx="5" fill="var(--orange)" stroke="var(--ink)" stroke-width="3" />
		<path
			d="M38 24 V14 M48 24 V14 M58 24 V14 M38 82 V72 M48 82 V72 M58 82 V72 M24 38 H14 M24 48 H14 M24 58 H14 M82 38 H72 M82 48 H72 M82 58 H72"
			stroke="var(--ink)"
			stroke-width="3"
		/>
	{:else if name === 'star'}
		<path
			d="M48 8 L60 36 L90 39 L67 59 L74 88 L48 72 L22 88 L29 59 L6 39 L36 36 Z"
			fill="url(#{dotsId})"
			stroke="var(--ink)"
			stroke-width="3"
		/>
	{:else if name === 'squiggle'}
		<path
			d="M10 62 q12 -34 24 -12 t24 -12 t24 -12"
			fill="none"
			stroke="var(--ink)"
			stroke-width="11"
			stroke-linecap="round"
		/>
		<path
			d="M10 62 q12 -34 24 -12 t24 -12 t24 -12"
			fill="none"
			stroke="var(--pink)"
			stroke-width="5"
			stroke-linecap="round"
		/>
	{:else if name === 'dots'}
		<circle cx="48" cy="48" r="38" fill="url(#{dotsId})" stroke="var(--ink)" stroke-width="3" />
		<circle cx="48" cy="48" r="17" fill="var(--orange)" stroke="var(--ink)" stroke-width="3" />
	{/if}
</svg>
