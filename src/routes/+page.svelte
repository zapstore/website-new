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
		ChevronRight
	} from "lucide-svelte";
	import { onMount } from 'svelte';
	import FeatureCard from "$lib/components/FeatureCard.svelte";
	import CodeDemo from "$lib/components/CodeDemo.svelte";
	import { fetchApps, getAppSlug } from '$lib/nostr.js';
	import { assets } from '$app/paths';

	let carouselApps = [];
	let carouselLoading = true;
	let carouselEl;

	function getAppUrl(app) {
		return `/apps/${getAppSlug(app.npub, app.dTag)}`;
	}

	function scrollLeft() {
		carouselEl && carouselEl.scrollBy({ left: -360, behavior: 'smooth' });
	}

	function scrollRight() {
		carouselEl && carouselEl.scrollBy({ left: 360, behavior: 'smooth' });
	}

	onMount(async () => {
		try {
			carouselApps = await fetchApps({ limit: 24 });
		} catch (e) {
			console.warn('Failed to load carousel apps', e);
		} finally {
			carouselLoading = false;
		}
	});
</script>

<svelte:head>
	<title>Zapstore - test</title>
	<meta
		name="description"
		content="Discover, install, and manage applications from the open marketplace. Built on nostr, Zapstore puts users and developers first with cryptographic verification and zero platform fees."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-black">
	<!-- Minimal, soft dark gradients -->
	<div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 25%, rgba(147, 51, 234, 0.2) 50%, rgba(0, 0, 0, 0.8) 100%);"></div>
	<div class="absolute inset-0" style="background: linear-gradient(315deg, rgba(59, 130, 246, 0.2) 0%, transparent 50%, rgba(6, 182, 212, 0.2) 75%, rgba(0, 0, 0, 0.9) 100%);"></div>
	<div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.85) 100%);"></div>
	<div class="absolute inset-0 opacity-10 animate-subtle-pan" style="background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 48px 48px; background-position: 0 0;"></div>
	<!-- Central abstract graphic related to Zapstore -->
	<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
		<div class="h-72 w-72 rounded-full bg-blue-500/10 blur-3xl animate-slow-pulse"></div>
	</div>
	<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
		<svg class="opacity-20" width="520" height="520" viewBox="0 0 200 200" fill="none" aria-hidden="true">
			<defs>
				<linearGradient id="gradZap" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stop-color="#3b82f6"/>
					<stop offset="100%" stop-color="#6366f1"/>
				</linearGradient>
				<linearGradient id="gradZap2" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0%" stop-color="#60a5fa"/>
					<stop offset="100%" stop-color="#818cf8"/>
				</linearGradient>
			</defs>
			<g transform="translate(100,100)">
				<rect x="-55" y="-55" width="110" height="110" rx="16" transform="rotate(45)" stroke="url(#gradZap)" stroke-width="0.8" />
				<rect x="-75" y="-75" width="150" height="150" rx="24" transform="rotate(45)" stroke="url(#gradZap)" stroke-width="0.6" />
				<circle r="36" stroke="url(#gradZap2)" stroke-width="0.8" />
			</g>
		</svg>
	</div>
	
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
		<div class="relative z-10 max-w-4xl mx-auto text-center">
			<h1
				class="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white"
			>
				The Open App Store for Trusted Apps
			</h1>
			<p
				class="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
			>
				Everything you install is verified and trustworthy. Apps can be signed by developers and Zapstore for maximum security and authenticity.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/apps"
					class="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_0_3px_rgba(37,99,235,0.2)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400"
				>
					Download Zapstore
					<Zap class="ml-2 h-4 w-4" />
				</a>
				<a
					href="/developers"
					class="inline-flex items-center justify-center rounded-md border border-white/10 px-6 py-3 text-sm font-medium text-white/90 transition-all hover:bg-white/5 hover:shadow-[0_0_0_3px_rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
				>
					For Developers
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Key Features (moved above Discover apps) -->
<section class="relative overflow-hidden bg-black py-20">
    <div class="absolute inset-0" style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(37, 14, 58, 0.6) 40%, rgba(88, 28, 135, 0.32) 100%);"></div>
    <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 56px 56px;"></div>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-14 max-w-4xl mx-auto">
            <h2 class="text-4xl sm:text-5xl font-extrabold mb-4 text:white leading-tight">Built for trust</h2>
            <p class="text-lg text-gray-400 leading-relaxed">A minimal, secure marketplace that prioritizes clarity and verification.</p>
			</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div class="rounded-xl border border-white/10 bg-black/40 p-8">
                <div class="mb-4 overflow-hidden rounded-lg">
                    <img src={`${assets}/images/App/Features-hompage/Signature.png`} alt="Verified Developers" class="block w-full h-24 object-contain" />
							</div>
                <div class="flex items-center gap-4 mb-4">
                    <div class="h-9 w-9 rounded-lg border border-white/10 bg:white/5 flex items-center justify-center">
                        <Shield class="h-5 w-5 text-white" />
						</div>
                    <h3 class="text-xl font-semibold text-white">Verified Developers</h3>
					</div>
                <p class="text-sm text-gray-400">Know who builds your apps. Every app is cryptographically signed for transparency and trust.</p>
				</div>
            <div class="rounded-xl border border-white/10 bg-black/40 p-8">
                <div class="mb-4 overflow-hidden rounded-lg">
                    <img src={`${assets}/images/App/Features-hompage/WebOfTrustFeature.png`} alt="Web of Trust" class="block w-full h-24 object-contain" />
                </div>
                <div class="flex items-center gap-4 mb-4">
                    <div class="h-9 w-9 rounded-lg border border-white/10 bg-white/5 flex items:center justify-center">
                        <Users class="h-5 w-5 text-white" />
			</div>
                    <h3 class="text-xl font-semibold text:white">Web of Trust</h3>
					</div>
                <p class="text-sm text-gray-400">Powered by Nostr's decentralized protocol, vetted by a community-driven trust network.</p>
				</div>
            <div class="rounded-xl border border-white/10 bg-black/40 p-8">
                <div class="mb-4 overflow-hidden rounded-lg">
                    <img src={`${assets}/images/App/Features-hompage/ZapThisRelease.png`} alt="Support Creators" class="block w-full h-24 object-contain" />
						</div>
                <div class="flex items-center gap-4 mb-4">
                    <div class="h-9 w-9 rounded-lg border border-white/10 bg-white/5 flex items:center justify-center">
                        <Zap class="h-5 w-5 text-white" />
					</div>
                    <h3 class="text-xl font-semibold text:white">Support Creators</h3>
				</div>
                <p class="text-sm text-gray-400">Direct Lightning payments empower developers in the Nostr ecosystem.</p>
					</div>
            <div class="rounded-xl border border-white/10 bg-black/40 p-8">
                <div class="mb-4 overflow-hidden rounded-lg">
                    <img src={`${assets}/images/App/Features-hompage/Collections.png`} alt="Decentralized Freedom" class="block w-full h-24 object-contain" />
					</div>
                <div class="flex items-center gap-4 mb-4">
                    <div class="h-9 w-9 rounded-lg border border-white/10 bg-white/5 flex items:center justify-center">
                        <Globe class="h-5 w-5 text:white" />
						</div>
                    <h3 class="text-xl font-semibold text:white">Decentralized Freedom</h3>
					</div>
                <p class="text-sm text-gray-400">No gatekeepers. Discover apps in a truly open and censorship-resistant store.</p>
			</div>
		</div>
	</div>
</section>

<!-- Minimal Showcase Section (reverted back above) -->
<section class="relative overflow-hidden bg-black">
    <!-- Background tuned to match Nostr Relays style -->
    <div class="absolute inset-0" style="background: linear-gradient(180deg, rgba(88, 28, 135, 0.32) 0%, rgba(59, 7, 100, 0.22) 40%, rgba(23, 0, 46, 0.28) 100%);"></div>
    <div class="absolute inset-0" style="background: radial-gradient(800px 400px at 50% 20%, rgba(147, 51, 234, 0.10), transparent 60%)"></div>
    <div class="absolute inset-0 pointer-events-none">
        <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
                <pattern id="discoverMesh" width="80" height="80" patternUnits="userSpaceOnUse">
                    <g stroke="#a855f7" stroke-width="0.5" opacity="0.18">
                        <line x1="0" y1="40" x2="40" y2="0" />
                        <line x1="40" y1="0" x2="80" y2="40" />
                        <line x1="0" y1="40" x2="40" y2="80" />
                        <line x1="40" y1="80" x2="80" y2="40" />
                        <line x1="0" y1="40" x2="80" y2="40" />
                    </g>
                </pattern>
                <radialGradient id="discoverVignette2" cx="50%" cy="50%" r="65%">
                    <stop offset="0%" stop-color="#00000000" />
                    <stop offset="100%" stop-color="#000000" />
                </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#discoverMesh)" />
            <rect width="100%" height="100%" fill="url(#discoverVignette2)" style="mix-blend-mode:multiply; opacity:0.35;" />
        </svg>
	</div>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="max-w-5xl mx-auto">
            <div class="relative p-10 md:p-14">
                <div class="mx-auto flex flex-col items-center text-center gap-6">
                    <div class="flex items-center justify-center h-16 w-16 rounded-xl border border-white/10 bg-black/60">
                        <img src={`${assets}/images/logo-dark.svg`} alt="Zapstore" class="h-8 w-auto" />
						</div>
                    <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">Discover trusted apps</h2>
                    <p class="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed">A curated, open marketplace. Neutral, secure, and designed for builders and power users.</p>
                    <div class="mt-6 w-full overflow-hidden">
                        {#if carouselLoading}
                            <div class="flex items-center justify-center py-6">
                                <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
					</div>
                        {:else if carouselApps.length === 0}
                            <p class="text-sm text-gray-500">No apps found right now.</p>
                        {:else}
                            <div class="animate-scroll-left flex gap-4 w-[200%]">
                                <div class="flex gap-4">
                                    {#each carouselApps.slice(0, 12) as app}
                                        <a href={getAppUrl(app)} class="flex-none w-16 h-16 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors inline-flex items-center justify-center" title={app.name}>
                                            {#if app.icon}
                                                <img src={app.icon} alt={app.name} class="w-10 h-10 rounded object-cover" loading="lazy" />
                                            {:else}
                                                <div class="w-8 h-8 rounded bg-gray-700"></div>
                                            {/if}
                                        </a>
                                    {/each}
						</div>
                                <div class="flex gap-4">
                                    {#each carouselApps.slice(0, 12) as app}
                                        <a href={getAppUrl(app)} class="flex-none w-16 h-16 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors inline-flex items-center justify-center" title={app.name}>
                                            {#if app.icon}
                                                <img src={app.icon} alt={app.name} class="w-10 h-10 rounded object-cover" loading="lazy" />
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
                        <a href="/apps" class="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400">
                            Browse apps
                            <ArrowRight class="ml-2 h-4 w-4" />
                        </a>
                        <a href="/developers" class="inline-flex items-center justify-center rounded-md border border-white/10 px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Publish your app</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

 

<!-- Code Demo Section -->
<section class="py-20 border-t border-white/10 bg-black">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<div>
				<h2 class="text-3xl sm:text-4xl font-extrabold mb-6 text-white">
					Integrate in minutes
				</h2>
				<p class="text-lg text-gray-400 mb-6 leading-relaxed">
					Our SDK makes it simple to integrate Zapstore into your applications. Handle discovery, installation, and payments with a few lines of code.
				</p>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start">
						<div class="h-6 w-6 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
							<div class="h-2 w-2 rounded-full bg-blue-600"></div>
						</div>
						<span class="ml-3 text-gray-300">Simple, intuitive API</span>
					</li>
					<li class="flex items-start">
						<div class="h-6 w-6 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
							<div class="h-2 w-2 rounded-full bg-blue-600"></div>
						</div>
						<span class="ml-3 text-gray-300">Full TypeScript support</span>
					</li>
					<li class="flex items-start">
						<div class="h-6 w-6 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
							<div class="h-2 w-2 rounded-full bg-blue-600"></div>
						</div>
						<span class="ml-3 text-gray-300">Comprehensive documentation</span>
					</li>
				</ul>
				
				<!-- CTA Buttons -->
				<div class="flex flex-col sm:flex-row gap-4">
					<a href="/docs" class="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-4 text-base font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400">
						View documentation
						<ArrowRight class="ml-2 h-5 w-5" />
					</a>
					<a href="/developers" class="inline-flex items-center justify-center rounded-md border border-white/10 px-8 py-4 text-base font-medium text-white/90 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">
						Publish your app
					</a>
				</div>
			</div>
			<div>
				<CodeDemo />
			</div>
		</div>
	</div>
</section>

<!-- Nostr Relays Section -->
<section class="relative py-20 border-t border-white/10 overflow-hidden bg-black">
	<!-- Background with connected nodes (SVG mesh) -->
	<div class="absolute inset-0">
		<svg class="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
			<defs>
				<!-- Repeating mesh tile: lines + nodes (subtle) -->
				<pattern id="nodeMesh" width="80" height="80" patternUnits="userSpaceOnUse">
					<g stroke="#a855f7" stroke-width="0.6" opacity="0.36">
						<line x1="0" y1="40" x2="40" y2="0" />
						<line x1="40" y1="0" x2="80" y2="40" />
						<line x1="0" y1="40" x2="40" y2="80" />
						<line x1="40" y1="80" x2="80" y2="40" />
						<line x1="0" y1="40" x2="80" y2="40" />
					</g>
					<g fill="#d946ef" fill-opacity="0.72">
						<circle cx="0" cy="40" r="1.5" />
						<circle cx="40" cy="0" r="1.5" />
						<circle cx="80" cy="40" r="1.5" />
						<circle cx="40" cy="80" r="1.5" />
					</g>
					<g fill="#a855f7" fill-opacity="0.58">
						<circle cx="20" cy="20" r="1.2" />
						<circle cx="60" cy="20" r="1.2" />
						<circle cx="20" cy="60" r="1.2" />
						<circle cx="60" cy="60" r="1.2" />
					</g>
				</pattern>
				<!-- Slightly rotated/offset mesh to break regularity -->
				<pattern id="nodeMesh2" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(8) translate(6 0)">
					<g stroke="#a855f7" stroke-width="0.5" opacity="0.24">
						<line x1="0" y1="40" x2="40" y2="0" />
						<line x1="40" y1="0" x2="80" y2="40" />
						<line x1="0" y1="40" x2="40" y2="80" />
						<line x1="40" y1="80" x2="80" y2="40" />
						<line x1="0" y1="40" x2="80" y2="40" />
					</g>
					<g fill="#d946ef" fill-opacity="0.44">
						<circle cx="0" cy="40" r="1.2" />
						<circle cx="40" cy="0" r="1.2" />
						<circle cx="80" cy="40" r="1.2" />
						<circle cx="40" cy="80" r="1.2" />
					</g>
				</pattern>
				<!-- Noise-based warp to make the mesh less ordered -->
				<filter id="noiseWarp" x="-20%" y="-20%" width="140%" height="140%">
					<feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" seed="7" result="noise"/>
					<feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G"/>
				</filter>
				<!-- stronger vignette for opacity -->
				<radialGradient id="meshFade" cx="50%" cy="50%" r="65%">
					<stop offset="0%" stop-color="#00000000" />
					<stop offset="100%" stop-color="#000000" />
				</radialGradient>
			</defs>
			<!-- Base mesh (subtle) -->
			<g filter="url(#noiseWarp)" opacity="0.40">
				<rect width="100%" height="100%" fill="url(#nodeMesh)" />
			</g>
			<!-- Rotated overlay to break symmetry -->
			<g filter="url(#noiseWarp)" opacity="0.22">
				<rect width="100%" height="100%" fill="url(#nodeMesh2)" />
			</g>
			<!-- Dark vignette to keep focus on content -->
			<rect width="100%" height="100%" fill="url(#meshFade)" style="mix-blend-mode:multiply; opacity:0.38;" />
		</svg>
	</div>
	
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl font-extrabold mb-6 text-white">
				Powered by Nostr relays
			</h2>
			<p class="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
				Zapstore uses a decentralized relay network for secure, censorship-resistant distribution.
			</p>
		</div>
		
		<!-- How It Works Diagram - Better aligned -->
		<div class="mb-16">
			<div class="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
				<!-- Step 1: User Publishes -->
				<div class="text-center">
					<div class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center border border-white/10 bg-white/5">
						<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-white mb-2">User publishes</h3>
					<p class="text-sm text-gray-400">Content is created and signed</p>
				</div>
				
				<!-- Arrow 1 -->
				<div class="hidden md:flex items-center">
					<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
					</svg>
				</div>
				
				<!-- Step 2: Relay Transmits -->
				<div class="text-center">
					<div class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center border border-white/10 bg-white/5">
						<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-white mb-2">Relay transmits</h3>
					<p class="text-sm text-gray-400">Content is broadcasted</p>
				</div>
				
				<!-- Arrow 2 -->
				<div class="hidden md:flex items-center">
					<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
					</svg>
				</div>
				
				<!-- Step 3: Users Receive -->
				<div class="text-center">
					<div class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center border border-white/10 bg-white/5">
						<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-white mb-2">Users receive</h3>
					<p class="text-sm text-gray-400">Content is delivered</p>
				</div>
			</div>
			
			<!-- Decentralized Badge -->
			<div class="text-center mt-8">
				<div class="inline-flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full bg-white/5">
					<div class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
					<span class="text-white/90 text-sm">Everything is decentralized</span>
				</div>
			</div>
		</div>
		
		<!-- Available Functions -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			<!-- Explore Public Relays -->
			<div class="group relative">
				<div class="h-full rounded-2xl p-6 border border-white/10 bg-black/40">
					<div class="relative z-10">
						<div class="relative mb-4">
							<div class="relative w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
								<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
								</svg>
							</div>
						</div>
						<h3 class="text-lg font-semibold text-white mb-2">Explore public relays</h3>
						<p class="text-gray-400 leading-relaxed text-sm">Discover and connect to public Nostr relays worldwide.</p>
					</div>
				</div>
			</div>
			
			<!-- Manage Favorites -->
			<div class="group relative">
				<div class="h-full rounded-2xl p-6 border border-white/10 bg-black/40">
					<div class="relative z-10">
						<div class="relative mb-4">
							<div class="relative w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
								<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
								</svg>
							</div>
						</div>
						<h3 class="text-lg font-semibold text-white mb-2">Manage favorites</h3>
						<p class="text-gray-400 leading-relaxed text-sm">Organize and manage your preferred relay connections.</p>
					</div>
				</div>
			</div>
			
			<!-- Recommend Relays -->
			<div class="group relative">
				<div class="h-full rounded-2xl p-6 border border-white/10 bg-black/40">
					<div class="relative z-10">
						<div class="relative mb-4">
							<div class="relative w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
								<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
								</svg>
							</div>
						</div>
						<h3 class="text-lg font-semibold text-white mb-2">Recommend & share</h3>
						<p class="text-gray-400 leading-relaxed text-sm">Share trusted relays with the community and discover new ones.</p>
					</div>
				</div>
			</div>
			
			<!-- Private Relay -->
			<div class="group relative">
				<div class="h-full rounded-2xl p-6 border border-white/10 bg-black/40">
					<div class="relative z-10">
						<div class="relative mb-4">
							<div class="relative w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
								<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
								</svg>
							</div>
						</div>
						<h3 class="text-lg font-semibold text-white mb-2">Private relay</h3>
						<p class="text-gray-400 leading-relaxed text-sm">Configure and manage your own private relay for enhanced security.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Device Compatibility Section -->
<section class="py-20 border-t border-white/10 bg-black">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl font-extrabold mb-6 text-white">
				Compatible with Android & Graphene
			</h2>
			<p class="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
				Zapstore works seamlessly with Android devices and GrapheneOS. All apps are distributed as APK files.
			</p>
		</div>
		
		<!-- Logos Section -->
		<div class="flex flex-col sm:flex-row items-center justify-center gap-12 lg:gap-20">
			<!-- Android Logo -->
			<div class="flex flex-col items-center text-center">
				<div class="w-24 h-24 mb-4 flex items-center justify-center">
					<div class="w-20 h-20 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
						<svg class="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
							<path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5976.416.416 0 00-.5976.1521L17.523 8.8889c-.9814-.5205-2.1088-.7993-3.2544-.7993s-2.273.2788-3.2544.7993L9.1699 5.2747a.416.416 0 00-.5976-.1521.416.416 0 00-.1521.5976l1.9973 3.4592C6.6889 11.1867 5.5 13.6586 5.5 16.3478v.7159c0 .5511.4482.9993.9993.9993h15.0014c.5511 0 .9993-.4482.9993-.9993v-.7159c0-2.6892-1.1889-5.1611-3.5234-7.0264"/>
						</svg>
					</div>
				</div>
				<h3 class="text-xl font-semibold text-white mb-2">Android</h3>
				<p class="text-gray-400 text-sm">Native compatibility</p>
			</div>
			
			<!-- Zapstore Logo -->
			<div class="flex flex-col items-center text-center">
				<div class="w-24 h-24 mb-4 flex items-center justify-center">
					<div class="w-20 h-20 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
						<img src={`${assets}/images/logo-dark.svg`} alt="Zapstore" class="h-10 w-auto" />
					</div>
				</div>
				<h3 class="text-xl font-semibold text-white mb-2">Zapstore</h3>
				<p class="text-gray-400 text-sm">Secure app distribution</p>
			</div>
			
			<!-- Graphene Logo -->
			<div class="flex flex-col items-center text-center">
				<div class="w-24 h-24 mb-4 flex items-center justify-center">
					<div class="w-20 h-20 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
						<img src={`${assets}/images/GrapheneOS-logo.jpg`} alt="GrapheneOS" class="h-10 w-auto" />
					</div>
				</div>
				<h3 class="text-xl font-semibold text-white mb-2">GrapheneOS</h3>
				<p class="text-gray-400 text-sm">Privacy-focused OS</p>
			</div>
		</div>
		
		<!-- Additional Info -->
		<div class="mt-16 text-center">
			<div class="inline-flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full bg-white/5">
				<div class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
				<span class="text-white/90 text-sm">All apps distributed as APK files</span>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-20 border-t border-white/10 bg-black">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div
			class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-12 lg:p-16"
		>
			<div class="relative z-10 max-w-2xl">
				<h2 class="text-3xl sm:text-4xl font-extrabold mb-4 text-white">
					Ready to join the open marketplace?
				</h2>
				<p class="text-lg text-gray-400 mb-8">
					With our growing catalog, you will never run out of great apps. Start discovering trusted applications today.
				</p>
				<div class="flex flex-col sm:flex-row gap-4">
					<a href="/apps" class="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400">
						Explore apps
						<ArrowRight class="ml-2 h-4 w-4" />
					</a>
					<a href="/docs/getting-started" class="inline-flex items-center justify-center rounded-md border border-white/10 px-6 py-3 text-sm font-medium text-white/90 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">
						Get started guide
					</a>
				</div>
			</div>
			<!-- subtle corners -->
			<div class="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl"></div>
			<div class="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl"></div>
		</div>
	</div>
</section>
