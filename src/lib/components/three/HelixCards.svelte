<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Grid } from '@threlte/extras';
	import {
		AdditiveBlending,
		DoubleSide,
		Fog,
		Color,
		PlaneGeometry,
		TextureLoader,
		SRGBColorSpace,
		type Texture,
		type Group
	} from 'three';

	let {
		progress,
		reducedMotion = false
	}: { progress: { current: number }; reducedMotion?: boolean } = $props();

	// Warm media-card tints — used for the glow halo behind each screen.
	const COLORS = [
		'#d6835a',
		'#8a9a78',
		'#b06a4a',
		'#c9a24b',
		'#cf7a4f',
		'#7f8f6c',
		'#d99a6a',
		'#b58a52',
		'#c2694a',
		'#d6835a',
		'#96a37f',
		'#bd7d55'
	];

	// Real screenshots of the Portal IoT console (dark theme) become the card
	// faces — a floating wall of the actual product. Loaded client-side only
	// (this component instantiates inside the client-only Canvas).
	const IMAGES = [
		'/images/portal-services.jpg',
		'/images/portal-dashboard.jpg',
		'/images/portal-wizard.jpg'
	];
	const loader = new TextureLoader();
	const textures: Texture[] = IMAGES.map((url) => {
		const tex = loader.load(url);
		tex.colorSpace = SRGBColorSpace;
		return tex;
	});

	const TURNS = 2.6;
	const RADIUS = 3.4;
	const HELIX_HEIGHT = 14;

	const damp = (c: number, t: number, l: number, dt: number) =>
		c + (t - c) * (1 - Math.exp(-l * dt));

	// A plane bent into a gentle concave curve, like a flexible panel. Shared
	// across every card (one geometry instance is fine in three.js).
	function makeCurvedPanel(w: number, h: number, bend: number): PlaneGeometry {
		const geo = new PlaneGeometry(w, h, 28, 2);
		const pos = geo.attributes.position;
		for (let i = 0; i < pos.count; i++) {
			const x = pos.getX(i);
			pos.setZ(i, -bend * Math.pow(x / (w / 2), 2));
		}
		pos.needsUpdate = true;
		geo.computeVertexNormals();
		return geo;
	}

	// Panel aspect matches the 16:10 screenshots so they map without stretching.
	const panel = makeCurvedPanel(2.1, 1.3125, 0.55);

	const cards = COLORS.map((color, i) => {
		const t = i / (COLORS.length - 1);
		const angle = t * TURNS * Math.PI * 2;
		const y = (t - 0.5) * HELIX_HEIGHT;
		const x = Math.cos(angle) * RADIUS;
		const z = Math.sin(angle) * RADIUS;
		// Face the panel tangent to the helix, front toward the axis/camera.
		const rotY = -angle + Math.PI / 2;
		return {
			color,
			texture: textures[i % textures.length],
			position: [x, y, z] as [number, number, number],
			rotY
		};
	});

	const fog = new Fog('#0c0a08', 8, 20);

	let group = $state<Group | undefined>(undefined);

	useTask((delta) => {
		const g = group;
		if (!g) return;
		const dt = Math.min(delta, 0.05);
		const p = progress.current ?? 0;

		// Scroll travels you up the helix and slowly spins the whole ribbon.
		const targetRot =
			p * TURNS * Math.PI * 2 * 0.85 + (reducedMotion ? 0 : performance.now() * 0.00004);
		const targetY = -6 + p * HELIX_HEIGHT * 0.9;

		g.rotation.y = damp(g.rotation.y, targetRot, 5, dt);
		g.position.y = damp(g.position.y, targetY, 5, dt);
	});
</script>

<T.Color attach="background" args={[new Color('#0c0a08')]} />
<T is={fog} attach="fog" />

<T.AmbientLight intensity={0.5} color="#f0e2d0" />
<T.DirectionalLight position={[5, 8, 6]} intensity={1.6} color="#ffd9a8" />
<T.PointLight position={[-6, 0, -4]} intensity={40} color="#8a9a78" />
<T.PointLight position={[4, -3, 5]} intensity={25} color="#d6835a" />

<!-- Dark background grid for the volumetric feel -->
<T.Group position={[0, -7, 0]}>
	<Grid
		cellSize={0.8}
		cellThickness={0.6}
		cellColor="#3a2f26"
		sectionSize={4}
		sectionThickness={1}
		sectionColor="#5a4736"
		fadeDistance={30}
		fadeStrength={2}
		infiniteGrid
	/>
</T.Group>

<T.Group bind:ref={group}>
	{#each cards as card (card)}
		<T.Group position={card.position} rotation={[0, card.rotY, 0]}>
			<!-- Additive glow backing for the soft-glow look -->
			<T.Mesh position={[0, 0, -0.06]} scale={1.18}>
				<T is={panel} attach="geometry" />
				<T.MeshBasicMaterial
					color={card.color}
					transparent
					opacity={0.12}
					blending={AdditiveBlending}
					side={DoubleSide}
					depthWrite={false}
				/>
			</T.Mesh>
			<!-- The card itself: a Portal console screenshot on a slight glow. -->
			<T.Mesh castShadow>
				<T is={panel} attach="geometry" />
				<T.MeshStandardMaterial
					map={card.texture}
					emissive={card.color}
					emissiveIntensity={0.12}
					roughness={0.4}
					metalness={0.1}
					side={DoubleSide}
				/>
			</T.Mesh>
		</T.Group>
	{/each}
</T.Group>
