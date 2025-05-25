<script>
	import { onMount } from 'svelte';
	
	let typed = '';
	const code = `import { Zapstore } from '@zapstore/sdk';

const store = new Zapstore({
	relays: ['wss://relay.zapstore.app'],
	signer: yourSigner
});

// Publish your app
await store.publish({
	name: "My Awesome App",
	version: "1.0.0",
	description: "A revolutionary productivity tool"
});`;
	
	onMount(() => {
		let i = 0;
		const interval = setInterval(() => {
			if (i < code.length) {
				typed = code.slice(0, i + 1);
				i++;
			} else {
				clearInterval(interval);
			}
		}, 20);
		
		return () => clearInterval(interval);
	});
</script>

<div class="relative">
	<div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-500/20 blur-xl"></div>
	<div class="relative rounded-lg border border-border bg-black/50 p-6 font-mono text-sm">
		<div class="mb-4 flex items-center space-x-2">
			<div class="h-3 w-3 rounded-full bg-red-500"></div>
			<div class="h-3 w-3 rounded-full bg-yellow-500"></div>
			<div class="h-3 w-3 rounded-full bg-green-500"></div>
		</div>
		<pre class="overflow-x-auto"><code class="language-javascript">{typed}<span class="animate-pulse">|</span></code></pre>
	</div>
</div>

<style>
	code {
		color: #e2e8f0;
	}
	
	/* Simple syntax highlighting */
	:global(.language-javascript) {
		color: #e2e8f0;
	}
</style> 