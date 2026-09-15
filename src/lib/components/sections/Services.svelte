<script lang="ts">
	import { services, sectionMeta } from '$lib/data/portfolio';
	import Station from '$lib/components/ui/Station.svelte';
	import SectionHead from '$lib/components/ui/SectionHead.svelte';

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
	<Station id="services" index={meta.index} label={meta.label} />
	<div class="sheet">
		<SectionHead title={meta.title} note={meta.note} />

		<ul class="rows mt-12">
			{#each services as service (service.id)}
				<li class="row">
					<span class="code mono">{service.code.toLowerCase()}</span>
					<h3 class="title">{service.title}</h3>
					<p class="desc">{service.description}</p>
					<p class="tech mono">{service.techStack.join(' / ')}</p>
					<span class="acts">
						<a class="text-action" href="/services/{service.id}">Spec sheet</a>
						<button class="text-action" onclick={() => requestService(service.title)}>
							Request this
						</button>
					</span>
				</li>
			{/each}

			<li class="row empty">
				<span class="code mono">svc-07</span>
				<h3 class="title">Your project</h3>
				<p class="desc">
					Reserved for the thing you're building. If it needs an API, a pipeline, or a deploy that
					doesn't wake anyone up at night, it docks here.
				</p>
				<p class="tech mono">open slot</p>
				<span class="acts">
					<button
						class="text-action on"
						onclick={() => requestService('custom')}
					>
						Claim this slot
					</button>
				</span>
			</li>
		</ul>
	</div>
</section>

<style>
	.rows {
		border-bottom: 1px solid var(--rule);
	}

	.row {
		position: relative;
		display: grid;
		gap: 6px 48px;
		grid-template-columns: minmax(0, 1fr);
		padding: 26px 16px;
		margin: 0 -16px;
		border-top: 1px solid var(--rule);
		transition: background-color 180ms ease;
	}

	.row::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: -1px;
		height: 1px;
		background: var(--signal);
		transform: scaleX(0);
		transform-origin: left center;
		transition: transform 380ms cubic-bezier(0.2, 0.7, 0.2, 1);
	}

	.row:hover {
		background: var(--paper-2);
	}

	.row:hover::after {
		transform: scaleX(1);
	}

	.code {
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.title {
		font-size: 1.3125rem;
		font-weight: 600;
		letter-spacing: -0.012em;
		color: var(--ink);
		transition: color 180ms ease;
	}

	.row:hover .title {
		color: var(--signal);
	}

	.desc {
		margin-top: 6px;
		max-width: 58ch;
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--ink-2);
	}

	.tech {
		margin-top: 10px;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.acts {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 22px;
		margin-top: 14px;
	}

	.text-action {
		font-size: 0.875rem;
		color: var(--ink);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 3px;
		transition: color 140ms ease;
		cursor: pointer;
	}

	.text-action:hover {
		color: var(--signal);
	}

	.text-action.on {
		color: var(--signal);
	}

	.empty .title,
	.empty .desc,
	.empty .tech {
		color: var(--ink-3);
	}

	.empty .code::before {
		content: '· ';
	}

	@media (min-width: 900px) {
		.row {
			grid-template-columns: 96px minmax(0, 1fr) 180px;
			align-items: start;
			padding: 30px 16px;
		}

		.code {
			grid-column: 1;
			padding-top: 7px;
		}

		.title,
		.desc,
		.tech {
			grid-column: 2;
		}

		.title {
			grid-row: 1;
		}

		.desc {
			grid-row: 2;
			margin-top: 8px;
		}

		.tech {
			grid-row: 3;
		}

		.acts {
			grid-column: 3;
			grid-row: 1;
			justify-content: flex-end;
			margin-top: 0;
			padding-top: 2px;
		}
	}
</style>
