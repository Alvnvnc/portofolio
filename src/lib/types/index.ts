// ========================================
// Portfolio Data Types
// ========================================

export interface PersonalInfo {
	name: string;
	title: string;
	tagline: string;
	location: string;
	email: string;
	github?: string;
	linkedin?: string;
	website?: string;
}

export interface Skill {
	name: string;
	category: SkillCategory;
	level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
	icon?: string;
}

export type SkillCategory = 'core' | 'database' | 'infrastructure' | 'ai' | 'tools';

export interface Project {
	id: string;
	title: string;
	description: string;
	problem: string;
	architecture: string;
	keyDecisions: string[];
	techStack: string[];
	links?: {
		github?: string;
		demo?: string;
		docs?: string;
	};
	featured: boolean;
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
	title: string;
	description: string;
	icon: string;
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
// Character Animation Types
// ========================================

export type CharacterState = 'idle' | 'walk' | 'code' | 'inspect' | 'wave';

export interface SpriteConfig {
	src: string;
	frameWidth: number;
	frameHeight: number;
	frameCount: number;
	fps: number;
	scale?: number;
}

export interface CharacterConfig {
	states: Record<CharacterState, SpriteConfig>;
	defaultState: CharacterState;
}

// ========================================
// UI Component Types
// ========================================

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface NavItem {
	id: string;
	label: string;
	href: string;
	icon?: string;
}

// ========================================
// Section Types (for scroll spy)
// ========================================

export type SectionId = 'hero' | 'about' | 'services' | 'skills' | 'projects' | 'experience' | 'contact';

export interface SectionMeta {
	id: SectionId;
	title: string;
	subtitle?: string;
	systemName: string; // Metafora sistem (API Gateway, Services, etc.)
}
