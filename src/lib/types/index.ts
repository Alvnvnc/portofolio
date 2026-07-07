// ========================================
// Portfolio Data Types
// ========================================

/** Short semantic icon key (e.g. "stack", "chip") — mapped to markup per-section */
export type IconName = string;

export interface PersonalInfo {
	name: string;
	fullName: string;
	title: string;
	tagline: string;
	location: string;
	email: string;
	linkedin?: string;
	website?: string;
	/** Short availability line shown in the hero + footer */
	availability?: string;
}

export interface Skill {
	name: string;
	category: SkillCategory;
	level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
	/** Marks a daily-driver tool — gets the "MAIN" tag in the loadout */
	primary?: boolean;
}

export type SkillCategory = 'core' | 'database' | 'infrastructure' | 'ai' | 'tools';

export type ProjectStatus = 'live' | 'field-test' | 'archived';

export interface Project {
	id: string;
	/** Console designation, e.g. "SYS-01" */
	code: string;
	title: string;
	classification: string;
	status: ProjectStatus;
	description: string;
	problem: string;
	architecture: string;
	keyDecisions: string[];
	techStack: string[];
	/** All current systems are private client work — only public demos/docs get linked */
	links?: {
		demo?: string;
		docs?: string;
	};
	/** Production deployment URL (may be behind SSO — see `gated`) */
	liveUrl?: string;
	/** True when the deployment sits behind Portal SSO: opening it lands on a login gate */
	gated?: boolean;
	/** Public, embeddable demo (frame-ancestors allows this site) — used for the live iframe */
	demoUrl?: string;
	/** Screenshot proof paths, shown when the live system can't be iframe-embedded */
	shots?: string[];
	thumbnail?: string;
}

/** Featured live system on the /portofolio archive — the strongest live proof */
export interface FeaturedSystem {
	/** Console designation strip, e.g. "SYS-01 · LIVE SYSTEM" */
	label: string;
	name: string;
	subtitle: string;
	description: string;
	techStack: string[];
	/** Live deployment to embed in the CRT frame */
	embedUrl: string;
	/** Copy shown when the browser blocks the iframe */
	embedFallback: string;
	/** Links back to the matching entry in `projects` for the deep dossier */
	projectId: string;
}

/** One node in the sensor → decision motion narrative */
export interface SystemFlowStep {
	id: string;
	/** Zero-padded order, e.g. "01" */
	index: string;
	label: string;
	/** Short terminal readout under the node label */
	readout: string;
	icon: IconName;
}

/** A short, scannable backend decision in the architecture-notes dossier */
export interface ArchitectureNote {
	tag: string;
	title: string;
	body: string;
}

export interface Experience {
	id: string;
	company: string;
	position: string;
	period: {
		start: string;
		end: string | 'Present';
	};
	location: string;
	description: string;
	achievements: string[];
	techStack: string[];
}

export interface Education {
	institution: string;
	degree: string;
	field: string;
	period: {
		start: string;
		end: string;
	};
	gpa?: string;
	achievements?: string[];
}

export interface Service {
	id: string;
	/** Catalog designation, e.g. "SVC-01" */
	code: string;
	title: string;
	description: string;
	icon: IconName;
	techStack: string[];
	longDescription?: string;
	features?: string[];
	process?: string[];
	relatedProjects?: string[];
	seo?: {
		title: string;
		description: string;
		keywords?: string[];
	};
}

// ========================================
// UI Component Types
// ========================================

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface NavItem {
	id: string;
	label: string;
	href: string;
}

// ========================================
// Section Types (for scroll spy + headers)
// ========================================

export type SectionId =
	| 'hero'
	| 'about'
	| 'services'
	| 'skills'
	| 'projects'
	| 'experience'
	| 'contact';

export interface SectionMeta {
	id: SectionId;
	/** Zero-padded console index, e.g. "02" */
	index: string;
	title: string;
	/** Terminal readout line under the section title */
	readout: string;
}
