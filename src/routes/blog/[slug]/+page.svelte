<script>
	import { page } from '$app/stores';
	import { Calendar, Clock, ArrowLeft } from 'lucide-svelte';
	
	// In a real app, this would fetch the post based on the slug
	const post = {
		slug: 'introducing-zapstore',
		title: 'Introducing Zapstore: The Open App Marketplace',
		author: 'Zapstore Team',
		date: '2024-01-15',
		readTime: '5 min read',
		category: 'Announcement',
		content: `
We're thrilled to announce Zapstore, a revolutionary approach to app distribution that puts users and developers first. Built on the nostr protocol, Zapstore enables direct connections between creators and their communities without intermediaries.

## Why We Built Zapstore

The current app distribution landscape is broken. Centralized platforms take massive cuts, impose arbitrary restrictions, and can remove apps at will. Developers lose direct relationships with their users, and users lose freedom to choose their software.

Zapstore is built on three core principles:

1. **User Freedom**: You decide what runs on your device
2. **Developer Independence**: Direct relationships with your audience
3. **Cryptographic Trust**: Mathematical proof, not corporate promises

## How It Works

Zapstore leverages the nostr protocol to create a decentralized marketplace where:

- Apps are events: Each app listing is a cryptographically signed nostr event
- Discovery is social: Follow developers you trust and see what your network recommends
- Verification is automatic: Every download is cryptographically verified
- Payments are direct: Support developers with direct micropayments

## What's Next

We're just getting started. Over the coming months, we'll be:

- Expanding our app catalog
- Launching developer tools and SDKs
- Building out social discovery features
- Adding support for more platforms

Join us in building the open future of app distribution. Whether you're a developer tired of platform restrictions or a user seeking freedom of choice, Zapstore is here for you.

<p><strong>Ready to experience app distribution as it should be?</strong> <a href="/">Get started with Zapstore today</a></p>
		`
	};
</script>

<svelte:head>
	<title>{post.title} - Zapstore Blog</title>
	<meta name="description" content={post.content?.substring(0, 160) + '...'} />
</svelte:head>

<article class="max-w-4xl mx-auto">
	<div class="mb-8">
		<a href="/blog" class="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
			<ArrowLeft class="h-4 w-4 mr-2" />
			Back to Blog
		</a>
		
		<div class="space-y-4">
			<div class="flex items-center space-x-4 text-sm text-muted-foreground">
				<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
					{post.category}
				</span>
				<span class="flex items-center">
					<Calendar class="h-4 w-4 mr-1" />
					{new Date(post.date).toLocaleDateString('en-US', { 
						month: 'long', 
						day: 'numeric', 
						year: 'numeric' 
					})}
				</span>
				<span class="flex items-center">
					<Clock class="h-4 w-4 mr-1" />
					{post.readTime}
				</span>
			</div>
			
			<h1 class="text-4xl sm:text-5xl font-black">
				{post.title}
			</h1>
			
			<p class="text-muted-foreground">
				By {post.author}
			</p>
		</div>
	</div>
	
	<div class="prose prose-invert prose-lg max-w-none">
		{@html post.content.split('\n').map(paragraph => {
			if (paragraph.startsWith('## ')) {
				return `<h2 class="text-2xl font-bold mt-8 mb-4">${paragraph.substring(3)}</h2>`;
			} else if (paragraph.trim().match(/^\d\./)) {
				return `<li class="ml-6">${paragraph.substring(3)}</li>`;
			} else if (paragraph.includes('[') && paragraph.includes(']')) {
				return paragraph.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary/80 transition-colors">$1</a>');
			} else if (paragraph.trim()) {
				return `<p class="mb-4">${paragraph}</p>`;
			}
			return '';
		}).join('')}
	</div>
</article> 