<script>
	import {
		ArrowRight,
		Shield,
		Zap,
		Users,
		Code,
		Lock,
		Globe,
		ChevronLeft,
		ChevronRight,
		Download,
	} from "lucide-svelte";
	import { onMount } from "svelte";
	import FeatureCard from "$lib/components/FeatureCard.svelte";
	import CodeDemo from "$lib/components/CodeDemo.svelte";
	import { fetchApps, getAppSlug } from "$lib/nostr.js";
	import { assets } from "$app/paths";

	let carouselApps = [];
	let carouselLoading = true;
	let carouselEl;

	function getAppUrl(app) {
		return `/apps/${getAppSlug(app.pubkey, app.dTag)}`;
	}

	function scrollLeft() {
		carouselEl && carouselEl.scrollBy({ left: -360, behavior: "smooth" });
	}

	function scrollRight() {
		carouselEl && carouselEl.scrollBy({ left: 360, behavior: "smooth" });
	}

	onMount(async () => {
		try {
			carouselApps = await fetchApps({ limit: 24 });
		} catch (e) {
			console.warn("Failed to load carousel apps", e);
		} finally {
			carouselLoading = false;
		}
	});
</script>

<svelte:head>
	<title>Zapstore</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
		<div class="relative z-10 max-w-4xl mx-auto text-center">
			<h1
				class="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white"
			>
				The app store powered by your social graph
			</h1>
			<p
				class="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
			>
				Zapstore is the first app store built on open protocols. Discover great
				apps through your social connections&mdash;or in a completely private
				way.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/app"
					class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
				>
					Download Zapstore
					<Download class="ml-2 h-4 w-4" />
				</a>
				<a
					href="/developers"
					class="inline-flex items-center justify-center rounded-md border border-white/10 px-6 py-3 text-sm font-medium text-white/90 transition-all hover:bg-white/5 hover:shadow-[0_0_0_3px_rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
				>
					For Developers
				</a>
			</div>
			<div
				class="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400"
			>
				<span>Available on: </span>
				<svg
					class="w-4 h-4"
					viewBox="0 0 32 32"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						d="M23.35 12.653l2.496-4.323c0.044-0.074 0.070-0.164 0.070-0.26 0-0.287-0.232-0.519-0.519-0.519-0.191 0-0.358 0.103-0.448 0.257l-0.001 0.002-2.527 4.377c-1.887-0.867-4.094-1.373-6.419-1.373s-4.532 0.506-6.517 1.413l0.098-0.040-2.527-4.378c-0.091-0.156-0.259-0.26-0.45-0.26-0.287 0-0.519 0.232-0.519 0.519 0 0.096 0.026 0.185 0.071 0.262l-0.001-0.002 2.496 4.323c-4.286 2.367-7.236 6.697-7.643 11.744l-0.003 0.052h29.991c-0.41-5.099-3.36-9.429-7.57-11.758l-0.076-0.038zM9.098 20.176c-0 0-0 0-0 0-0.69 0-1.249-0.559-1.249-1.249s0.559-1.249 1.249-1.249c0.69 0 1.249 0.559 1.249 1.249v0c-0.001 0.689-0.559 1.248-1.249 1.249h-0zM22.902 20.176c-0 0-0 0-0 0-0.69 0-1.249-0.559-1.249-1.249s0.559-1.249 1.249-1.249c0.69 0 1.249 0.559 1.249 1.249v0c-0.001 0.689-0.559 1.248-1.249 1.249h-0z"
					></path>
				</svg>
				<span class="font-bold">Android 10+</span>
				<span>(arm64-v8a)</span>
			</div>
		</div>
	</div>
</section>

<!-- Key Features (moved above Discover apps) -->
<section class="relative overflow-hidden py-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="text-center mb-14 max-w-4xl mx-auto">
			<h2
				class="text-4xl sm:text-5xl font-extrabold mb-4 text:white leading-tight"
			>
				Uncensorable publishing, secure downloads
			</h2>
			<p class="text-lg text-gray-400 leading-relaxed">
				A minimal, secure marketplace that prioritizes clarity and verification.
			</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
			<div class="rounded-xl border border-white/10 bg-card p-8">
				<div class="mb-4 overflow-hidden rounded-lg">
					<img
						src={`${assets}/images/App/Features-hompage/Signature.png`}
						alt="Verified Developers"
						class="block w-full h-24 object-contain"
					/>
				</div>
				<div class="flex items-center gap-4 mb-4">
					<div
						class="h-9 w-9 rounded-lg border border-white/10 bg:white/5 flex items-center justify-center"
					>
						<Shield class="h-5 w-5 text-white" />
					</div>
					<h3 class="text-xl font-semibold text-white">Verified Developers</h3>
				</div>
				<p class="text-sm text-gray-400">
					Know who builds your apps. Every app is cryptographically signed for
					transparency and trust.
				</p>
			</div>
			<div class="rounded-xl border border-white/10 bg-card p-8">
				<div class="mb-4 overflow-hidden rounded-lg">
					<img
						src={`${assets}/images/App/Features-hompage/WebOfTrustFeature.png`}
						alt="Web of Trust"
						class="block w-full h-24 object-contain"
					/>
				</div>
				<div class="flex items-center gap-4 mb-4">
					<div
						class="h-9 w-9 rounded-lg border border-white/10 bg-white/5 flex items:center justify-center"
					>
						<Users class="h-5 w-5 text-white" />
					</div>
					<h3 class="text-xl font-semibold text:white">Web of Trust</h3>
				</div>
				<p class="text-sm text-gray-400">
					Powered by Nostr's decentralized protocol, vetted by a
					community-driven trust network.
				</p>
			</div>
			<div class="rounded-xl border border-white/10 bg-card p-8">
				<div class="mb-4 overflow-hidden rounded-lg">
					<img
						src={`${assets}/images/App/Features-hompage/ZapThisRelease.png`}
						alt="Support Creators"
						class="block w-full h-24 object-contain"
					/>
				</div>
				<div class="flex items-center gap-4 mb-4">
					<div
						class="h-9 w-9 rounded-lg border border-white/10 bg-white/5 flex items:center justify-center"
					>
						<Zap class="h-5 w-5 text-white" />
					</div>
					<h3 class="text-xl font-semibold text:white">Support Creators</h3>
				</div>
				<p class="text-sm text-gray-400">
					Direct Lightning payments empower developers in the Nostr ecosystem.
				</p>
			</div>
			<div class="rounded-xl border border-white/10 bg-card p-8">
				<div class="mb-4 overflow-hidden rounded-lg">
					<img
						src={`${assets}/images/App/Features-hompage/Collections.png`}
						alt="Decentralized Freedom"
						class="block w-full h-24 object-contain"
					/>
				</div>
				<div class="flex items-center gap-4 mb-4">
					<div
						class="h-9 w-9 rounded-lg border border-white/10 bg-white/5 flex items:center justify-center"
					>
						<Globe class="h-5 w-5 text:white" />
					</div>
					<h3 class="text-xl font-semibold text:white">
						Decentralized Freedom
					</h3>
				</div>
				<p class="text-sm text-gray-400">
					No gatekeepers. Discover apps in a truly open and censorship-resistant
					store.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Minimal Showcase Section (reverted back above) -->
<section class="relative overflow-hidden">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
		<div class="max-w-5xl mx-auto">
			<div class="relative p-10 md:p-14">
				<div class="mx-auto flex flex-col items-center text-center gap-6">
					<h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">
						Discover apps
					</h2>
					<p
						class="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed"
					>
						A curated, open marketplace. Neutral, secure, and designed for
						builders and power users.
					</p>
					<div class="mt-6 w-full overflow-hidden">
						{#if carouselLoading}
							<div class="flex items-center justify-center py-6">
								<div
									class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"
								></div>
							</div>
						{:else if carouselApps.length === 0}
							<p class="text-sm text-gray-500">No apps found right now.</p>
						{:else}
							<div class="animate-scroll-left flex gap-4 w-[200%]">
								<div class="flex gap-4">
									{#each carouselApps.slice(0, 12) as app}
										<a
											href={getAppUrl(app)}
											class="flex-none w-16 h-16 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors inline-flex items-center justify-center"
											title={app.name}
										>
											{#if app.icon}
												<img
													src={app.icon}
													alt={app.name}
													class="w-10 h-10 rounded object-cover"
													loading="lazy"
												/>
											{:else}
												<div class="w-8 h-8 rounded bg-gray-700"></div>
											{/if}
										</a>
									{/each}
								</div>
								<div class="flex gap-4">
									{#each carouselApps.slice(0, 12) as app}
										<a
											href={getAppUrl(app)}
											class="flex-none w-16 h-16 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors inline-flex items-center justify-center"
											title={app.name}
										>
											{#if app.icon}
												<img
													src={app.icon}
													alt={app.name}
													class="w-10 h-10 rounded object-cover"
													loading="lazy"
												/>
											{:else}
												<div class="w-8 h-8 rounded bg-gray-700"></div>
											{/if}
										</a>
									{/each}
								</div>
							</div>
						{/if}
					</div>
					<div class="flex flex-col sm:flex-row gap-4">
						<a
							href="/apps"
							class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
						>
							Browse apps
							<ArrowRight class="ml-2 h-4 w-4" />
						</a>
						<a
							href="/developers"
							class="inline-flex items-center justify-center rounded-md border border-white/10 px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
							>Publish your app</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Nostr Relays Section -->
<section
	class="relative py-20 border-t border-border/40 bg-background overflow-hidden"
>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl font-extrabold mb-6 text-white">
				Powered by Nostr relays
			</h2>
			<p class="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
				Zapstore uses a decentralized relay network for secure,
				censorship-resistant distribution.
			</p>
		</div>

		<!-- How It Works Diagram - Better aligned -->
		<div class="mb-16">
			<div
				class="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
			>
				<!-- Step 1: User Publishes -->
				<div class="text-center">
					<div
						class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center border border-white/10 bg-white/5"
					>
						<svg
							class="w-10 h-10 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
							/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-white mb-2">User publishes</h3>
					<p class="text-sm text-gray-400">Content is created and signed</p>
				</div>

				<!-- Arrow 1 -->
				<div class="hidden md:flex items-center">
					<svg
						class="w-8 h-8 text-primary"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>
				</div>

				<!-- Step 2: Relay Transmits -->
				<div class="text-center">
					<div
						class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center border border-white/10 bg-white/5"
					>
						<svg
							class="w-10 h-10 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
							/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-white mb-2">Relay transmits</h3>
					<p class="text-sm text-gray-400">Content is broadcasted</p>
				</div>

				<!-- Arrow 2 -->
				<div class="hidden md:flex items-center">
					<svg
						class="w-8 h-8 text-primary"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>
				</div>

				<!-- Step 3: Users Receive -->
				<div class="text-center">
					<div
						class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center border border-white/10 bg-white/5"
					>
						<svg
							class="w-10 h-10 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-white mb-2">Users receive</h3>
					<p class="text-sm text-gray-400">Content is delivered</p>
				</div>
			</div>
		</div>

		<!-- Available Functions -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			<!-- Explore Public Relays -->
			<div class="group relative">
				<div class="h-full rounded-2xl p-6 border border-white/10 bg-card">
					<div class="relative z-10">
						<div class="relative mb-4">
							<div
								class="relative w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center"
							>
								<svg
									class="h-6 w-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</div>
						</div>
						<h3 class="text-lg font-semibold text-white mb-2">
							Explore public relays
						</h3>
						<p class="text-gray-400 leading-relaxed text-sm">
							Discover and connect to public Nostr relays worldwide.
						</p>
					</div>
				</div>
			</div>

			<!-- Manage Favorites -->
			<div class="group relative">
				<div class="h-full rounded-2xl p-6 border border-white/10 bg-card">
					<div class="relative z-10">
						<div class="relative mb-4">
							<div
								class="relative w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center"
							>
								<svg
									class="h-6 w-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
									/>
								</svg>
							</div>
						</div>
						<h3 class="text-lg font-semibold text-white mb-2">
							Manage favorites
						</h3>
						<p class="text-gray-400 leading-relaxed text-sm">
							Organize and manage your preferred relay connections.
						</p>
					</div>
				</div>
			</div>

			<!-- Recommend Relays -->
			<div class="group relative">
				<div class="h-full rounded-2xl p-6 border border-white/10 bg-card">
					<div class="relative z-10">
						<div class="relative mb-4">
							<div
								class="relative w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center"
							>
								<svg
									class="h-6 w-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M7 11l5-5m0 0l5 5m-5-5v12"
									/>
								</svg>
							</div>
						</div>
						<h3 class="text-lg font-semibold text-white mb-2">
							Recommend & share
						</h3>
						<p class="text-gray-400 leading-relaxed text-sm">
							Share trusted relays with the community and discover new ones.
						</p>
					</div>
				</div>
			</div>

			<!-- Private Relay -->
			<div class="group relative">
				<div class="h-full rounded-2xl p-6 border border-white/10 bg-card">
					<div class="relative z-10">
						<div class="relative mb-4">
							<div
								class="relative w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center"
							>
								<svg
									class="h-6 w-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</div>
						</div>
						<h3 class="text-lg font-semibold text-white mb-2">Private relay</h3>
						<p class="text-gray-400 leading-relaxed text-sm">
							Configure and manage your own private relay for enhanced security.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-20 border-t border-white/10">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div
			class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-12 lg:p-16"
		>
			<div class="relative z-10 max-w-2xl">
				<h2 class="text-3xl sm:text-4xl font-extrabold mb-4 text-white">
					Ready to join?
				</h2>
				<p class="text-lg text-gray-400 mb-8">
					With our growing catalog, you will never run out of great apps. Start
					discovering today!
				</p>
				<div class="flex flex-col sm:flex-row gap-4">
					<a
						href="/app"
						class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
					>
						Download now
						<ArrowRight class="ml-2 h-4 w-4" />
					</a>
					<a
						href="/docs/quickstart"
						class="inline-flex items-center justify-center rounded-md border border-white/10 px-6 py-3 text-sm font-medium text-white/90 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
					>
						Quickstart guide
					</a>
				</div>
			</div>
			<!-- subtle corners -->
			<div
				class="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
			></div>
			<div
				class="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-secondary/10 blur-3xl"
			></div>
		</div>
	</div>
</section>
