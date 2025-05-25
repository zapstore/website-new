# Quick Start Guide

Get up and running with Zapstore in just 5 minutes. This guide will walk you through the basics of discovering, installing, and managing apps.

## Prerequisites

Before you begin, make sure you have:

- A nostr keypair (we'll help you create one if needed)
- A Lightning wallet for payments (optional, but recommended)
- Node.js 18+ installed (for developer tools)

## Step 1: Install the Zapstore CLI

The easiest way to get started is with our command-line interface:

```bash
npm install -g @zapstore/cli
```

Or if you prefer using a package manager:

```bash
# Using pnpm
pnpm add -g @zapstore/cli

# Using yarn
yarn global add @zapstore/cli
```

## Step 2: Initialize Your Configuration

Run the initialization command to set up your Zapstore configuration:

```bash
zapstore init
```

This will prompt you to:

1. Create or import a nostr keypair
2. Choose your preferred relay servers
3. Select trusted curators (optional)
4. Configure your Lightning wallet (optional)

## Step 3: Discover Apps

Browse the available apps in the marketplace:

```bash
# List all available apps
zapstore list

# Search for specific apps
zapstore search "productivity"

# Filter by category
zapstore list --category development

# Show apps recommended by your network
zapstore discover
```

## Step 4: Install Your First App

Once you've found an app you want to install:

```bash
# Install an app by ID
zapstore install app-id

# Install with specific version
zapstore install app-id@1.2.3

# Install multiple apps
zapstore install app1 app2 app3
```

The CLI will:
- Verify the app's cryptographic signature
- Check compatibility with your system
- Handle any payment requirements
- Install the app to your chosen location

## Step 5: Manage Installed Apps

Keep your apps up to date and organized:

```bash
# List installed apps
zapstore list --installed

# Update all apps
zapstore update

# Update specific app
zapstore update app-id

# Remove an app
zapstore uninstall app-id
```

## Using the SDK

For developers who want to integrate Zapstore into their applications:

```javascript
import { Zapstore } from '@zapstore/sdk';

// Initialize the client
const store = new Zapstore({
  relays: ['wss://relay.zapstore.app'],
  privateKey: process.env.NOSTR_PRIVATE_KEY
});

// Discover apps
const apps = await store.discover({
  category: 'productivity',
  limit: 10
});

// Install an app
await store.install(apps[0].id);

// Handle payments
store.on('payment:required', async (invoice) => {
  // Process Lightning invoice
  await payInvoice(invoice);
});
```

## Next Steps

Now that you have Zapstore set up:

- [Browse the App Catalog](/apps) to discover new applications
- [Read the SDK Documentation](/docs/sdk) to build integrations
- [Join our Community](https://discord.gg/zapstore) for support and updates
- [Publish Your Own Apps](/docs/publishing) to the marketplace

## Troubleshooting

### Common Issues

**Installation fails with permission errors**
```bash
# On macOS/Linux, you may need sudo
sudo npm install -g @zapstore/cli
```

**Cannot connect to relays**
- Check your internet connection
- Try using different relay servers
- Ensure WebSocket connections aren't blocked

**Payment failures**
- Verify your Lightning wallet is connected
- Ensure you have sufficient balance
- Check that your wallet supports LNURL

### Getting Help

If you encounter any issues:

1. Check our [FAQ](/docs/faq)
2. Search [existing issues](https://github.com/zapstore/zapstore/issues)
3. Ask in our [Discord community](https://discord.gg/zapstore)
4. Open a [GitHub issue](https://github.com/zapstore/zapstore/issues/new) 