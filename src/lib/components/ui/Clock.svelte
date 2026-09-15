<script lang="ts">
	import { onMount } from 'svelte';

	let { class: className = '' }: { class?: string } = $props();

	let time = $state('--:--');

	onMount(() => {
		const format = new Intl.DateTimeFormat('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'Asia/Jakarta'
		});
		const tick = () => (time = format.format(new Date()));
		tick();
		const id = setInterval(tick, 10_000);
		return () => clearInterval(id);
	});
</script>

<span class={className} title="Waktu lokal Surabaya (UTC+7)">{time} WIB</span>
