<script>
	export let data;
</script>

<svelte:head>
	<title>{data.content.title} - Zapstore</title>
	<meta name="description" content="Learn how to build, distribute, and integrate with Zapstore. Comprehensive documentation for developers." />
</svelte:head>

<article class="prose">
	{@html data.content.html}
</article> 