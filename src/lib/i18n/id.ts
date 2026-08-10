import type { Dict } from './en';

/**
 * Bahasa Indonesia — mirrors `en.ts` 1:1.
 * Tech vocabulary (API, deploy, backend, time-series) stays in English on
 * purpose; that is how Indonesian engineers actually talk.
 */
export const id: Dict = {
	seo: {
		home: {
			title: 'Programmer Backend & Full Stack Surabaya — Alvin Vincent',
			description:
				'Programmer backend dan full stack developer freelance di Surabaya. Jasa pembuatan REST API (Golang, Python), sistem monitoring IoT, integrasi AI/LLM, dan deploy produksi. Dari skema database sampai antarmuka yang dipakai klien.',
			keywords: [
				'programmer full stack',
				'programmer backend',
				'jasa pembuatan API',
				'jasa pembuatan backend',
				'full stack developer indonesia',
				'freelance programmer surabaya',
				'jasa pembuatan aplikasi web',
				'golang developer indonesia'
			]
		},
		archive: {
			title: 'Arsip Sistem Live — Backend Produksi oleh Alvin Vincent',
			description:
				'Sistem yang sedang berjalan di produksi: monitoring IoT industri, gateway SSO multi-tenant, dan platform kepatuhan lingkungan. Lengkap dengan catatan arsitektur, stack, dan URL live-nya.',
			keywords: [
				'portofolio backend',
				'contoh sistem produksi',
				'microservices golang',
				'platform monitoring IoT',
				'API gateway'
			]
		}
	},

	nav: {
		work: 'Karya',
		services: 'Layanan',
		stack: 'Stack',
		about: 'Tentang',
		archive: 'Live',
		contact: 'Kontak',
		openMenu: 'Buka menu',
		closeMenu: 'Tutup menu',
		clockTitle: 'Waktu lokal operator',
		switchLocale: 'Switch to English'
	},

	loader: {
		header: 'Portofolio — 2026'
	},

	hero: {
		role: 'Programmer Backend / Full Stack',
		headingLabel:
			'Alvin Vincent — programmer backend dan full stack developer di Surabaya, Indonesia',
		availability: 'Terbuka untuk freelance — 2026',
		tagline:
			'Saya membangun lapisan yang tidak pernah Anda lihat: API, pipeline data, dan skrip deploy yang menjaga semuanya tetap jujur. Kalau proyeknya butuh sisi layar juga, itu saya kerjakan.',
		location: 'Surabaya, Indonesia — melayani seluruh dunia',
		scroll: 'Gulir',
		cursorView: 'Lihat'
	},

	marquee: 'Programmer Backend — Full Stack Developer — Terbuka untuk freelance —',

	projects: {
		index: '01',
		kicker: 'Sistem Terpasang',
		helixHint: 'Gulir untuk menyusuri pita',
		helixLine: 'Pita karya,\nberjalan di lapangan.',
		count: 'sistem',
		readout: 'platform sungguhan, berjalan di lapangan saat ini',
		status: { live: 'Live', 'field-test': 'Uji lapangan', archived: 'Arsip' },
		fieldNotes: 'Catatan lapangan',
		architecture: 'Arsitektur',
		keyDecisions: 'Keputusan kunci',
		stack: 'Stack',
		seeLive: 'Lihat langsung',
		entries: {
			pome: {
				description:
					'Platform microservices yang memantau sensor limbah pabrik kelapa sawit secara real time: ingesti multi-protokol, otomasi alur, dan inferensi ML — semuanya di belakang gateway Kong.',
				problem:
					'Sensor lapangan berbicara lima protokol berbeda (MQTT, CoAP, Modbus, Serial, WebSocket). Platform harus menelan semuanya, menjalankan ML di atas stream, dan tetap mudah di-debug saat ada yang rewel jam 2 pagi.',
				architecture:
					'Layanan Go (Gin) dengan Clean Architecture, plus layanan ML Python yang diajak bicara lewat gRPC. Kong berdiri di depan cluster, RabbitMQ membawa event async, PostgreSQL menyimpan fakta dan InfluxDB menelan derasnya data. Berjalan di Kubernetes, diawasi Prometheus dan Grafana.',
				keyDecisions: [
					'Inferensi ML diisolasi di layanan gRPC sendiri — model bisa redeploy tanpa menyentuh API',
					'RabbitMQ untuk event async, sehingga lonjakan sensor tidak pernah memblokir jalur request',
					'PostgreSQL untuk metadata + InfluxDB untuk time-series: tiap database mengerjakan keahliannya',
					'Docker multi-stage build dan manifes k8s; alert Prometheus menyala sebelum pengguna sadar'
				]
			},
			portal: {
				description:
					'Pintu depan untuk armada aplikasi IoT (LecSens, POME, Dronemeq): single sign-on, organisasi multi-tenant, dan RBAC granular di belakang Traefik dan Kong.',
				problem:
					'Beberapa produk IoT, satu login. Setiap request harus menjawab "kamu siapa, organisasi mana, boleh menyentuh apa" — tanpa tiap aplikasi menulis ulang auth dari nol.',
				architecture:
					'Traefik menerminasi TLS dan merutekan ke Kong (verifikasi JWT, rate limiting, ACL). Di belakangnya berdiri microservices Go untuk manajemen user, manajemen akses, service registry, dan SSO — masing-masing memiliki database PostgreSQL sendiri via GORM.',
				keyDecisions: [
					'Database-per-service, sehingga tenant dan izin berevolusi secara independen',
					'Kong menegakkan JWT dan rate limit di tepi — layanan tetap ramping',
					'Service registry menjaga metadata aplikasi tetap dinamis; aplikasi IoT baru merapat tanpa redeploy',
					'Alur undangan dan langganan terpasang di manajemen tenant'
				]
			},
			lecsens: {
				description:
					'Platform backend untuk kepatuhan sensor lingkungan: manajemen aset, deteksi pelanggaran, dan pelaporan untuk regulator di atas data kualitas air yang hidup.',
				problem:
					'Data sensor frekuensi tinggi lintas banyak tenant, dengan satu aturan keras: saat pembacaan melewati ambang regulasi, orang yang tepat harus tahu — lengkap dengan jejak audit.',
				architecture:
					'Layanan Go dengan Clean Architecture: modul manajemen aset, manajemen user, regulator, dan pelanggaran. PostgreSQL untuk data operasional, InfluxDB untuk stream sensor, Redis untuk sesi dan jalur panas.',
				keyDecisions: [
					'JWT + RBAC dengan isolasi per-tenant dirancang sejak hari pertama',
					'Mesin pelanggaran mengevaluasi ambang saat ingest — bukan lewat batch tengah malam',
					'Cache Redis memangkas query dashboard umum sekitar 40%',
					'Pipeline CI/CD menjalankan pemindaian keamanan Trivy dan gosec di setiap build'
				]
			}
		}
	},

	services: {
		index: '02',
		kicker: 'Layanan',
		readout: 'enam hal yang bisa saya bangun untuk Anda. tanpa basa-basi.',
		specSheet: 'Lembar spesifikasi',
		request: 'Ajukan',
		cursorRead: 'Baca',
		cursorAsk: 'Tanya',
		prefill: (title: string) =>
			`Halo Alvin — saya sedang melihat layanan ${title} Anda. Ini yang sedang saya bangun: `,
		customProject: 'proyek custom',
		openSlot: {
			label: 'Slot kosong',
			body: 'Dicadangkan untuk proyek Anda. Kalau butuh API, pipeline, atau deploy yang tidak membangunkan siapa pun tengah malam — merapatnya di sini.',
			cta: 'Klaim slot ini'
		},
		entries: {
			'backend-dev': {
				title: 'Pengembangan Backend',
				description:
					'API dan layanan yang dibangun untuk dirawat, bukan sekadar dirilis — Clean Architecture, test, dan log yang benar-benar bisa dibaca.'
			},
			'api-design': {
				title: 'Desain & Integrasi API',
				description:
					'Endpoint REST dengan auth, rate limit, dan dokumentasi — tim web atau mobile Anda tinggal colok dan berhenti memikirkannya.'
			},
			'iot-data': {
				title: 'Sistem IoT & Data',
				description:
					'Pipeline sensor-ke-dashboard: MQTT masuk, penyimpanan time-series, alert keluar. Dibangun dari deployment industri sungguhan.'
			},
			'ai-integration': {
				title: 'Integrasi AI / LLM',
				description:
					'Fitur LLM yang terpasang di backend sungguhan — RAG, vector search, output terstruktur, dengan fallback dan plafon biaya.'
			},
			devops: {
				title: 'DevOps & Deployment',
				description:
					'Docker, CI/CD, pemindaian keamanan, deploy tanpa downtime — pekerjaan tak glamor yang membuat pager tetap sunyi.'
			},
			'full-stack-web': {
				title: 'Pengembangan Web Full Stack',
				description:
					'Satu orang dari skema sampai layar: PostgreSQL, API Go atau Python, dan front end SvelteKit/Next.js yang bicara dengan benar ke API-nya.'
			}
		}
	},

	archive: {
		back: 'kembali ke beranda',
		kicker: 'Arsip sistem live',
		headingA: 'Sistem',
		headingB: 'Terpasang',
		intro:
			'Sistem yang sedang berjalan, catatan arsitektur, dan bukti lapangan dari lapisan backend yang saya bangun dan saya operasikan.',
		statusLabel: 'archive.status',
		status: {
			online: 'sistem online',
			featured: 'unggulan',
			classification: 'klasifikasi',
			access: 'akses',
			accessValue: 'di balik SSO',
			classificationValue: 'iot industri / ml'
		},
		ssoGated: 'di balik SSO',
		online: 'online',
		openDemo: 'Buka demo live',
		fullDossier: 'Dosir lengkap',
		loginRequired: 'perlu login',
		liveConsole: 'konsol live',
		flowKicker: 'Jalur sinyal',
		flowHeadingA: 'Dari sinyal sensor',
		flowHeadingB: 'ke keputusan pengolahan',
		fleetKicker: 'Armada',
		fleetHeading: 'Arsip proyek',
		fleetIntro:
			'Semua sistem di bawah ini sedang berjalan di lapangan sekarang. Konsol produksinya berada di balik single sign-on Portal — tautannya membuka gerbang login sungguhan; tangkapan layar menunjukkan isinya.',
		notesKicker: 'Keputusan',
		notesHeading: 'Catatan arsitektur',
		notesIntro: 'Keputusan backend yang menjaga sistem-sistem ini tetap jujur.',
		ctaKicker: 'Buka kanal',
		ctaHeading: 'Butuh sistem seperti ini?',
		ctaBody:
			'Ceritakan apa yang sedang Anda bangun. Saya bisa bantu merancang backend, alur data, jalur deployment, dan pengaman operasionalnya.',
		ctaButton: 'Buka kanal',

		featured: {
			label: 'SYS-01 · SISTEM LIVE',
			subtitle: 'Intelijen Risiko Limbah Cair',
			description:
				'Pemantauan real-time untuk data limbah cair pabrik kelapa sawit: ingesti sensor, pemrosesan backend, penyimpanan time-series, visibilitas dashboard, dan rekomendasi pengolahan berbantuan ML.',
			embedFallback:
				'Pratinjau live diblokir kebijakan browser. Buka POME Guardian langsung.',
			embedTitle: 'POME Guardian — pratinjau sistem live'
		},

		embed: {
			online: 'online',
			linking: 'menyambung',
			blocked: 'diblokir',
			connecting: 'Menyambungkan tautan live…',
			refused: 'Embed ditolak',
			openSystem: 'Buka POME Guardian',
			retry: 'Coba lagi',
			policyNote: 'Embed bisa diblokir kebijakan browser',
			openFull: 'Buka sistem penuh'
		},

		flow: {
			sensor: { label: 'Sensor', readout: 'membaca pH · COD · TSS' },
			edge: { label: 'Perangkat edge', readout: 'mengumpulkan + menahan bacaan' },
			backend: { label: 'Backend', readout: 'memvalidasi + merutekan event' },
			store: { label: 'Penyimpanan', readout: 'fakta di postgres · stream di influx' },
			dashboard: { label: 'Dashboard', readout: 'panel menyala langsung' },
			ml: { label: 'Inferensi ML', readout: 'merekomendasikan pengolahan' }
		},

		projectNotes: {
			pome: 'Microservices Go + Python di belakang Kong; RabbitMQ untuk async, Postgres dan Influx dipisah sesuai tugasnya.',
			portal: 'Auth di tepi lewat Traefik → Kong; satu database per layanan supaya tiap tenant bisa berkembang sendiri-sendiri.',
			lecsens: 'Layanan Go ber-Clean Architecture; ambang batas dievaluasi saat data masuk, bukan lewat batch.'
		},

		classification: {
			pome: 'IoT Industri / ML',
			portal: 'SSO Multi-Tenant',
			lecsens: 'Pemantauan Lingkungan'
		},

		notes: {
			BOUNDARY: {
				tag: 'BATAS',
				title: 'ML diisolasi di balik gRPC',
				body: 'Inferensi tinggal di layanan Python-nya sendiri. Model bisa dilatih ulang dan di-deploy ulang tanpa pernah menyentuh permukaan API Go.'
			},
			BACKPRESSURE: {
				tag: 'BACKPRESSURE',
				title: 'RabbitMQ meredam lonjakan sensor',
				body: 'Event async menjauhkan lonjakan ingesti dari jalur request, sehingga pabrik yang sedang riuh tidak pernah membuat dashboard tersendat.'
			},
			STORAGE: {
				tag: 'PENYIMPANAN',
				title: 'Database yang tepat untuk tiap tugas',
				body: 'PostgreSQL memegang fakta dan relasinya; InfluxDB menelan derasnya time-series berfrekuensi tinggi.'
			},
			EDGE: {
				tag: 'TEPI',
				title: 'Kong berdiri di depan cluster',
				body: 'Verifikasi JWT, rate limiting, dan ACL berjalan di gateway. Layanan tetap ramping dan fokus pada logika domain.'
			},
			OPS: {
				tag: 'OPS',
				title: 'Terpantau sebelum pengguna sadar',
				body: 'Prometheus + Grafana mengawasi platform di Kubernetes; alert menyala saat ada penyimpangan, sebelum ada yang membuka tiket.'
			}
		}
	},

	serviceDetail: {
		back: 'kembali ke layanan',
		specSheet: 'lembar spesifikasi',
		details: 'Rincian',
		stack: 'Stack',
		included: 'Yang Anda dapat',
		process: 'Alur kerjanya',
		boundariesTitle: 'Yang saya kerjakan — dan yang saya oper',
		boundariesMine: 'Saya kerjakan sendiri',
		boundariesPartner: 'Saya bawa spesialis',
		faqTitle: 'Pertanyaan yang sering ditanyakan klien',
		evidence: 'Bukti lapangan',
		evidenceReadout: 'Sistem yang sudah memakai layanan ini',
		ctaTitle: (title: string) => `Butuh ${title.toLowerCase()}?`,
		ctaBody:
			'Ceritakan apa yang sedang Anda bangun. Anda akan dapat jawaban jujur soal lingkup, waktu pengerjaan, dan apakah saya memang orang yang tepat untuk itu.',
		ctaButton: 'Buka kanal'
	},

	skills: {
		index: '03',
		kicker: 'Stack',
		readout: 'perkakas dinilai jujur — tidak ada skill bar 90% di sini',
		main: 'utama',
		mainTitle: 'Andalan harian',
		footnote: 'Dikalibrasi dari insiden produksi, bukan dari rasa percaya diri.',
		categories: {
			core: 'Bahasa Inti',
			database: 'Penyimpanan Data',
			infrastructure: 'Infra',
			ai: 'AI / LLM',
			tools: 'Praktik'
		},
		levels: {
			expert: { label: 'Andalan harian', hint: 'dipakai tanpa berpikir dua kali' },
			advanced: { label: 'Produksi', hint: 'pernah merilis dan merawat sistem sungguhan dengannya' },
			intermediate: { label: 'Lancar', hint: 'nyaman, tapi dokumentasi masih terbuka' },
			beginner: { label: 'Belajar', hint: 'sedang aktif naik level' }
		}
	},

	about: {
		index: '04',
		kicker: 'Tentang',
		statement:
			'Saya membangun lapisan yang membosankan-tapi-kritis — API, queue, skema, dan skrip deploy yang menjaga semuanya tetap jujur.',
		p1: 'Hampir setiap hari itu berarti layanan Go dan data yang dipindahkannya: PostgreSQL untuk fakta, InfluxDB untuk apa pun yang dikatakan sensor lima detik lalu, Redis supaya tidak ada yang perlu bertanya dua kali.',
		p2: 'Saya kuliah Informatika di ITS Surabaya dan merilis sistem sungguhan di sela-selanya — pemantauan IoT industri, gateway multi-tenant, layanan inferensi ML. Rancang, bangun, deploy: saya tinggal untuk satu putaran penuh.',
		p3: 'Saya bekerja full stack, dan saya lebih suka jujur soal artinya: bobotnya ada di backend, dan front end yang saya bangun adalah front end yang bicara ke backend itu — SvelteKit atau Next.js, tipenya mengikuti kontrak yang sama, tetap ringan di Android kelas menengah. Identitas brand, ilustrasi, dan copywriting panjang saya serahkan ke orang yang memang lebih jago di sana.',
		traits: [
			{ title: 'Desain Sistem', line: 'Clean Architecture — layanan yang hidup lebih lama dari penulis pertamanya.' },
			{ title: 'Keamanan Dulu', line: 'RBAC, JWT, isolasi tenant. Dikunci sebelum rilis, bukan sesudahnya.' },
			{ title: 'Pipeline Data', line: 'Time-series secepat sensor: ingest, simpan, alert.' },
			{ title: 'Rilis & Operasikan', line: 'CI/CD, container, monitoring. Ter-deploy artinya terpantau.' }
		],
		stats: [
			{ value: 3, label: 'Sistem dirilis' },
			{ value: 4, label: 'Tahun menekuni' },
			{ value: 5, label: 'Layanan backend' }
		]
	},

	experience: {
		index: '05',
		kicker: 'Log Karier',
		readout: 'changelog sang operator, entri tertua 2022',
		present: 'Sekarang',
		education: 'Pendidikan',
		nextEntry: 'Entri berikutnya — bisa jadi proyek Anda',
		entries: {
			'exp-1': {
				position: 'Backend Engineer',
				company: 'Backend Engineer Independen',
				location: 'Remote, Indonesia',
				description:
					'Merancang dan mengoperasikan sistem backend produksi dari ujung ke ujung — termasuk platform POME, Portal, dan LecSens di atas — dari skema pertama sampai deploy Kubernetes.',
				achievements: [
					'Membangun tiga platform IoT produksi seorang diri: arsitektur, implementasi, deployment, monitoring',
					'Mengirim REST API multi-tenant yang aman untuk ingesti dan visualisasi sensor real-time',
					'Memasang CI/CD dengan test otomatis, linting, dan pemindaian keamanan (Trivy, gosec) di setiap repo',
					'Berkolaborasi dengan developer frontend agar API mendarat di dashboard tanpa drama integrasi'
				]
			}
		},
		edu: {
			degree: 'Sarjana Komputer',
			field: 'Informatika',
			institution: 'Institut Teknologi Sepuluh Nopember (ITS)',
			note: 'Mata kuliah: Struktur Data & Algoritma, Sistem Basis Data, Sistem Operasi, Rekayasa Perangkat Lunak, Machine Learning'
		}
	},

	contact: {
		index: '06',
		kicker: 'Kanal terbuka',
		readout: 'rata-rata balasan < 24 jam · zona waktu WIB (UTC+7)',
		intro:
			'Punya sistem yang perlu dibangun — atau yang perlu diselamatkan? Pilih satu kanal. Semuanya saya baca sendiri.',
		responseLine: 'Rata-rata balasan di bawah 24 jam pada hari kerja',
		cursorOpen: 'Buka',
		cursorSend: 'Kirim',
		linkedin: { kicker: 'LinkedIn — profil terverifikasi' },
		form: {
			name: 'Nama',
			namePlaceholder: 'Ada Lovelace',
			email: 'Email',
			emailPlaceholder: 'anda@perusahaan.com',
			service: 'Layanan',
			generalInquiry: 'Pertanyaan umum',
			message: 'Pesan',
			messagePlaceholder: 'Apa yang sedang Anda bangun? Skala kasar, linimasa, hal aneh apa pun tentangnya...',
			submit: 'Kirim pesan',
			submitting: 'Mengirim…',
			success: 'Diterima. Saya balas dalam sehari — biasanya lebih cepat.',
			error: 'Gagal terkirim. Email saya langsung:'
		}
	},

	footer: {
		availability: 'Terbuka untuk freelance — 2026',
		headline: 'Mari bicara',
		cursorMail: 'Surat',
		hold: 'Tahan untuk menyalin email',
		held: 'Tersalin',
		copied: 'Email tersalin ke clipboard',
		copyFailed: 'Gagal menyalin — emailnya ada di bawah',
		rights: 'Surabaya, ID'
	}
};
