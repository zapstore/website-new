<script>
  import { page } from '$app/stores';
  import { Menu, X } from 'lucide-svelte';
  import { assets } from '$app/paths';
  
  let mobileMenuOpen = false;
  
  let links = [
    { name: "Home", href: "/" },
    { name: "Browse Apps", href: "/apps" },
    { name: "For Developers", href: "/developers" },
    { name: "Documentation", href: "/docs" },
    { name: "Blog", href: "/blog" }
  ];
</script>

<nav class="navbar">
  <div class="logo">
    <a href="/" class="flex items-center space-x-3">
      <img src={`${assets}/images/logo-dark.svg`} alt="Zapstore" class="h-6 w-auto" />
      <span class="logo-text">Zapstore</span>
    </a>
  </div>
  
  <!-- Desktop Navigation -->
  <ul class="nav-links">
    {#each links as link}
      <li>
        <a 
          href={link.href}
          class:active={$page.url.pathname === link.href}
        >
          {link.name}
        </a>
      </li>
    {/each}
  </ul>
  
  <!-- Mobile menu button -->
  <button
    type="button"
    class="mobile-menu-btn"
    on:click={() => mobileMenuOpen = !mobileMenuOpen}
  >
    <span class="sr-only">Open main menu</span>
    {#if mobileMenuOpen}
      <X class="h-6 w-6" />
    {:else}
      <Menu class="h-6 w-6" />
    {/if}
  </button>
  
  <!-- Mobile menu -->
  {#if mobileMenuOpen}
    <div class="mobile-menu">
      {#each links as link}
        <a
          href={link.href}
          class="mobile-link"
          class:active={$page.url.pathname === link.href}
          on:click={() => mobileMenuOpen = false}
        >
          {link.name}
        </a>
      {/each}
      <a 
        href="/apps" 
        class="mobile-cta"
        on:click={() => mobileMenuOpen = false}
      >
        Get Started
      </a>
    </div>
  {/if}
</nav>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #111;
    color: #fff;
    position: sticky;
    top: 0;
    z-index: 50;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .logo a {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
  }

  .logo-text {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;
  }

  .nav-links li a {
    text-decoration: none;
    color: #ccc;
    transition: color 0.2s ease;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .nav-links li a:hover,
  .nav-links li a.active {
    color: #fff;
  }

  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    color: #ccc;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.375rem;
  }

  .mobile-menu-btn:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  .mobile-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #111;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .mobile-link {
    display: block;
    padding: 0.75rem;
    color: #ccc;
    text-decoration: none;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
  }

  .mobile-link:hover,
  .mobile-link.active {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  .mobile-cta {
    display: block;
    margin-top: 1rem;
    padding: 0.75rem;
    background: #3b82f6;
    color: #fff;
    text-decoration: none;
    border-radius: 0.375rem;
    text-align: center;
    font-weight: 500;
    transition: background 0.2s ease;
  }

  .mobile-cta:hover {
    background: #2563eb;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
    
    .mobile-menu-btn {
      display: block;
    }
    
    .mobile-menu {
      display: flex;
    }
  }
</style>