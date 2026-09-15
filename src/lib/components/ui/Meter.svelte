<script lang="ts">
	let { level, max = 4 }: { level: number; max?: number } = $props();
</script>

	<span class="meter" role="img" aria-label="{level} of {max}">
	{#each Array(max) as _, i (i)}
		<span class="tick" class:on={i < level}></span>
	{/each}
</span>

<style>
	.meter {
		display: inline-flex;
		align-items: center;
		gap: 3px;
	}

	.tick {
		display: block;
		width: 9px;
		height: 4px;
		background: var(--paper-3);
	}

	.tick.on {
		background: var(--ink);
	}
</style>
