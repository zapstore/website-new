<script>
	import { onMount } from 'svelte';
	
	let typed = '';
	const code = `# .env (optional)
SIGN_WITH=NIP07

# zapstore.yaml
repository: https://github.com/your/repo
assets:
  - .*.apk
remote_metadata:
  - playstore
  - fdroid
  - github

# publish to relays (requires whitelist)
$ zapstore publish -c zapstore.yaml

# or, with a local secret for one-off
$ SIGN_WITH=176fa8c7... zapstore publish`;
	
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