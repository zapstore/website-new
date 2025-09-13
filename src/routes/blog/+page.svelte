<script>
	export let data;
</script>

<svelte:head>
	<title>Blog - Zapstore</title>
</svelte:head>

<header class="mb-12">
	<h1 class="text-4xl font-bold tracking-tight mb-4">Blog</h1>
	<p class="text-lg text-muted-foreground">
		Latest news, updates and insights from Zapstore
	</p>
</header>

<div class="grid gap-8">
	{#each data.posts as post}
		<article class="border-b border-border pb-8 last:border-b-0">
			<h2 class="text-2xl font-semibold mb-2">
				<a
					href="/blog/{post.path}"
					class="hover:text-primary transition-colors"
				>
					{post.meta.title}
				</a>
			</h2>

			<div class="flex items-center gap-4 text-sm text-muted-foreground mb-4">
				{#if post.meta.date}
					<time datetime={post.meta.date}>
						{new Date(post.meta.date).toLocaleDateString()}
					</time>
				{/if}
				{#if post.meta.category}
					<span>•</span>
					<span
						class="px-2 py-1 bg-accent text-accent-foreground rounded text-xs"
					>
						{post.meta.category}
					</span>
				{/if}
			</div>

			{#if post.meta.description}
				<p class="text-muted-foreground mb-4">
					{post.meta.description}
				</p>
			{/if}

			<a
				href="/blog/{post.path}"
				class="text-primary hover:text-primary/80 font-medium transition-colors"
			>
				Read more →
			</a>
		</article>
	{/each}
</div>
