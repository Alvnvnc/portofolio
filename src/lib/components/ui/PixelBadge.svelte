<script lang="ts">
	import { cn } from '$lib/utils';

	type Variant = 'outline' | 'ghost' | 'ink' | 'amber' | 'phosphor' | 'alert';

	interface Props {
		text: string;
		variant?: Variant;
		class?: string;
	}

	let { text, variant = 'outline', class: className = '' }: Props = $props();

	const variantClasses: Record<Variant, string> = {
		outline: 'border-seam text-moss',
		ghost: 'border-ink text-ink',
		ink: 'border-ink bg-ink text-night',
		amber: 'border-ink bg-amber text-night',
		phosphor: 'border-ink bg-phosphor text-night',
		alert: 'border-ink bg-alert text-night'
	};
</script>

<span
	class={cn(
		'inline-block border-2 px-2 py-[5px]',
		'font-pixel text-[0.45rem] uppercase leading-none tracking-wide',
		variantClasses[variant],
		className
	)}
>
	{text}
</span>
