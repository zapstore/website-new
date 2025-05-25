<script>
	import { ArrowRight, Shield, Zap, Users, Code, Lock, Globe } from 'lucide-svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import CodeDemo from '$lib/components/CodeDemo.svelte';
</script>

<svelte:head>
	<title>Zapstore - The Open App Marketplace</title>
	<meta name="description" content="Discover, install, and manage applications from the open marketplace. Built on nostr, Zapstore puts users and developers first with cryptographic verification and zero platform fees." />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent"></div>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
		<div class="relative z-10 max-w-4xl mx-auto text-center">
			<h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
				The Open Marketplace for
				<span class="gradient-text"> Trusted Apps</span>
			</h1>
			<p class="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
				Everything you install comes from trusted sources and is cryptographically verified. 
				Not satisfied with the default? Choose your own curators, or mix and match! 
				Censorship has no place in our world.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/apps"
					class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
				>
					Browse Apps
					<ArrowRight class="ml-2 h-4 w-4" />
				</a>
				<a
					href="/developers"
					class="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
				>
					For Developers
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Key Features -->
<section class="py-24 border-t border-border/40">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl font-extra-bold mb-4">
				Built for Freedom, Designed for Trust
			</h2>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				A marketplace that respects your choices and empowers developers
			</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<FeatureCard
				icon={Shield}
				title="Cryptographic Verification"
				description="Every app is cryptographically signed and verified. Know exactly what you're installing and who created it."
			/>
			<FeatureCard
				icon={Users}
				title="Social Discovery"
				description="Supercharged by the nostr open protocol, recommendations come right from your social connections — or use it in totally private way."
			/>
			<FeatureCard
				icon={Zap}
				title="Direct Micropayments"
				description="Connect with your favorite developers: send them direct feedback, request features and support them through micropayments, all without any middlemen."
			/>
			<FeatureCard
				icon={Globe}
				title="Decentralized Catalogs"
				description="Uses decentralized tech for managing catalogs or repositories with different tradeoffs, empowering discovery through a social layer."
			/>
			<FeatureCard
				icon={Lock}
				title="Your Choice, Your Control"
				description="Choose your own curators, mix and match sources, or go completely independent. No single point of control or censorship."
			/>
			<FeatureCard
				icon={Code}
				title="Open Source First"
				description="Built on open protocols and standards. Transparent, auditable, and community-driven development."
			/>
		</div>
	</div>
</section>

<!-- Code Demo Section -->
<section class="py-24 border-t border-border/40">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<div>
				<h2 class="text-3xl sm:text-4xl font-extra-bold mb-6">
					Integrate in Minutes
				</h2>
				<p class="text-lg text-muted-foreground mb-6">
					Our SDK makes it simple to integrate Zapstore into your applications. 
					Handle app discovery, installation, and payments with just a few lines of code.
				</p>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start">
						<div class="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
							<div class="h-2 w-2 rounded-full bg-primary"></div>
						</div>
						<span class="ml-3 text-muted-foreground">Simple, intuitive API</span>
					</li>
					<li class="flex items-start">
						<div class="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
							<div class="h-2 w-2 rounded-full bg-primary"></div>
						</div>
						<span class="ml-3 text-muted-foreground">Full TypeScript support</span>
					</li>
					<li class="flex items-start">
						<div class="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
							<div class="h-2 w-2 rounded-full bg-primary"></div>
						</div>
						<span class="ml-3 text-muted-foreground">Comprehensive documentation</span>
					</li>
				</ul>
				<a
					href="/docs"
					class="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
				>
					View Documentation
					<ArrowRight class="ml-2 h-4 w-4" />
				</a>
			</div>
			<div>
				<CodeDemo />
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-24 border-t border-border/40">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-12 lg:p-16">
			<div class="relative z-10 max-w-2xl">
				<h2 class="text-3xl sm:text-4xl font-extra-bold mb-4">
					Ready to Join the Open Marketplace?
				</h2>
				<p class="text-lg text-muted-foreground mb-8">
					With our growing catalog, you will never run out of great apps. 
					Start discovering trusted applications today.
				</p>
				<div class="flex flex-col sm:flex-row gap-4">
					<a
						href="/apps"
						class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
					>
						Explore Apps
						<ArrowRight class="ml-2 h-4 w-4" />
					</a>
					<a
						href="/docs/getting-started"
						class="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
					>
						Get Started Guide
					</a>
				</div>
			</div>
			<div class="absolute right-0 top-0 -translate-y-12 translate-x-12 transform">
				<div class="h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
			</div>
			<div class="absolute bottom-0 left-0 -translate-x-12 translate-y-12 transform">
				<div class="h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
			</div>
		</div>
	</div>
</section>
