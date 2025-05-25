<script>
	import { ArrowRight, Package, Zap, Shield, Users, BarChart, Heart } from 'lucide-svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
</script>

<svelte:head>
	<title>For Developers - Zapstore</title>
	<meta name="description" content="Build and distribute your applications on the open marketplace. No fees, no restrictions, direct connection with users through cryptographic verification." />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
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

<!-- Developer Benefits -->
<section class="py-24 border-t border-border/40">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl font-extra-bold mb-4">
				Why Developers Choose Zapstore
			</h2>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				We're building the future of app distribution — one that puts developers first
			</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<FeatureCard
				icon={Zap}
				title="Direct Monetization"
				description="Receive payments directly from users via Lightning Network. No middlemen, no delays, no revenue sharing."
			/>
			<FeatureCard
				icon={Users}
				title="Build Your Community"
				description="Connect directly with your users. Get feedback, build relationships, and grow your audience organically."
			/>
			<FeatureCard
				icon={Shield}
				title="Cryptographic Trust"
				description="Sign your releases with your keys. Users can verify authenticity and build trust in your brand."
			/>
			<FeatureCard
				icon={Package}
				title="Universal Distribution"
				description="One submission reaches users across all platforms. No separate app stores or approval processes."
			/>
			<FeatureCard
				icon={BarChart}
				title="Real-time Analytics"
				description="Track downloads, user engagement, and revenue in real-time. Make data-driven decisions for your apps."
			/>
			<FeatureCard
				icon={Heart}
				title="Community Support"
				description="Join a thriving community of developers building the open web. Share knowledge and grow together."
			/>
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
							<div class="h-2 w-2 rounded-full bg-primary" />
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
							<div class="h-2 w-2 rounded-full bg-primary" />
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