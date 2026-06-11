<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		text: string;
		variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'dark';
		class?: string;
	}

	let {
		text,
		variant = 'default',
		class: className = ''
	}: Props = $props();

	const variantClasses: Record<string, string> = {
		default: '',
		primary: 'is-primary',
		success: 'is-success',
		warning: 'is-warning',
		error: 'is-error',
		dark: 'is-dark'
	};
</script>

<span class={cn('nes-badge', className)}>
	<span class={cn('font-pixel text-[0.5rem]', variantClasses[variant])}>
		{text}
	</span>
</span>
