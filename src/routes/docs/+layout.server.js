import { generateNavigation } from '$lib/server/docs.js';

// export const prerender = true;

export async function load() {
	const navigation = await generateNavigation();
	
	return {
		navigation
	};
} 