<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	// Import Geist fonts - simplified imports
	import '@fontsource/geist-sans';
	import '@fontsource/geist-mono';
</script>

<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div> 