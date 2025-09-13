<script>
	import { Download, Smartphone, Shield } from "lucide-svelte";
	import { assets } from "$app/paths";
</script>

<svelte:head>
	<title>Zapstore App</title>
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden border-b border-white/10">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
			<!-- Left Column - Text Content -->
			<div class="max-w-2xl text-center lg:text-left">
				<h1
					class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6"
				>
					Discover amazing apps and support developers
				</h1>
				<p class="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
					Get the Nostr-powered open app marketplace.
				</p>
				<div
					class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
				>
					<a
						href="https://cdn.zapstore.dev/800b9048974dfcac4e1e1b9afe0812d15e42a08264ba0b8877e22c2e6d2221ae"
						class="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-lg hover:shadow-xl"
						download
					>
						Download APK
						<Download class="ml-3 h-5 w-5" />
					</a>
					<a
						href="/docs/quickstart"
						class="inline-flex items-center justify-center rounded-lg border border-white/20 px-8 py-4 text-base font-semibold text-white/90 transition-all duration-300 hover:bg-white/10 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 backdrop-blur-sm"
					>
						Get started guide
					</a>
				</div>
			</div>

			<!-- Right Column - App Image -->
			<div class="relative flex justify-center lg:justify-end">
				<div class="relative">
					<!-- Background glow effect -->
					<div
						class="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/10 rounded-3xl blur-3xl scale-110"
					></div>

					<!-- Phone mockup container with shadow -->
					<div
						class="relative transform hover:scale-105 transition-transform duration-500 ease-out"
					>
						<img
							src={`${assets}/images/app1.png`}
							alt="Zapstore App Interface"
							class="relative z-10 max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg w-full h-auto drop-shadow-2xl"
						/>

						<!-- Additional shadow layer -->
						<div
							class="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 rounded-2xl transform translate-y-2 blur-lg opacity-60"
						></div>
					</div>

					<!-- Floating accent elements -->
					<div
						class="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full blur-xl opacity-60 animate-pulse"
					></div>
					<div
						class="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-blue-500/20 to-primary/20 rounded-full blur-2xl opacity-40"
					></div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Platforms / Info -->
<section class="py-16">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="rounded-xl border border-white/10 bg-white/5 p-6">
				<div
					class="w-12 h-12 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center mb-4"
				>
					<Smartphone class="h-6 w-6 text-white" />
				</div>
				<h3 class="text-lg font-semibold text-white mb-2">
					Android compatible
				</h3>
				<p class="text-sm text-gray-400">
					Works on Android and GrapheneOS. All apps are distributed as APK
					files.
				</p>
			</div>
			<div class="rounded-xl border border-white/10 bg-white/5 p-6">
				<div
					class="w-12 h-12 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center mb-4"
				>
					<img
						src={`${assets}/images/logo-dark.svg`}
						alt="Zapstore"
						class="h-6 w-auto"
					/>
				</div>
				<h3 class="text-lg font-semibold text-white mb-2">Open and verified</h3>
				<p class="text-sm text-gray-400">
					Every app is cryptographically signed. Choose curators you trust, or
					go solo.
				</p>
			</div>
			<div class="rounded-xl border border-white/10 bg-white/5 p-6">
				<div
					class="w-12 h-12 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center mb-4"
				>
					<Shield class="h-6 w-6 text-white" />
				</div>
				<h3 class="text-lg font-semibold text-white mb-2">Private by design</h3>
				<p class="text-sm text-gray-400">
					No identity required. Built on the decentralized nostr protocol.
				</p>
			</div>
		</div>
	</div>
</section>
