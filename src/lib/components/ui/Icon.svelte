<script lang="ts">
	// Thin-stroke line icons for the editorial concept. Keys match the semantic
	// icon names in portfolio data (services, skill categories, system flow).
	let { name, size = 20, class: className = '' }: { name: string; size?: number; class?: string } =
		$props();

	const paths: Record<string, string> = {
		// layered stack
		stack: 'M12 3 3 8l9 5 9-5-9-5ZM3 12l9 5 9-5M3 16l9 5 9-5',
		// plug / connector
		plug: 'M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0V8ZM12 16v5',
		// droplet
		drop: 'M12 3s6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 6-10 6-10Z',
		// chip / processor
		chip: 'M8 8h8v8H8zM9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3',
		// bolt
		bolt: 'M13 2 4 14h6l-1 8 9-12h-6l1-8Z',
		// shield
		shield: 'M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3Z',
		// pulse / signal
		pulse: 'M3 12h4l2-6 4 12 2-6h6',
		// spark / edge device
		plug2: 'M12 3v6M12 15v6M3 12h6M15 12h6'
	};

	const d = $derived(paths[name] ?? paths.stack);
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.5"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={className}
	aria-hidden="true"
>
	<path d={d} />
</svg>
