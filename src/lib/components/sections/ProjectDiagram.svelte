<script lang="ts">
	type Node = {
		x: number;
		y: number;
		w: number;
		h: number;
		label?: string;
		sub?: string;
		fill?: string;
		shape?: 'box' | 'db' | 'pill';
		dashed?: boolean;
	};

	type Edge = { d: string; dashed?: boolean };

	type Diagram = { nodes: Node[]; edges: Edge[] };

	const ink = 'var(--ink)';
	const surface = 'var(--surface)';

	const diagrams: Record<'pome' | 'portal' | 'lecsens', Diagram> = {
		pome: {
			edges: [
				{ d: 'M108 122 H140' },
				{ d: 'M260 122 H292' },
				{ d: 'M396 122 H408 V106 H424' },
				{ d: 'M396 134 H408 V206 H424' },
				{ d: 'M478 52 V78' },
				{ d: 'M548 106 H566' },
				{ d: 'M548 206 H566' },
				{ d: 'M364 300 V266', dashed: true }
			],
			nodes: [
				{ x: 18, y: 56, w: 90, h: 20, label: 'mqtt', shape: 'pill' },
				{ x: 18, y: 84, w: 90, h: 20, label: 'coap', shape: 'pill' },
				{ x: 18, y: 112, w: 90, h: 20, label: 'modbus', shape: 'pill' },
				{ x: 18, y: 140, w: 90, h: 20, label: 'serial', shape: 'pill' },
				{ x: 18, y: 168, w: 90, h: 20, label: 'websocket', shape: 'pill' },
				{ x: 140, y: 90, w: 120, h: 64, label: 'ingest', sub: 'go · gin', fill: 'var(--yellow)' },
				{ x: 292, y: 94, w: 104, h: 56, label: 'rabbitmq', sub: 'async events', fill: 'var(--pink)' },
				{ x: 424, y: 6, w: 108, h: 46, label: 'kong', sub: 'jwt · limits' },
				{ x: 424, y: 78, w: 108, h: 56, label: 'api', sub: 'go · clean arch', fill: 'var(--mint)' },
				{ x: 424, y: 178, w: 124, h: 56, label: 'ml service', sub: 'python · grpc', fill: 'var(--orange)' },
				{ x: 566, y: 78, w: 50, h: 56, label: 'pg', shape: 'db' },
				{ x: 566, y: 178, w: 50, h: 56, label: 'influx', shape: 'db', fill: 'var(--yellow)' },
				{
					x: 140,
					y: 300,
					w: 476,
					h: 48,
					label: 'kubernetes / prometheus / grafana',
					fill: surface,
					dashed: true
				}
			]
		},
		portal: {
			edges: [
				{ d: 'M120 128 H140' },
				{ d: 'M244 128 H268' },
				{ d: 'M372 128 H386 V50 H396' },
				{ d: 'M372 128 H386 V112 H396' },
				{ d: 'M372 128 H386 V174 H396' },
				{ d: 'M372 128 H386 V236 H396' },
				{ d: 'M516 50 H544' },
				{ d: 'M516 112 H544' },
				{ d: 'M516 174 H544' },
				{ d: 'M516 236 H544' }
			],
			nodes: [
				{ x: 18, y: 62, w: 102, h: 22, label: 'lecsens', shape: 'pill' },
				{ x: 18, y: 92, w: 102, h: 22, label: 'pome', shape: 'pill' },
				{ x: 18, y: 122, w: 102, h: 22, label: 'dronemeq', shape: 'pill' },
				{ x: 140, y: 100, w: 104, h: 56, label: 'traefik', sub: 'tls' },
				{ x: 268, y: 100, w: 104, h: 56, label: 'kong', sub: 'jwt · rbac', fill: 'var(--yellow)' },
				{ x: 396, y: 26, w: 120, h: 48, label: 'user', fill: 'var(--mint)' },
				{ x: 396, y: 88, w: 120, h: 48, label: 'access' },
				{ x: 396, y: 150, w: 120, h: 48, label: 'registry', fill: 'var(--pink)' },
				{ x: 396, y: 212, w: 120, h: 48, label: 'sso' },
				{ x: 544, y: 30, w: 44, h: 44, label: 'pg', shape: 'db' },
				{ x: 544, y: 92, w: 44, h: 44, label: 'pg', shape: 'db' },
				{ x: 544, y: 154, w: 44, h: 44, label: 'pg', shape: 'db' },
				{ x: 544, y: 216, w: 44, h: 44, label: 'pg', shape: 'db' },
				{
					x: 140,
					y: 300,
					w: 448,
					h: 48,
					label: 'database per service · invitations · subscriptions',
					dashed: true
				}
			]
		},
		lecsens: {
			edges: [
				{ d: 'M126 122 H156' },
				{ d: 'M292 122 H312' },
				{ d: 'M452 110 H470 V70 H492' },
				{ d: 'M452 134 H470 V190 H492' },
				{ d: 'M452 146 H470 V250 H492' },
				{ d: 'M452 118 H566' },
				{ d: 'M300 300 V264', dashed: true }
			],
			nodes: [
				{ x: 18, y: 96, w: 108, h: 52, label: 'sensors', sub: 'mqtt', fill: 'var(--mint)' },
				{ x: 156, y: 94, w: 136, h: 56, label: 'ingest', sub: 'go · clean arch', fill: 'var(--yellow)' },
				{
					x: 312,
					y: 82,
					w: 140,
					h: 80,
					label: 'violations',
					sub: 'checked on ingest',
					fill: 'var(--orange)'
				},
				{ x: 492, y: 46, w: 112, h: 46, label: 'alerts', sub: 'notify + audit', fill: 'var(--pink)' },
				{ x: 508, y: 166, w: 46, h: 46, label: 'pg', shape: 'db' },
				{ x: 508, y: 226, w: 46, h: 46, label: 'influx', shape: 'db', fill: 'var(--yellow)' },
				{ x: 566, y: 106, w: 46, h: 46, label: 'redis', shape: 'db', fill: 'var(--pink)' },
				{
					x: 156,
					y: 300,
					w: 448,
					h: 48,
					label: 'ci/cd · trivy · gosec · nginx',
					dashed: true
				}
			]
		}
	};

	let { kind }: { kind: 'pome' | 'portal' | 'lecsens' } = $props();

	const diagram = $derived(diagrams[kind]);
	const label = $derived(
		kind === 'pome'
			? 'POME architecture: five sensor protocols into a Go ingest service, RabbitMQ, an API and a gRPC ML service behind Kong, with PostgreSQL and InfluxDB, running on Kubernetes.'
			: kind === 'portal'
				? 'Portal architecture: three IoT apps through Traefik and Kong into four Go services, each with its own PostgreSQL database.'
				: 'LecSens architecture: sensors over MQTT into a Go ingest service and a violation engine that checks thresholds on ingest, with alerts, PostgreSQL, InfluxDB and Redis.'
	);
</script>

<svg viewBox="0 0 640 372" class="diagram" role="img" aria-label={label}>
	<defs>
		<marker
			id="arw-{kind}"
			viewBox="0 0 8 8"
			refX="6.5"
			refY="4"
			markerWidth="5"
			markerHeight="5"
			orient="auto-start-reverse"
		>
			<path d="M0 0 L8 4 L0 8 z" fill={ink} />
		</marker>
	</defs>

	{#each diagram.edges as edge, i (i)}
		<path
			class="edge"
			class:dashed={edge.dashed}
			d={edge.d}
			marker-end="url(#arw-{kind})"
		/>
	{/each}

	{#each diagram.nodes as node, i (i)}
		{#if node.shape === 'db'}
			<g>
				<rect
					x={node.x}
					y={node.y}
					width={node.w}
					height={node.h}
					rx={node.w / 2.6}
					fill={node.fill ?? surface}
					stroke={ink}
					stroke-width="2.5"
				/>
				<path
					d="M{node.x + 3} {node.y + node.h * 0.3} h{node.w - 6}"
					stroke={ink}
					stroke-width="2.5"
					stroke-linecap="round"
				/>
				<path
					d="M{node.x + 3} {node.y + node.h * 0.62} h{node.w - 6}"
					stroke={ink}
					stroke-width="2.5"
					stroke-linecap="round"
				/>
				<text class="sub" x={node.x + node.w / 2} y={node.y + node.h + 16} text-anchor="middle">
					{node.label}
				</text>
			</g>
		{:else if node.shape === 'pill'}
			<g>
				<rect
					x={node.x}
					y={node.y}
					width={node.w}
					height={node.h}
					rx={node.h / 2}
					fill={node.fill ?? surface}
					stroke={ink}
					stroke-width="2.5"
				/>
				<text class="lbl" x={node.x + node.w / 2} y={node.y + node.h / 2 + 4} text-anchor="middle">
					{node.label}
				</text>
			</g>
		{:else}
			<g>
				<rect
					x={node.x}
					y={node.y}
					width={node.w}
					height={node.h}
					rx="10"
					fill={node.fill ?? surface}
					stroke={ink}
					stroke-width="2.5"
					stroke-dasharray={node.dashed ? '7 6' : undefined}
				/>
				<text class="lbl" x={node.x + node.w / 2} y={node.y + (node.sub ? node.h / 2 - 3 : node.h / 2 + 4)} text-anchor="middle">
					{node.label}
				</text>
				{#if node.sub}
					<text class="sub" x={node.x + node.w / 2} y={node.y + node.h / 2 + 15} text-anchor="middle">
						{node.sub}
					</text>
				{/if}
			</g>
		{/if}
	{/each}
</svg>

<style>
	.diagram {
		display: block;
		width: 100%;
		height: auto;
	}

	.edge {
		fill: none;
		stroke: var(--ink);
		stroke-width: 2.5;
	}

	.edge.dashed {
		stroke-dasharray: 7 6;
		stroke: var(--ink-3);
	}

	.lbl {
		font-family: 'Roboto Flex', sans-serif;
		font-stretch: 62%;
		font-weight: 720;
		font-size: 15px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		fill: var(--ink);
	}

	.sub {
		font-family: var(--font-mono);
		font-size: 11px;
		fill: var(--ink-2);
	}
</style>
