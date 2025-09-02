<script>
	import { ArrowRight, Package, Zap, Shield, Users, BarChart, Heart, FileText, Lock, BarChart3, Search, Network } from 'lucide-svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import MetricCard from '$lib/components/pro/MetricCard.svelte';
	import PreviewChart from '$lib/components/pro/PreviewChart.svelte';
	import { assets } from '$app/paths';

	let tab = 'analytics';
	let zapping = false;
	function triggerZap() {
		zapping = true;
		setTimeout(() => (zapping = false), 1100);
	}
	const demo = {
		analytics: { chart: [4,6,5,7,9,11,10,12,14], metrics: [
			{ icon: BarChart3, label: 'Listing clicks', value: '12,438', delta: { pct: 8, up: true } },
			{ icon: BarChart3, label: 'Installs', value: '3,219', delta: { pct: 3, up: true } },
			{ icon: BarChart3, label: 'Conversion rate', value: '25.9%', delta: { pct: 1.2, up: true } },
			{ icon: BarChart3, label: 'DAU', value: '8,421', delta: { pct: 5, up: true } },
		]},
		aso: { chart: [2,3,4,6,8,7,9,10,12], metrics: [
			{ icon: Search, label: 'Keyword ranking', value: '12 / 50', delta: { pct: 14, up: true } },
			{ icon: Search, label: 'Search CTR', value: '3.8%', delta: { pct: 0.6, up: true } },
			{ icon: Search, label: 'Impressions', value: '41,102', delta: { pct: 9, up: true } },
			{ icon: Search, label: 'Reviews', value: '1,284', delta: { pct: 6, up: true } },
		]},
		relays: { chart: [9,8,7,10,12,13,12,14,16], metrics: [
			{ icon: Network, label: 'Relay reach', value: '87%', delta: { pct: 5, up: true } },
			{ icon: Network, label: 'Uptime', value: '99.2%', delta: { pct: 0.3, up: true } },
			{ icon: Network, label: 'Avg latency', value: '138ms', delta: { pct: 7, up: false } },
			{ icon: Network, label: 'Active relays', value: '128', delta: { pct: 4, up: true } },
		]},
	};
</script>

<svelte:head>
	<title>For Developers - Zapstore</title>
	<meta name="description" content="Build and distribute your applications on the open marketplace. No fees, no restrictions, direct connection with users through cryptographic verification." />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent"></div>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
		<div class="relative z-10 max-w-4xl mx-auto text-center">
			<h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
				Build on the
				<span class="gradient-text"> Open Marketplace</span>
			</h1>
			<p class="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
				Distribute your apps directly to users. No gatekeepers, no arbitrary rules, 
				no revenue cuts. Just you, your code, and your community.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/docs/getting-started"
					class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
				>
					Start Building
					<ArrowRight class="ml-2 h-4 w-4" />
				</a>
				<a
					href="/docs/api"
					class="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
				>
					API Documentation
				</a>
			</div>
		</div>
	</div>
</section>

 

<!-- Pro (Coming soon): Analytics, ASO & Relays -->
<section class="py-24 border-t border-white/10">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-10">
			<div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 mb-3">
				Pro (Coming soon)
			</div>
			<h2 class="text-3xl sm:text-4xl font-extrabold text-white">Analytics, ASO & Relays</h2>
			<p class="text-lg text-gray-400">Preview of the developer dashboard. Aggregated, privacy‑preserving data.</p>
		</div>

		<!-- Tabs -->
		<div class="mb-8 flex justify-center gap-2">
			<button class="px-4 py-2 rounded-md border border-white/10 text-sm text-white/80 hover:bg-white/5 {tab==='analytics' ? 'bg-white/10' : ''}" on:click={() => tab='analytics'}>Analytics</button>
			<button class="px-4 py-2 rounded-md border border-white/10 text-sm text-white/80 hover:bg-white/5 {tab==='aso' ? 'bg-white/10' : ''}" on:click={() => tab='aso'}>ASO</button>
			<button class="px-4 py-2 rounded-md border border-white/10 text-sm text-white/80 hover:bg-white/5 {tab==='relays' ? 'bg-white/10' : ''}" on:click={() => tab='relays'}>Relays</button>
		</div>
		
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{#each demo[tab].metrics as m}
					<MetricCard icon={m.icon} label={m.label} value={m.value} delta={m.delta} />
				{/each}
			</div>
			<div class="rounded-xl border border-white/10 bg-white/5 p-6">
				<h3 class="text-white font-semibold mb-3">
					{tab === 'analytics' ? 'Installs trend' : tab === 'aso' ? 'Keyword visibility' : 'Relay health'}
				</h3>
				<PreviewChart data={demo[tab].chart} />
				<div class="mt-4 flex items-center justify-between">
					<span class="text-xs text-white/60">Sample data</span>
					<a href="/waitlist" class="text-sm text-blue-400 hover:text-blue-300">Join the waitlist →</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Global Distribution -->
<section class="py-24 border-t border-border/40">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="max-w-3xl mx-auto text-center mb-12">
			<h2 class="text-3xl sm:text-4xl font-extra-bold mb-4">Global distribution</h2>
			<p class="text-lg text-muted-foreground">One submission reaches users across platforms — borderless and location‑agnostic, no separate stores or approvals.</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="rounded-xl border border-white/10 bg-white/5 p-6 text-left">
				<h3 class="text-white font-semibold mb-2">Your Privacy. Your Identity.</h3>
				<p class="text-sm text-muted-foreground">Zapstore uses cryptographic signatures — not identity checks — so developers stay anonymous by default while users remain secure.</p>
				<div class="mt-4 flex items-center justify-center">
					<svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
						<defs>
							<radialGradient id="badgeGlow" cx="50%" cy="50%" r="60%">
								<stop offset="0%" stop-color="rgba(99,102,241,0.18)"/>
								<stop offset="100%" stop-color="rgba(0,0,0,0)"/>
							</radialGradient>
						</defs>
						<circle cx="60" cy="60" r="50" fill="url(#badgeGlow)" />
						<g stroke="#c084fc" stroke-width="2" fill="none" stroke-linecap="round">
							<!-- Lock body -->
							<rect x="40" y="55" width="40" height="30" rx="6" fill="rgba(192,132,252,0.15)" stroke="#c084fc" />
							<!-- Shackle (animated close) -->
							<g style="transform-origin: 60px 52px; animation: lock-drop 1.2s ease-out infinite;">
								<path d="M48 55 v-8 a12 12 0 0 1 24 0 v8" />
							</g>
						</g>
					</svg>
				</div>
			</div>
			<div class="rounded-xl border border-white/10 bg-white/5 p-6 text-left">
				<h3 class="text-white font-semibold mb-2">No borders</h3>
				<p class="text-sm text-muted-foreground">Relays propagate your releases globally — not tied to a country or store region.</p>
				<!-- Minimal world distribution visual -->
				<div class="mt-4 relative h-36">
					<svg viewBox="0 0 400 140" class="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
						<defs>
							<pattern id="gridLines" width="40" height="40" patternUnits="userSpaceOnUse">
								<path d="M 40 0 L 0 0 0 40" fill="none" stroke="#a855f7" stroke-opacity="0.18" stroke-width="0.5"/>
							</pattern>
							<radialGradient id="mapGlow" cx="60%" cy="40%" r="70%">
								<stop offset="0%" stop-color="rgba(99,102,241,0.18)"/>
								<stop offset="100%" stop-color="rgba(0,0,0,0)"/>
							</radialGradient>
						</defs>
						<rect width="100%" height="100%" fill="url(#gridLines)"/>
						<rect width="100%" height="100%" fill="url(#mapGlow)"/>

						<!-- Arcs (animated stroke dash) -->
						<path d="M60,95 C140,20 220,20 300,85" fill="none" stroke="#60a5fa" stroke-width="1.8" stroke-linecap="round"
							style="stroke-dasharray: 240; stroke-dashoffset: 240; animation: arc-dash 2.6s ease-in-out infinite;"/>
						<path d="M160,60 C210,10 260,15 340,50" fill="none" stroke="#a855f7" stroke-width="1.4" stroke-linecap="round"
							style="stroke-dasharray: 200; stroke-dashoffset: 200; animation: arc-dash 3.2s ease-in-out infinite; animation-delay: .3s;"/>
						<path d="M80,80 C170,40 230,60 320,40" fill="none" stroke="#22d3ee" stroke-width="1.2" stroke-linecap="round"
							style="stroke-dasharray: 200; stroke-dashoffset: 200; animation: arc-dash 2.2s ease-in-out infinite; animation-delay: .6s;"/>

						<!-- Nodes -->
						<g fill="#c084fc">
							<circle cx="60" cy="95" r="3" fill="#93c5fd"/>
							<circle cx="160" cy="60" r="2.5" fill="#c084fc"/>
							<circle cx="300" cy="85" r="3" fill="#93c5fd"/>
							<circle cx="340" cy="50" r="2.5" fill="#c084fc"/>
                            <circle cx="120" cy="70" r="2.2" fill="#c084fc"/>
                            <circle cx="210" cy="40" r="2.2" fill="#c084fc"/>
                            <circle cx="240" cy="75" r="2.2" fill="#93c5fd"/>
						</g>
					</svg>
				</div>
			</div>
			<div class="rounded-xl border border-white/10 bg-white/5 p-6 text-left">
				<h3 class="text-white font-semibold mb-2">No gatekeepers</h3>
				<p class="text-sm text-muted-foreground">Skip closed reviews and arbitrary rules. Ship at your pace with cryptographic trust.</p>
				<div class="mt-4 flex items-center justify-center">
					<svg viewBox="0 0 160 100" width="160" height="100" aria-hidden="true">
						<defs>
							<radialGradient id="gateGlow" cx="50%" cy="50%" r="60%">
								<stop offset="0%" stop-color="rgba(99,102,241,0.16)"/>
								<stop offset="100%" stop-color="rgba(0,0,0,0)"/>
							</radialGradient>
						</defs>
						<circle cx="80" cy="50" r="46" fill="url(#gateGlow)" />
						<!-- Pivot -->
						<circle cx="45" cy="68" r="6" fill="#c084fc" />
						<!-- Barrier arm (lifts up) -->
						<rect x="51" y="66" width="70" height="4" rx="2" fill="#93c5fd" style="transform-origin: 51px 68px; animation: gate-lift 1.6s ease-in-out infinite;"/>
					</svg>
				</div>
			</div>
		</div>
	</div>
</section>

 

<!-- Direct Zaps to Developers -->
<section class="py-24 border-t border-border/40">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
			<div>
				<h2 class="text-3xl sm:text-4xl font-extra-bold mb-4">Direct zaps to developers</h2>
				<p class="text-lg text-muted-foreground mb-4">Once your app is signed, users can zap your releases. Payments go straight to your wallet — no intermediaries, no platform fees.</p>
				<p class="text-sm text-muted-foreground">Signing proves authenticity; zaps reward your work.</p>
			</div>
			<div class="relative">
				<div class="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 blur-3xl"></div>
				<div class="relative rounded-xl border border-white/10 bg-white/5 p-3 overflow-hidden">
					<img src={`${assets}/images/App/zap this release.png`} alt="Zap this release UI" class="w-full h-auto rounded-lg object-cover" />
					<!-- Animated pulse ring at the button area (approximate hotspot) -->
					<div class="pointer-events-none absolute bottom-8 right-12 h-10 w-10 rounded-full">
						<div class="absolute inset-0 rounded-full bg-blue-500/0 {zapping ? 'animate-[ping_0.9s_ease-out_1]' : ''}"></div>
						<div class="absolute inset-0 rounded-full {zapping ? 'bg-blue-400/40' : 'bg-transparent'} blur-md transition-colors"></div>
					</div>
					<!-- Click shimmer overlay to simulate interaction -->
					<div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_85%,rgba(59,130,246,0.25),transparent_45%)] opacity-0 {zapping ? 'opacity-100 animate-[fadeOut_1.1s_ease_1_forwards]' : ''}"></div>
					<!-- Invisible button to trigger the effect -->
					<button aria-label="Simulate zap" on:click={triggerZap} class="absolute bottom-6 right-10 h-14 w-36"></button>
				</div>
			</div>
		</div>
	</div>
</section>

 

 

<!-- How It Works -->
<section class="py-24 border-t border-border/40">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl font-extra-bold mb-4">
				Get Started in Three Simple Steps
			</h2>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				From development to distribution in minutes, not months
			</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="relative">
				<div class="mb-4">
					<div class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
						1
					</div>
				</div>
				<h3 class="text-xl font-semibold mb-2">Register Your App</h3>
				<p class="text-muted-foreground">
					Create your developer account and register your app. Set up your nostr identity 
					and configure your payment preferences.
				</p>
			</div>
			
			<div class="relative">
				<div class="mb-4">
					<div class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
						2
					</div>
				</div>
				<h3 class="text-xl font-semibold mb-2">Sign and Publish</h3>
				<p class="text-muted-foreground">
					Sign your app with your keys and publish to the network. Your app becomes 
					instantly available to users worldwide.
				</p>
			</div>
			
			<div class="relative">
				<div class="mb-4">
					<div class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
						3
					</div>
				</div>
				<h3 class="text-xl font-semibold mb-2">Grow Your Audience</h3>
				<p class="text-muted-foreground">
					Leverage social discovery to reach new users. Engage with your community 
					and receive direct feedback and support.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Developer Tools -->
<section class="py-24 border-t border-border/40">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<div>
				<h2 class="text-3xl sm:text-4xl font-extra-bold mb-6">
					Powerful Tools for Modern Development
				</h2>
				<p class="text-lg text-muted-foreground mb-6">
					Everything you need to build, test, and distribute your applications on the open marketplace.
				</p>
				<div class="space-y-4">
					<div class="flex items-start">
						<div class="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
							<div class="h-2 w-2 rounded-full bg-primary"></div>
						</div>
						<div class="ml-3">
							<h4 class="font-semibold mb-1">Zapstore SDK</h4>
							<p class="text-sm text-muted-foreground">
								Full-featured SDK with TypeScript support for seamless integration
							</p>
						</div>
					</div>
					<div class="flex items-start">
						<div class="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
							<div class="h-2 w-2 rounded-full bg-primary"></div>
						</div>
						<div class="ml-3">
							<h4 class="font-semibold mb-1">CLI Tools</h4>
							<p class="text-sm text-muted-foreground">
								Command-line tools for building, signing, and publishing your apps
							</p>
						</div>
					</div>
					<div class="flex items-start">
						<div class="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
							<div class="h-2 w-2 rounded-full bg-primary" />
						</div>
						<div class="ml-3">
							<h4 class="font-semibold mb-1">Testing Framework</h4>
							<p class="text-sm text-muted-foreground">
								Comprehensive testing tools to ensure your app works perfectly
							</p>
						</div>
					</div>
					<div class="flex items-start">
						<div class="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
							<div class="h-2 w-2 rounded-full bg-primary" />
						</div>
						<div class="ml-3">
							<h4 class="font-semibold mb-1">Analytics Dashboard</h4>
							<p class="text-sm text-muted-foreground">
								Real-time insights into your app's performance and user engagement
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="relative">
				<div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-500/20 blur-3xl" />
				<div class="relative rounded-lg border border-border bg-card p-8">
					<h3 class="text-2xl font-bold mb-4">Quick Start</h3>
					<div class="space-y-3 font-mono text-sm">
						<div class="flex items-center space-x-2">
							<span class="text-muted-foreground">$</span>
							<span>npm install -g @zapstore/cli</span>
						</div>
						<div class="flex items-center space-x-2">
							<span class="text-muted-foreground">$</span>
							<span>zapstore init my-app</span>
						</div>
						<div class="flex items-center space-x-2">
							<span class="text-muted-foreground">$</span>
							<span>zapstore publish</span>
						</div>
					</div>
					<div class="mt-6">
						<a
							href="/docs/quickstart"
							class="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
						>
							View Full Guide
							<ArrowRight class="ml-2 h-4 w-4" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-24 border-t border-border/40">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-12 lg:p-16">
			<div class="relative z-10 max-w-2xl mx-auto text-center">
				<h2 class="text-3xl sm:text-4xl font-extra-bold mb-4">
					Join the Revolution
				</h2>
				<p class="text-lg text-muted-foreground mb-8">
					Be part of the movement building the open, decentralized future of app distribution. 
					Your apps, your rules, your community.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="/docs/getting-started"
						class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
					>
						Start Building Today
						<ArrowRight class="ml-2 h-4 w-4" />
					</a>
					<a
						href="https://discord.com"
						class="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
					>
						Join Our Community
					</a>
				</div>
			</div>
		</div>
	</div>
</section> 