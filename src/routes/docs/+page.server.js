import { getMarkdownContent } from '$lib/server/docs.js';
import { error } from '@sveltejs/kit';

// export const prerender = true;

export async function load() {
	try {
		// Load the index.md file for the root docs page
		const content = await getMarkdownContent('index');
		
		if (!content) {
			throw error(404, 'Documentation index not found');
		}
		
		return {
			content
		};
	} catch (err) {
		console.error('Error loading docs index:', err);
		throw err;
	}
} 