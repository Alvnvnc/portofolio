<script lang="ts">
	import { cn } from '$lib/utils';
	import type { CharacterState } from '$lib/types';
	import { characterState } from '$lib/stores';

	interface Props {
		initialState?: CharacterState;
		scale?: number;
		class?: string;
	}

	let {
		initialState,
		scale = 2,
		class: className = ''
	}: Props = $props();

	// Use prop state or store state
	const currentState = $derived(initialState ?? $characterState);

	// Sprite configuration per state
	const spriteConfig: Record<CharacterState, { frames: number; fps: number }> = {
		idle: { frames: 4, fps: 4 },
		walk: { frames: 6, fps: 8 },
		code: { frames: 4, fps: 4 },
		inspect: { frames: 4, fps: 4 },
		wave: { frames: 4, fps: 6 }
	};

	let frameIndex = $state(0);
	let intervalId: ReturnType<typeof setInterval> | null = null;

	$effect(() => {
		const config = spriteConfig[currentState];
		const frameTime = 1000 / config.fps;

		// Clear previous interval
		if (intervalId) {
			clearInterval(intervalId);
		}

		// Start new animation loop
		intervalId = setInterval(() => {
			frameIndex = (frameIndex + 1) % config.frames;
		}, frameTime);

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	});

	// Placeholder - akan diganti dengan sprite sheet asli
	// Untuk sekarang menggunakan representasi visual sederhana
	const characterEmoji: Record<CharacterState, string> = {
		idle: '🧑‍💻',
		walk: '🚶',
		code: '⌨️',
		inspect: '🔍',
		wave: '👋'
	};
</script>

<div
	class={cn(
		'pixel-character relative flex items-center justify-center',
		'pixel-art select-none',
		className
	)}
	style="transform: scale({scale})"
>
	<!-- Placeholder character representation -->
	<!-- Replace with actual sprite sheet later -->
	<div class="relative">
		<!-- Character body -->
		<div
			class={cn(
				'w-8 h-8 bg-[var(--color-bg-tertiary)]',
				'border-2 border-[var(--color-text-primary)]',
				'flex items-center justify-center',
				'pixel-border-sm overflow-hidden',
				currentState === 'idle' && 'animate-float'
			)}
		>
			<img
				src="/images/hero-character.png"
				alt={currentState}
				class="w-full h-full pixel-art object-cover"
				onerror={(e) => {
					const target = e.currentTarget as HTMLImageElement;
					target.style.display = 'none';
					const fallback = target.nextElementSibling as HTMLElement;
					if (fallback) fallback.style.display = '';
				}}
			/>
			<span class="text-lg hidden" role="img" aria-label={currentState}>
				{characterEmoji[currentState]}
			</span>
		</div>

		<!-- State indicator -->
		<div class="absolute -bottom-4 left-1/2 -translate-x-1/2">
			<span class="font-pixel text-[6px] text-[var(--color-text-secondary)] uppercase">
				{currentState}
			</span>
		</div>
	</div>
</div>

<style>
	.pixel-character {
		image-rendering: pixelated;
		image-rendering: crisp-edges;
	}
</style>
