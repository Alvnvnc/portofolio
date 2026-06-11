import type { PixelIconName } from '$lib/components/ui/PixelIcon.svelte';

// ========================================
// Portfolio Data Types
// ========================================

export interface PersonalInfo {
	name: string;
	fullName: string;
	title: string;
	tagline: string;
	location: string;
	email: string;
	linkedin?: string;
	website?: string;
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
	thumbnail?: string;
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
	icon: PixelIconName;
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
