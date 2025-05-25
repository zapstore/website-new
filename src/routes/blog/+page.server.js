import { getAllBlogPosts } from '$lib/server/blog.js';

// export const prerender = true;

export async function load() {
	const posts = await getAllBlogPosts();
	
	return {
		posts
	};
} 