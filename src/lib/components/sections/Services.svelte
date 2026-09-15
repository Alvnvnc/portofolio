<script lang="ts">
	import { services, sectionMeta } from '$lib/data/portfolio';
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import Sticker from '$lib/components/ui/Sticker.svelte';

	const meta = sectionMeta.find((s) => s.id === 'services')!;

	function requestService(title: string) {
		document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
		setTimeout(() => {
			const field = document.querySelector('#message') as HTMLTextAreaElement | null;
			if (field) {
				field.value = `Hi Alvin — I'm looking at your ${title} service. Here's what I'm building: `;
				field.dispatchEvent(new Event('input', { bubbles: true }));
				field.focus();
			}
		}, 600);
	}
</script>

<section id="services" class="section">
	<div class="sheet">
		<SectionHead index={meta.index} label={meta.label} title={meta.title} note={meta.note} />

		<ul class="rows mt-12">
			{#each services as service (service.id)}
				<li class="row">
					<span class="icon">
						<Sticker name={service.sticker} size={66} />
					</span>

					<div class="body">
						<h3 class="title">{service.title}</h3>
						<p class="desc">{service.description}</p>
						<p class="tech mono">{service.techStack.join(' / ')}</p>
					</div>

					<span class="acts">
						<a class="text-action" href="/services/{service.id}">Spec sheet</a>
						<button class="text-action" onclick={() => requestService(service.title)}>
							Request this
						</button>
					</span>
				</li>
			{/each}

			<li class="row empty">
				<span class="icon">
					<Sticker name="bolt" size={66} />
				</span>
				<div class="body">
					<h3 class="title">Your project</h3>
					<p class="desc">
						Reserved for the thing you're building. If it needs an API, a pipeline, or a deploy that
						doesn't wake anyone up at night, it docks here.
					</p>
					<p class="tech mono">open slot</p>
				</div>
				<span class="acts">
					<button class="text-action" onclick={() => requestService('custom')}>Claim this slot</button>
				</span>
			</li>
		</ul>
	</div>
</section>

<style>
	.rows {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 16px;
		background: var(--surface);
		border: 2px solid var(--ink);
		border-radius: 18px;
		padding: 20px;
		box-shadow: var(--shadow);
		transition:
			transform 180ms cubic-bezier(0.2, 0.7, 0.2, 1),
			box-shadow 180ms ease;
	}

	.row:hover {
		transform: translate(-3px, -3px);
		box-shadow: var(--shadow-lg);
	}

	.icon {
		display: inline-flex;
		align-self: start;
	}

	.title {
		font-size: 1.375rem;
		font-weight: 660;
		letter-spacing: -0.014em;
		color: var(--ink);
	}

	.desc {
		margin-top: 6px;
		max-width: 62ch;
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--ink-2);
	}

	.tech {
		margin-top: 12px;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.acts {
		display: flex;
		flex-wrap: wrap;
		gap: 10px 22px;
		align-items: center;
	}

	.text-action {
		font-size: 0.875rem;
		font-weight: 520;
		color: var(--ink);
		text-decoration: none;
		border-bottom: 2px solid var(--yellow);
		padding-bottom: 2px;
		transition:
			border-color 140ms ease,
			color 140ms ease;
		cursor: pointer;
	}

	.text-action:hover {
		color: var(--blue);
		border-color: var(--blue);
	}

	.empty {
		background: transparent;
		border-style: dashed;
		box-shadow: none;
	}

	.empty .title,
	.empty .desc,
	.empty .tech {
		color: var(--ink-3);
	}

	.empty:hover {
		transform: none;
		box-shadow: none;
		background: var(--surface);
	}

	@media (min-width: 900px) {
		.row {
			grid-template-columns: 96px minmax(0, 1fr) 190px;
			align-items: center;
			gap: 24px;
			padding: 22px 26px;
		}

		.acts {
			justify-content: flex-end;
			flex-direction: column;
			align-items: flex-end;
		}
	}
</style>
