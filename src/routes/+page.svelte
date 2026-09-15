<script lang="ts">
	import {
		Hero,
		About,
		Services,
		Skills,
		Projects,
		Experience,
		Contact,
		Rail
	} from '$lib/components';
	import { reading } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => reading.init());
</script>

<Hero />
<About />
<Services />
<Skills />
<Projects />
<Experience />
<Contact />

<Rail />
