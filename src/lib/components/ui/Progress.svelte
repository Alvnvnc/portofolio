<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		value: number;
		max?: number;
		variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'pattern';
		class?: string;
	}

	let {
		value,
		max = 100,
		variant = 'primary',
		class: className = ''
	}: Props = $props();

	const percentage = $derived(Math.min(Math.max((value / max) * 100, 0), 100));

	const variantClasses: Record<string, string> = {
		default: '',
		primary: 'is-primary',
		success: 'is-success',
		warning: 'is-warning',
		error: 'is-error',
		pattern: 'is-pattern'
	};
</script>

<progress
	class={cn('nes-progress', variantClasses[variant], className)}
	value={percentage}
	max="100"
></progress>
