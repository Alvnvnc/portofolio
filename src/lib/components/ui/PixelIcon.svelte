<script lang="ts">
	// Hand-placed 12x12 pixel glyphs. Each entry is [x, y, w, h].
	// Drawn by hand on grid paper energy — no emoji, no icon font.
	export type PixelIconName =
		| 'stack'
		| 'shield'
		| 'pulse'
		| 'bolt'
		| 'chip'
		| 'plug'
		| 'drop'
		| 'mail'
		| 'pin'
		| 'sun'
		| 'moon'
		| 'flag';

	const ICONS: Record<PixelIconName, number[][]> = {
		// three layers of a system, slightly offset like stacked crates
		stack: [
			[3, 1, 8, 2],
			[2, 5, 8, 2],
			[3, 9, 8, 2],
			[1, 5, 1, 1],
			[11, 9, 1, 1]
		],
		shield: [
			[2, 1, 8, 1],
			[1, 2, 10, 3],
			[2, 5, 8, 2],
			[3, 7, 6, 2],
			[4, 9, 4, 1],
			[5, 10, 2, 1]
		],
		// sensor heartbeat crossing a baseline
		pulse: [
			[0, 7, 3, 1],
			[3, 2, 1, 6],
			[4, 2, 2, 1],
			[6, 2, 1, 9],
			[7, 7, 2, 1],
			[9, 4, 1, 4],
			[10, 7, 2, 1]
		],
		bolt: [
			[6, 0, 4, 2],
			[5, 2, 3, 2],
			[4, 4, 3, 1],
			[3, 5, 6, 2],
			[5, 7, 3, 1],
			[4, 8, 3, 2],
			[2, 10, 4, 2]
		],
		chip: [
			[3, 3, 6, 6],
			[4, 1, 1, 2],
			[7, 1, 1, 2],
			[4, 9, 1, 2],
			[7, 9, 1, 2],
			[1, 4, 2, 1],
			[1, 7, 2, 1],
			[9, 4, 2, 1],
			[9, 7, 2, 1]
		],
		plug: [
			[4, 0, 1, 3],
			[7, 0, 1, 3],
			[3, 3, 6, 4],
			[5, 7, 2, 2],
			[5, 9, 1, 3]
		],
		drop: [
			[5, 0, 2, 2],
			[4, 2, 4, 2],
			[3, 4, 6, 3],
			[4, 7, 4, 2],
			[5, 9, 2, 1]
		],
		mail: [
			[1, 2, 10, 1],
			[1, 9, 10, 1],
			[1, 3, 1, 6],
			[10, 3, 1, 6],
			[2, 3, 1, 1],
			[9, 3, 1, 1],
			[3, 4, 1, 1],
			[8, 4, 1, 1],
			[4, 5, 1, 1],
			[7, 5, 1, 1],
			[5, 6, 2, 1]
		],
		pin: [
			[4, 0, 4, 1],
			[3, 1, 6, 4],
			[4, 5, 4, 2],
			[5, 7, 2, 2],
			[5, 9, 2, 2]
		],
		sun: [
			[4, 4, 4, 4],
			[5, 1, 2, 2],
			[5, 9, 2, 2],
			[1, 5, 2, 2],
			[9, 5, 2, 2],
			[2, 2, 2, 1],
			[8, 2, 2, 1],
			[2, 9, 2, 1],
			[8, 9, 2, 1]
		],
		moon: [
			[3, 1, 5, 1],
			[2, 2, 3, 2],
			[1, 4, 3, 4],
			[2, 8, 3, 2],
			[3, 10, 5, 1],
			[8, 2, 1, 1],
			[8, 9, 1, 1]
		],
		flag: [
			[2, 0, 2, 12],
			[4, 1, 6, 1],
			[4, 2, 7, 3],
			[4, 5, 6, 1]
		]
	};

	interface Props {
		name: PixelIconName;
		size?: number;
		class?: string;
	}

	let { name, size = 20, class: className = '' }: Props = $props();
</script>

<svg
	viewBox="0 0 12 12"
	width={size}
	height={size}
	class={className}
	shape-rendering="crispEdges"
	aria-hidden="true"
>
	{#each ICONS[name] as [x, y, w, h], i (i)}
		<rect {x} {y} width={w} height={h} fill="currentColor" />
	{/each}
</svg>
