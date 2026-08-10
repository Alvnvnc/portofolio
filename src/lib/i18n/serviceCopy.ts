import type { Locale } from './index';

/**
 * Long-form copy for the service detail pages, per locale.
 *
 * Kept out of `en.ts` / `id.ts` on purpose: those hold the landing-page voice,
 * this holds the pages that have to earn search traffic. The writing rule here
 * is one thing — describe the work the way the client describes their problem,
 * not the way an agency describes a package. That is also what makes the pages
 * match real long-tail queries without a single keyword being forced in.
 */
export interface ServiceCopy {
	title: string;
	/** One line — also used on the landing-page catalog. */
	description: string;
	longDescription: string;
	features: string[];
	process: string[];
	/** Real questions clients open with. Mirrored into FAQPage structured data. */
	faq: { q: string; a: string }[];
	/** Only the full-stack page needs this: an explicit statement of limits. */
	boundaries?: { intro: string; mine: string[]; partner: string[] };
	seo: { title: string; description: string; keywords: string[] };
}

const enCopy: Record<string, ServiceCopy> = {
	'backend-dev': {
		title: 'Backend Development',
		description:
			'APIs and services built to be maintained, not just shipped — Clean Architecture, tests, and logs you can actually read.',
		longDescription:
			'I get called at one of two moments: nothing exists yet and the schema has to be right the first time, or a backend is already running and nobody dares touch it. Both jobs get the same treatment — clear domain boundaries, tests that hold the line when requirements move, and logs that explain themselves at 2 a.m. What you end up with is not just code that runs, but code the next engineer can pick up without phoning me.',
		features: [
			'Clean Architecture with real domain boundaries — not an MVC folder tree with a nicer name',
			'REST endpoints with JWT/OAuth authentication and per-role authorization',
			'Database schema design and query optimization, with migrations that can be rolled back',
			'Structured logging that names the cause, instead of one more "internal server error"',
			'Unit and integration tests wired into CI so nothing lands untested'
		],
		process: [
			'Pull apart the requirements: business flow, expected load, and the things that must never fail',
			'Design the schema and the API contract — agreed before a single line is written',
			'Build in slices you can try each week, not one large reveal at the end',
			'Security review, production deploy, and a handover that includes documentation'
		],
		faq: [
			{
				q: 'What does a backend API cost to build?',
				a: 'There is no package price, because a three-endpoint service and a multi-tenant platform are not the same job. After you walk me through the flow and the expected load, you get a breakdown per module with the working days attached, so you can cut whatever is not needed yet.'
			},
			{
				q: 'How long does it take?',
				a: 'An internal API covering one domain: 2–4 weeks. A multi-tenant system with auth, roles, and an audit trail: 6–12 weeks. You get something runnable every week rather than waiting in the dark until the end.'
			},
			{
				q: 'Do I own the code and the infrastructure?',
				a: 'Entirely. Repository, credentials, and servers live in your accounts from day one — not in mine to be transferred later. Handover includes architecture documentation and a walkthrough session with your team.'
			},
			{
				q: 'Can you take over an existing backend?',
				a: 'Yes, and it happens often. I start by reading the code and writing you a note: what is safe to touch, what is fragile, and what should be replaced later rather than now. You get that note before deciding whether to continue.'
			}
		],
		seo: {
			title: 'Backend Development in Golang & Python | Alvin Vincent',
			description:
				'Freelance backend developer building Golang and Python services on Clean Architecture: REST APIs, PostgreSQL schemas, tests, and a handover your team can maintain. Based in Surabaya, working worldwide.',
			keywords: [
				'backend developer',
				'golang developer',
				'freelance backend engineer',
				'REST API development',
				'clean architecture',
				'python backend developer'
			]
		}
	},

	'api-design': {
		title: 'API Design & Integration',
		description:
			'REST endpoints with auth, rate limits, and docs — your web or mobile team plugs in and stops thinking about it.',
		longDescription:
			'Most API problems are not performance problems. They are contract problems: the mobile team assumed one shape, the backend shipped another, and now both sides are writing adapters. I design the contract first, in the open, so the disagreement happens on a document instead of in production. Then I build it — authentication, rate limits, pagination, error shapes that mean the same thing on every endpoint — and document it well enough that nobody has to ask me how it works.',
		features: [
			'API contract designed and reviewed before implementation starts',
			'JWT and OAuth2 authentication, with refresh flows that survive a mobile app',
			'Rate limiting, pagination, and consistent error shapes across every endpoint',
			'Third-party and payment gateway integration, including webhook retry handling',
			'WebSocket channels where polling would be the wrong answer'
		],
		process: [
			'Map every consumer — web, mobile, third parties — and what each one actually needs',
			'Write the contract and the auth strategy, then review it with the teams who will consume it',
			'Implement against the contract, with documentation produced alongside the code',
			'Integration testing with the real clients, then load testing before launch'
		],
		faq: [
			{
				q: 'Our API already exists but the mobile team keeps hitting issues. Can you fix that?',
				a: 'That is usually a contract and error-handling problem rather than a rewrite. I audit the existing endpoints, write down every inconsistency, and give you a list ordered by how much pain each one causes. Most of them are fixable without breaking existing clients.'
			},
			{
				q: 'Do you provide documentation?',
				a: 'Always, and it is generated from the same source as the code so it cannot silently drift. Your frontend developers get something they can read and test against without messaging anyone.'
			},
			{
				q: 'Can you integrate a payment gateway or a third-party service?',
				a: 'Yes — Midtrans, Xendit, Stripe, and the general category of "vendor with an unreliable webhook". The interesting work there is idempotency and retry handling, so a duplicate callback never charges anyone twice.'
			}
		],
		seo: {
			title: 'REST API Design & Third-Party Integration | Alvin Vincent',
			description:
				'API design and integration for teams tired of contract drift: JWT and OAuth2 auth, rate limits, webhooks with idempotent retries, and documentation generated from the code itself.',
			keywords: [
				'API design',
				'REST API developer',
				'API integration',
				'JWT authentication',
				'payment gateway integration',
				'freelance API engineer'
			]
		}
	},

	'iot-data': {
		title: 'IoT & Data Systems',
		description:
			'Sensor-to-dashboard pipelines: MQTT in, time-series storage, alerts out. Built on real industrial deployments.',
		longDescription:
			'Sensor projects rarely fail at the sensor. They fail at the part where data arrives faster than anyone planned for, the database that was fine in the demo starts timing out, and the alert that mattered gets buried under two hundred that did not. I have built three of these platforms for industrial deployments — palm-oil mill effluent, water-quality compliance — so the pipeline I hand you already assumes bursts, gaps, duplicate readings, and a field device that reboots at the worst moment.',
		features: [
			'Multi-protocol ingestion — MQTT, CoAP, Modbus, Serial, WebSocket — behind one internal contract',
			'Time-series storage sized for the real sample rate, split from the metadata that describes it',
			'Thresholds evaluated on ingest, so an alert fires in seconds and not on tomorrow morning batch',
			'Dashboards and reports built for the person who has to explain the number to a regulator',
			'Backfill and gap handling for devices that go offline and return with a week of buffered readings'
		],
		process: [
			'Inventory the devices: protocols, sample rates, and how badly each one misbehaves',
			'Split the storage — time-series for readings, relational for the assets and rules around them',
			'Build ingestion and the alerting engine, tested against replayed real data rather than clean samples',
			'Dashboard, deployment, and alert tuning until the noise level is something people will actually read'
		],
		faq: [
			{
				q: 'How many devices can the system handle?',
				a: 'The architecture matters more than the count. Ingestion is decoupled from processing through a queue, so device bursts never block the API. The platforms I run today handle continuous multi-protocol streams; scaling further is a matter of adding consumers, not rewriting.'
			},
			{
				q: 'What if the internet at the site is unreliable?',
				a: 'Assumed from the start. Devices buffer locally, ingestion is idempotent so replayed readings do not duplicate, and gaps are visible on the dashboard instead of being silently interpolated into a nice-looking line.'
			},
			{
				q: 'Can it produce reports for regulators?',
				a: 'That is exactly what LecSens does — threshold violations, timestamps, and an audit trail of who acknowledged what. Reports are generated from the same data as the dashboard, so the two can never disagree.'
			}
		],
		seo: {
			title: 'IoT Backend & Sensor Monitoring Systems | Alvin Vincent',
			description:
				'IoT backend developer with three industrial monitoring platforms in production: multi-protocol ingestion, InfluxDB time-series pipelines, on-ingest alerting, and regulator-ready reporting.',
			keywords: [
				'IoT developer',
				'sensor monitoring backend',
				'time-series database',
				'InfluxDB developer',
				'MQTT ingestion',
				'industrial IoT platform'
			]
		}
	},

	'ai-integration': {
		title: 'AI / LLM Integration',
		description:
			'LLM features wired into real backends — RAG, vector search, structured outputs, with fallbacks and a cost ceiling.',
		longDescription:
			'The demo is the easy half. An LLM feature becomes a real feature when it has a cost ceiling, a fallback for the day the provider returns 503, output the rest of your system can parse without guessing, and an honest answer for what happens when the model is confidently wrong. I build that half: retrieval that cites its source, a provider-agnostic layer so you are not locked to one vendor, and per-tenant cost tracking so the bill never becomes a surprise.',
		features: [
			'RAG with retrieval you can inspect — every answer traceable to the chunk it came from',
			'Provider-agnostic layer with fallbacks, so an outage degrades the feature instead of the product',
			'Structured outputs validated against a schema before they reach the rest of your system',
			'Per-tenant cost tracking with hard ceilings, not a monthly surprise',
			'Evaluation set built from your real documents, so quality changes are measured rather than felt'
		],
		process: [
			'Decide honestly whether the use case needs an LLM at all — sometimes search or rules win',
			'Build the retrieval pipeline: chunking, embeddings, and the vector store around your documents',
			'Integrate with validation, fallbacks, and cost limits from the first commit',
			'Evaluate against real cases, tune, deploy with monitoring on both quality and spend'
		],
		faq: [
			{
				q: 'How much does running an LLM feature cost per month?',
				a: 'It depends on volume and model, but the number should never be a mystery. I instrument cost per request and per tenant from the start and set hard ceilings, so you can see the trade-off between model quality and spend before committing to it.'
			},
			{
				q: 'Can it work with our internal documents without leaking them?',
				a: 'Yes. Retrieval runs against your own vector store, and the provider layer is swappable — including to a self-hosted model if the data cannot leave your infrastructure at all. That constraint is worth naming before the design, not after.'
			},
			{
				q: 'What happens when the model gives a wrong answer?',
				a: 'You design for it. Outputs are schema-validated so malformed responses are caught rather than stored, answers cite their source so a human can check, and low-confidence cases route to a fallback path instead of guessing.'
			}
		],
		seo: {
			title: 'LLM & RAG Integration for Existing Backends | Alvin Vincent',
			description:
				'AI integration for production systems, not demos: RAG with traceable retrieval, provider-agnostic fallbacks, schema-validated outputs, and per-tenant cost ceilings.',
			keywords: [
				'LLM integration',
				'RAG system developer',
				'AI backend developer',
				'vector search',
				'LLM API integration',
				'AI integration freelance'
			]
		}
	},

	devops: {
		title: 'DevOps & Deployment',
		description:
			'Docker, CI/CD, security scans, zero-downtime deploys — the unglamorous work that keeps the pager quiet.',
		longDescription:
			'A deploy process that only one person understands is an outage waiting for that person to take a holiday. I replace it with something written down and repeatable: containers that build the same way on every machine, a pipeline that refuses to ship failing code, and a rollback that takes one command instead of a phone call. None of it is glamorous. All of it is the difference between an incident lasting five minutes and lasting all evening.',
		features: [
			'Multi-stage Docker builds — small images, reproducible on any machine',
			'CI/CD that runs tests, linting, and security scans (Trivy, gosec) before anything ships',
			'Zero-downtime deploys with health checks and a rollback that is one command',
			'Linux server provisioning, Nginx or Traefik routing, TLS, and Cloudflare tunnels',
			'Monitoring and alerts that fire before your users are the ones telling you'
		],
		process: [
			'Audit how deploys happen today, including the steps that only live in someone’s head',
			'Containerize and get the build reproducible before changing anything else',
			'Wire the pipeline: tests, scans, staged deploy, rollback path',
			'Add monitoring, then document the whole thing so it survives without me'
		],
		faq: [
			{
				q: 'Our deploys are manual and scary. Where do you start?',
				a: 'By writing down what actually happens now, including the undocumented steps. Nothing gets automated until it is reproducible by hand, because automating a process nobody understands just makes the failures faster.'
			},
			{
				q: 'Do we need Kubernetes?',
				a: 'Usually not. Most projects I see are better served by Docker Compose on a well-configured server, and I will say so rather than sell you a cluster. Kubernetes earns its complexity at a scale you will know when you reach.'
			},
			{
				q: 'Can you work with our existing servers and cloud provider?',
				a: 'Yes — the setup runs on your infrastructure and your accounts. I have worked across bare Linux servers, VPS providers, and Cloudflare-fronted deployments; nothing here requires a specific vendor.'
			}
		],
		seo: {
			title: 'Docker, CI/CD & Zero-Downtime Deployment | Alvin Vincent',
			description:
				'DevOps for teams whose deploys still live in one person’s head: reproducible Docker builds, CI/CD with security scanning, one-command rollback, and monitoring that warns you first.',
			keywords: [
				'DevOps services',
				'Docker deployment',
				'CI/CD pipeline',
				'Linux server management',
				'zero downtime deployment',
				'freelance DevOps'
			]
		}
	},

	'full-stack-web': {
		title: 'Full Stack Web Development',
		description:
			'One owner from database to interface — backend-heavy full stack, with the boundary stated up front instead of discovered later.',
		longDescription:
			'Splitting a small product across a backend freelancer and a frontend freelancer usually costs more than it saves: the two never quite agree on the contract, and you become the messenger. For projects of that size I take the whole thing — schema, API, interface, deploy — so there is one person to ask and one person accountable when something breaks. My centre of gravity is the backend, and the interface I build reflects that: fast, accessible, well-structured SvelteKit or Next.js, honest about being engineering rather than art direction.',
		features: [
			'One contract from database to interface — no integration gap between two freelancers',
			'SvelteKit or Next.js frontend, server-rendered so it loads fast and search engines can read it',
			'The same Go or Python backend I build standalone, not a thinner version of it',
			'Auth, roles, and admin views built once and shared across both halves',
			'Deployed, monitored, and handed over with documentation for whoever maintains it next'
		],
		process: [
			'Agree what the product must do, then cut it to what version one actually needs',
			'Design the schema and API contract first — the interface follows the data, not the reverse',
			'Build both halves in slices: a working, deployed thing every week rather than a big reveal',
			'Deploy, monitor, hand over — including a walkthrough for whoever inherits it'
		],
		boundaries: {
			intro:
				'"Full stack" is a word people use to mean everything, which makes it useless for deciding whether to hire someone. Here is the actual line, so you can find out now rather than three weeks in.',
			mine: [
				'Database schema, migrations, and query performance',
				'API design, authentication, roles, and business logic',
				'SvelteKit / Next.js interfaces: forms, tables, dashboards, admin panels',
				'Responsive layout, accessibility, and Core Web Vitals',
				'Deployment, CI/CD, monitoring, and the handover documentation'
			],
			partner: [
				'Original brand identity and visual direction',
				'Illustration, 3D art, and motion design as a discipline of its own',
				'Long-form marketing copywriting',
				'Native iOS and Android applications'
			]
		},
		faq: [
			{
				q: 'Is a full stack developer enough, or do I need a team?',
				a: 'For an internal tool, a dashboard, an MVP, or a product with a handful of user roles, one person is usually faster and cheaper — the coordination overhead disappears. Once you have several parallel workstreams or a serious design ambition, you want a team, and I will tell you when you have crossed that line.'
			},
			{
				q: 'Which frontend stack do you use?',
				a: 'SvelteKit by preference, Next.js when the team already knows React. Both are server-rendered, which matters if the pages need to be found in search rather than just used after login.'
			},
			{
				q: 'Can you work with a designer we already have?',
				a: 'That is the arrangement I would recommend for anything customer-facing. Give me a Figma file and I will build it properly; what I do not do is invent the brand while also engineering the system.'
			},
			{
				q: 'What if we need to hire a real team later?',
				a: 'Then the code has to be ready for them, which is why the boring parts are not optional: clear boundaries, tests, migrations, and documentation. The measure of the handover is whether the next developer can ship in their first week without calling me.'
			}
		],
		seo: {
			title: 'Full Stack Web Development, Backend-Heavy | Alvin Vincent',
			description:
				'Freelance full stack developer with a backend centre of gravity: Go or Python services, SvelteKit or Next.js interfaces, deployed and documented by one accountable person — with the limits stated up front.',
			keywords: [
				'full stack developer',
				'freelance full stack developer',
				'full stack programmer',
				'sveltekit developer',
				'nextjs developer',
				'MVP development'
			]
		}
	}
};

const idCopy: Record<string, ServiceCopy> = {
	'backend-dev': {
		title: 'Pembuatan Backend & API',
		description:
			'API dan service yang dibangun untuk dirawat, bukan sekadar dirilis — Clean Architecture, test, dan log yang benar-benar bisa dibaca.',
		longDescription:
			'Saya biasanya dipanggil di salah satu dari dua titik: belum ada apa-apa dan skemanya harus benar sejak awal, atau backend-nya sudah jalan tapi tidak ada yang berani menyentuhnya lagi. Keduanya saya kerjakan dengan cara yang sama — batas domain yang jelas, test yang menahan ketika kebutuhan berubah, dan log yang menjelaskan dirinya sendiri jam dua pagi. Yang Anda terima bukan sekadar kode yang jalan, tapi kode yang bisa dilanjutkan orang lain tanpa perlu menelepon saya.',
		features: [
			'Clean Architecture dengan batas domain sungguhan — bukan folder MVC yang diberi nama lebih keren',
			'Endpoint REST dengan autentikasi JWT/OAuth dan otorisasi per peran',
			'Desain skema database dan optimasi query, dengan migration yang bisa di-rollback',
			'Structured logging yang menyebut penyebabnya, bukan satu lagi "internal server error"',
			'Unit dan integration test yang jalan otomatis di CI sebelum kode mendarat'
		],
		process: [
			'Bedah kebutuhan: alur bisnis, perkiraan beban, dan hal-hal yang tidak boleh gagal',
			'Rancang skema dan kontrak API — disepakati sebelum satu baris kode ditulis',
			'Bangun per potongan yang bisa Anda coba tiap minggu, bukan satu rilis besar di akhir',
			'Review keamanan, deploy ke produksi, dan serah terima berikut dokumentasinya'
		],
		faq: [
			{
				q: 'Berapa biaya jasa pembuatan backend API?',
				a: 'Tidak ada harga paket, karena backend tiga endpoint dan platform multi-tenant bukan pekerjaan yang sama. Setelah Anda ceritakan alurnya dan perkiraan bebannya, Anda dapat rincian per modul lengkap dengan jumlah hari kerjanya — sehingga modul yang belum perlu bisa dicoret dulu.'
			},
			{
				q: 'Berapa lama pengerjaan backend sampai bisa dipakai?',
				a: 'API internal untuk satu domain: 2–4 minggu. Sistem multi-tenant dengan autentikasi, peran, dan audit trail: 6–12 minggu. Setiap minggu ada yang bisa dicoba, jadi Anda tidak menunggu dalam gelap sampai akhir.'
			},
			{
				q: 'Apakah kode dan servernya menjadi milik saya sepenuhnya?',
				a: 'Sepenuhnya. Repository, kredensial, dan server berdiri di akun Anda sejak hari pertama — bukan di akun saya lalu dipindahkan nanti. Serah terima mencakup dokumentasi arsitektur dan satu sesi walkthrough bersama tim Anda.'
			},
			{
				q: 'Bisakah melanjutkan backend yang sudah dibuat developer sebelumnya?',
				a: 'Bisa, dan itu sering terjadi. Saya mulai dengan membaca kodenya dan menulis catatan: mana yang aman disentuh, mana yang rapuh, dan mana yang sebaiknya diganti belakangan. Catatan itu Anda terima lebih dulu, sebelum memutuskan lanjut atau tidak.'
			}
		],
		seo: {
			title: 'Jasa Pembuatan Backend & REST API (Golang, Python) — Alvin Vincent',
			description:
				'Jasa pembuatan backend dan REST API dengan Golang, Python, dan PostgreSQL. Clean Architecture, test otomatis, dan serah terima penuh berikut dokumentasi. Programmer backend freelance dari Surabaya.',
			keywords: [
				'jasa pembuatan backend',
				'jasa pembuatan api',
				'programmer backend',
				'developer golang indonesia',
				'jasa backend developer',
				'freelance backend engineer indonesia'
			]
		}
	},

	'api-design': {
		title: 'Desain & Integrasi API',
		description:
			'Endpoint REST dengan auth, rate limit, dan dokumentasi — tim web atau mobile Anda tinggal pasang, lalu berhenti memikirkannya.',
		longDescription:
			'Sebagian besar masalah API bukan masalah performa, melainkan masalah kontrak: tim mobile mengira bentuknya A, backend mengirim bentuk B, dan sekarang kedua sisi sibuk menulis adapter. Saya merancang kontraknya lebih dulu dan terbuka, supaya perdebatan terjadi di atas dokumen, bukan di produksi. Setelah itu baru dibangun — autentikasi, rate limit, pagination, bentuk error yang artinya sama di semua endpoint — dan didokumentasikan cukup baik sehingga tidak ada yang perlu bertanya ke saya soal cara pakainya.',
		features: [
			'Kontrak API dirancang dan disepakati sebelum implementasi dimulai',
			'Autentikasi JWT dan OAuth2, dengan alur refresh yang tahan dipakai aplikasi mobile',
			'Rate limit, pagination, dan bentuk error yang konsisten di seluruh endpoint',
			'Integrasi payment gateway dan layanan pihak ketiga, termasuk penanganan webhook yang gagal',
			'Kanal WebSocket untuk kasus yang memang tidak cocok diselesaikan dengan polling'
		],
		process: [
			'Petakan semua konsumen — web, mobile, pihak ketiga — dan apa yang sebenarnya mereka butuhkan',
			'Tulis kontrak dan strategi autentikasinya, lalu review bersama tim yang akan memakainya',
			'Implementasi mengikuti kontrak, dengan dokumentasi yang lahir bersama kodenya',
			'Uji integrasi dengan klien sungguhan, lalu uji beban sebelum rilis'
		],
		faq: [
			{
				q: 'API kami sudah ada tapi tim mobile terus menemukan masalah. Bisa dibereskan?',
				a: 'Itu biasanya masalah kontrak dan penanganan error, bukan alasan untuk menulis ulang. Saya audit endpoint yang ada, catat setiap ketidakkonsistenannya, lalu berikan daftar yang diurutkan berdasarkan seberapa besar kerugiannya. Sebagian besar bisa diperbaiki tanpa merusak klien yang sudah jalan.'
			},
			{
				q: 'Apakah dokumentasi API ikut disediakan?',
				a: 'Selalu, dan dihasilkan dari sumber yang sama dengan kodenya supaya tidak diam-diam melenceng. Developer frontend Anda dapat sesuatu yang bisa dibaca dan langsung dicoba tanpa perlu bertanya ke siapa pun.'
			},
			{
				q: 'Bisa integrasi payment gateway seperti Midtrans atau Xendit?',
				a: 'Bisa — Midtrans, Xendit, Stripe, dan kategori umum "vendor dengan webhook yang tidak bisa diandalkan". Bagian yang benar-benar penting di situ adalah idempotensi dan penanganan ulang, supaya callback ganda tidak pernah menagih pelanggan dua kali.'
			}
		],
		seo: {
			title: 'Jasa Integrasi API & Payment Gateway (REST, JWT) — Alvin Vincent',
			description:
				'Jasa desain dan integrasi REST API: autentikasi JWT dan OAuth2, rate limit, integrasi Midtrans/Xendit dengan webhook idempoten, serta dokumentasi yang dihasilkan langsung dari kodenya.',
			keywords: [
				'jasa integrasi api',
				'jasa pembuatan rest api',
				'integrasi payment gateway',
				'developer api indonesia',
				'jasa integrasi midtrans',
				'programmer api freelance'
			]
		}
	},

	'iot-data': {
		title: 'Sistem IoT & Data Sensor',
		description:
			'Pipeline dari sensor ke dashboard: MQTT masuk, time-series tersimpan, alert keluar. Dibangun dari deployment industri sungguhan.',
		longDescription:
			'Proyek sensor jarang gagal di sensornya. Gagalnya di bagian ketika data datang lebih cepat dari perkiraan siapa pun, database yang tadinya baik-baik saja saat demo mulai timeout, dan alert yang benar-benar penting tenggelam di antara dua ratus alert yang tidak penting. Saya sudah membangun tiga platform seperti ini untuk deployment industri — limbah pabrik kelapa sawit, kepatuhan kualitas air — jadi pipeline yang Anda terima sudah mengasumsikan lonjakan data, data bolong, pembacaan ganda, dan perangkat lapangan yang restart di saat paling tidak tepat.',
		features: [
			'Ingesti multi-protokol — MQTT, CoAP, Modbus, Serial, WebSocket — di balik satu kontrak internal',
			'Penyimpanan time-series yang diukur dari laju sampling sebenarnya, dipisah dari metadata yang menjelaskannya',
			'Ambang batas dievaluasi saat data masuk, sehingga alert menyala dalam hitungan detik, bukan lewat batch besok pagi',
			'Dashboard dan laporan yang dirancang untuk orang yang harus menjelaskan angkanya ke regulator',
			'Penanganan data bolong dan backfill untuk perangkat yang sempat offline lalu kembali membawa data seminggu'
		],
		process: [
			'Inventarisasi perangkat: protokolnya, laju datanya, dan seberapa sering masing-masing berulah',
			'Pisahkan penyimpanan — time-series untuk pembacaan, relasional untuk aset dan aturan di sekitarnya',
			'Bangun ingesti dan mesin alert, diuji dengan data lapangan yang diputar ulang, bukan sampel bersih',
			'Dashboard, deployment, dan penyetelan alert sampai tingkat kebisingannya benar-benar layak dibaca orang'
		],
		faq: [
			{
				q: 'Berapa banyak perangkat yang sanggup ditangani sistemnya?',
				a: 'Arsitekturnya lebih menentukan daripada jumlahnya. Ingesti dipisahkan dari pemrosesan lewat antrean, jadi lonjakan dari perangkat tidak pernah memblokir API. Platform yang saya operasikan sekarang menangani stream multi-protokol secara terus-menerus; menaikkan kapasitasnya soal menambah consumer, bukan menulis ulang.'
			},
			{
				q: 'Bagaimana kalau internet di lokasi sering putus?',
				a: 'Itu diasumsikan sejak awal. Perangkat menyimpan data sementara di lokal, ingesti bersifat idempoten sehingga data yang dikirim ulang tidak menjadi ganda, dan data bolong ditampilkan apa adanya di dashboard — bukan diam-diam diinterpolasi jadi garis yang terlihat rapi.'
			},
			{
				q: 'Bisakah menghasilkan laporan untuk regulator?',
				a: 'Itu persis yang dikerjakan LecSens — pelanggaran ambang batas, cap waktu, dan jejak audit siapa menindaklanjuti apa. Laporannya dihasilkan dari data yang sama dengan dashboard, jadi keduanya tidak mungkin berbeda angka.'
			}
		],
		seo: {
			title: 'Jasa Pembuatan Sistem Monitoring IoT & Sensor — Alvin Vincent',
			description:
				'Jasa pembuatan backend IoT dan sistem monitoring sensor: ingesti MQTT multi-protokol, database time-series InfluxDB, alert saat data masuk, dan laporan siap regulator. Tiga platform sudah berjalan di industri.',
			keywords: [
				'jasa pembuatan sistem iot',
				'jasa monitoring sensor',
				'backend iot indonesia',
				'sistem monitoring kualitas air',
				'developer iot surabaya',
				'database time series influxdb'
			]
		}
	},

	'ai-integration': {
		title: 'Integrasi AI / LLM',
		description:
			'Fitur LLM yang benar-benar menyatu dengan backend — RAG, vector search, output terstruktur, dengan fallback dan batas biaya.',
		longDescription:
			'Demonya bagian yang mudah. Fitur LLM baru menjadi fitur sungguhan ketika ia punya batas biaya, punya fallback untuk hari ketika penyedianya membalas 503, punya keluaran yang bisa diurai sistem Anda tanpa menebak-nebak, dan punya jawaban jujur untuk apa yang terjadi saat modelnya salah dengan penuh percaya diri. Bagian itulah yang saya bangun: retrieval yang menyebutkan sumbernya, lapisan yang tidak terikat satu penyedia, dan pencatatan biaya per tenant supaya tagihannya tidak pernah jadi kejutan.',
		features: [
			'RAG dengan retrieval yang bisa diperiksa — setiap jawaban dapat ditelusuri ke potongan sumbernya',
			'Lapisan penyedia yang bisa ditukar beserta fallback, sehingga gangguan vendor hanya menurunkan fitur, bukan mematikan produk',
			'Output terstruktur yang divalidasi terhadap skema sebelum masuk ke bagian lain sistem Anda',
			'Pencatatan biaya per tenant dengan plafon tegas, bukan kejutan di akhir bulan',
			'Set evaluasi dari dokumen asli Anda, sehingga perubahan kualitas terukur, bukan sekadar terasa'
		],
		process: [
			'Putuskan dengan jujur apakah kasusnya memang butuh LLM — kadang pencarian biasa atau aturan sederhana lebih tepat',
			'Bangun pipeline retrieval: pemotongan dokumen, embedding, dan vector store di sekitar data Anda',
			'Integrasikan dengan validasi, fallback, dan batas biaya sejak commit pertama',
			'Evaluasi dengan kasus nyata, setel ulang, lalu deploy dengan pemantauan kualitas sekaligus biaya'
		],
		faq: [
			{
				q: 'Berapa biaya bulanan menjalankan fitur AI seperti ini?',
				a: 'Tergantung volume dan modelnya, tapi angkanya tidak boleh jadi misteri. Saya pasang pencatatan biaya per permintaan dan per tenant sejak awal berikut plafon tegas, sehingga Anda bisa melihat pertukaran antara kualitas model dan pengeluaran sebelum memutuskan.'
			},
			{
				q: 'Bisakah dipakai untuk dokumen internal tanpa datanya bocor keluar?',
				a: 'Bisa. Retrieval berjalan di vector store milik Anda sendiri, dan lapisan penyedianya bisa ditukar — termasuk ke model yang di-host sendiri kalau datanya memang tidak boleh keluar dari infrastruktur Anda. Batasan seperti itu sebaiknya disebut sebelum perancangan, bukan sesudah.'
			},
			{
				q: 'Bagaimana kalau modelnya memberi jawaban yang salah?',
				a: 'Sistemnya dirancang untuk itu. Keluaran divalidasi terhadap skema sehingga respons yang rusak tertangkap, bukan tersimpan; jawaban menyertakan sumbernya supaya bisa dicek manusia; dan kasus berkeyakinan rendah dialihkan ke jalur cadangan alih-alih dipaksakan menebak.'
			}
		],
		seo: {
			title: 'Jasa Integrasi AI & LLM (RAG, Vector Search) — Alvin Vincent',
			description:
				'Jasa integrasi AI dan LLM untuk sistem produksi, bukan sekadar demo: RAG dengan sumber yang bisa ditelusuri, fallback antar penyedia, output tervalidasi skema, dan plafon biaya per tenant.',
			keywords: [
				'jasa integrasi ai',
				'integrasi llm indonesia',
				'jasa pembuatan chatbot rag',
				'developer ai backend',
				'vector search indonesia',
				'konsultan llm freelance'
			]
		}
	},

	devops: {
		title: 'DevOps & Deployment',
		description:
			'Docker, CI/CD, pemindaian keamanan, deploy tanpa downtime — pekerjaan tidak keren yang membuat pager tetap diam.',
		longDescription:
			'Proses deploy yang hanya dipahami satu orang adalah gangguan yang sedang menunggu orang itu ambil cuti. Saya menggantinya dengan sesuatu yang tertulis dan bisa diulang: container yang hasil build-nya sama di mesin mana pun, pipeline yang menolak mengirim kode gagal test, dan rollback yang cukup satu perintah alih-alih satu panggilan telepon. Tidak ada bagian yang keren dari ini. Tapi semuanya adalah pembeda antara insiden yang selesai lima menit dan insiden yang menghabiskan satu malam.',
		features: [
			'Build Docker multi-stage — image kecil, hasilnya sama di mesin mana pun',
			'CI/CD yang menjalankan test, linting, dan pemindaian keamanan (Trivy, gosec) sebelum apa pun dirilis',
			'Deploy tanpa downtime dengan health check dan rollback satu perintah',
			'Penyiapan server Linux, routing Nginx atau Traefik, TLS, dan Cloudflare tunnel',
			'Monitoring dan alert yang menyala sebelum pengguna Anda yang memberi tahu'
		],
		process: [
			'Audit bagaimana deploy terjadi hari ini, termasuk langkah-langkah yang hanya ada di kepala seseorang',
			'Bungkus ke container dan pastikan build-nya bisa diulang sebelum mengubah apa pun yang lain',
			'Pasang pipeline-nya: test, pemindaian, deploy bertahap, jalur rollback',
			'Tambahkan monitoring, lalu dokumentasikan semuanya supaya tetap hidup tanpa saya'
		],
		faq: [
			{
				q: 'Deploy kami masih manual dan menegangkan. Mulainya dari mana?',
				a: 'Dari menuliskan apa yang sebenarnya terjadi sekarang, termasuk langkah-langkah yang tidak pernah didokumentasikan. Tidak ada yang diotomatiskan sebelum bisa diulang secara manual, karena mengotomatiskan proses yang tidak dipahami siapa pun hanya membuat kegagalannya datang lebih cepat.'
			},
			{
				q: 'Apakah kami butuh Kubernetes?',
				a: 'Biasanya tidak. Sebagian besar proyek yang saya temui lebih cocok dengan Docker Compose di server yang dikonfigurasi dengan benar, dan saya akan mengatakannya alih-alih menjual cluster. Kubernetes baru sepadan dengan kerumitannya pada skala yang akan Anda sadari sendiri saat sampai.'
			},
			{
				q: 'Bisa memakai server dan penyedia cloud yang sudah kami punya?',
				a: 'Bisa — semuanya berjalan di infrastruktur dan akun Anda. Saya pernah menangani server Linux polos, berbagai penyedia VPS, dan deployment di balik Cloudflare; tidak ada bagian di sini yang mengunci Anda ke satu vendor.'
			}
		],
		seo: {
			title: 'Jasa DevOps: Docker, CI/CD & Deploy Tanpa Downtime — Alvin Vincent',
			description:
				'Jasa DevOps untuk tim yang proses deploy-nya masih ada di kepala satu orang: build Docker yang bisa diulang, CI/CD dengan pemindaian keamanan, rollback satu perintah, dan monitoring yang memberi tahu lebih dulu.',
			keywords: [
				'jasa devops',
				'jasa setup docker',
				'jasa ci cd pipeline',
				'manajemen server linux',
				'jasa deploy aplikasi',
				'devops freelance indonesia'
			]
		}
	},

	'full-stack-web': {
		title: 'Pengembangan Web Full Stack',
		description:
			'Satu penanggung jawab dari database sampai antarmuka — full stack yang berat di backend, dengan batasnya disebut di depan, bukan ditemukan di tengah jalan.',
		longDescription:
			'Membagi produk kecil ke satu freelancer backend dan satu freelancer frontend sering lebih mahal daripada hemat: keduanya tidak pernah benar-benar sepakat soal kontrak, dan Anda yang berakhir jadi kurir di antara mereka. Untuk proyek seukuran itu saya ambil semuanya — skema, API, antarmuka, deploy — sehingga hanya ada satu orang untuk ditanya dan satu orang yang bertanggung jawab saat ada yang rusak. Titik berat saya tetap di backend, dan antarmuka yang saya bangun mencerminkan itu: cepat, aksesibel, terstruktur rapi dengan SvelteKit atau Next.js, dan jujur bahwa itu hasil rekayasa, bukan art direction.',
		features: [
			'Satu kontrak dari database sampai antarmuka — tidak ada celah integrasi antara dua freelancer',
			'Frontend SvelteKit atau Next.js yang dirender di server, sehingga cepat dibuka dan bisa dibaca mesin pencari',
			'Backend Go atau Python yang sama dengan yang saya bangun terpisah, bukan versi tipisnya',
			'Autentikasi, peran, dan halaman admin dibangun sekali lalu dipakai kedua sisi',
			'Ter-deploy, terpantau, dan diserahkan berikut dokumentasi untuk siapa pun yang merawatnya nanti'
		],
		process: [
			'Sepakati apa yang harus bisa dilakukan produknya, lalu pangkas ke apa yang benar-benar dibutuhkan versi pertama',
			'Rancang skema dan kontrak API lebih dulu — antarmuka mengikuti data, bukan sebaliknya',
			'Bangun kedua sisi per potongan: setiap minggu ada yang jalan dan ter-deploy, bukan satu pengungkapan besar',
			'Deploy, pantau, serahkan — termasuk walkthrough untuk siapa pun yang mewarisinya'
		],
		boundaries: {
			intro:
				'"Full stack" dipakai orang untuk berarti segalanya, dan justru karena itu ia tidak berguna untuk memutuskan apakah seseorang layak disewa. Ini garis yang sebenarnya, supaya Anda tahu sekarang dan bukan tiga minggu kemudian.',
			mine: [
				'Skema database, migration, dan performa query',
				'Desain API, autentikasi, peran, dan logika bisnis',
				'Antarmuka SvelteKit / Next.js: form, tabel, dashboard, panel admin',
				'Layout responsif, aksesibilitas, dan Core Web Vitals',
				'Deployment, CI/CD, monitoring, dan dokumentasi serah terima'
			],
			partner: [
				'Identitas merek dan arah visual dari nol',
				'Ilustrasi, seni 3D, dan motion design sebagai disiplin tersendiri',
				'Penulisan naskah pemasaran panjang',
				'Aplikasi native iOS dan Android'
			]
		},
		faq: [
			{
				q: 'Cukup satu programmer full stack, atau kami perlu satu tim?',
				a: 'Untuk tool internal, dashboard, MVP, atau produk dengan segelintir peran pengguna, satu orang biasanya lebih cepat dan lebih murah — beban koordinasinya hilang. Begitu ada beberapa jalur kerja paralel atau ambisi desain yang serius, Anda butuh tim, dan saya akan bilang kalau Anda sudah melewati garis itu.'
			},
			{
				q: 'Frontend-nya pakai apa?',
				a: 'SvelteKit kalau saya yang memilih, Next.js kalau tim Anda sudah terbiasa dengan React. Keduanya dirender di server, dan itu penting kalau halamannya perlu ditemukan lewat pencarian, bukan hanya dipakai setelah login.'
			},
			{
				q: 'Bisa bekerja dengan desainer yang sudah kami punya?',
				a: 'Justru itu susunan yang saya sarankan untuk apa pun yang menghadap pelanggan. Beri saya file Figma-nya dan saya bangun dengan benar; yang tidak saya lakukan adalah mengarang identitas mereknya sambil sekaligus merekayasa sistemnya.'
			},
			{
				q: 'Bagaimana kalau nanti kami harus merekrut tim sungguhan?',
				a: 'Maka kodenya harus sudah siap untuk mereka, dan itulah sebabnya bagian-bagian membosankan tidak bisa ditawar: batas yang jelas, test, migration, dan dokumentasi. Ukuran keberhasilan serah terimanya adalah apakah developer berikutnya bisa merilis di minggu pertama tanpa menelepon saya.'
			}
		],
		seo: {
			title: 'Jasa Programmer Full Stack (Berat di Backend) — Alvin Vincent',
			description:
				'Programmer full stack freelance dengan titik berat di backend: service Go atau Python, antarmuka SvelteKit atau Next.js, di-deploy dan didokumentasikan oleh satu penanggung jawab — lengkap dengan batasannya disebut di depan.',
			keywords: [
				'programmer full stack',
				'jasa programmer full stack',
				'full stack developer indonesia',
				'freelance full stack surabaya',
				'jasa pembuatan aplikasi web',
				'jasa pembuatan mvp'
			]
		}
	}
};

export const serviceCopy: Record<Locale, Record<string, ServiceCopy>> = {
	en: enCopy,
	id: idCopy
};

export function copyFor(loc: Locale, serviceId: string): ServiceCopy | undefined {
	return serviceCopy[loc][serviceId] ?? serviceCopy.en[serviceId];
}
