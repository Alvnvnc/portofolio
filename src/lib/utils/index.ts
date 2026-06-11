import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with Tailwind CSS class merging
 * Used throughout the application for conditional styling
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

/**
 * Creates a delay promise for animations
 */
export function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Clamps a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

/**
 * Formats a date in a pixel-friendly format
 */
export function formatDate(date: Date | string): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short'
	});
}

/**
 * Generates a random ID for unique keys
 */
export function generateId(prefix: string = 'id'): string {
	return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}
