# Magic Bar Shopify Integration Guide

This document explains how to integrate the Magic Bar application into your Shopify theme.

## Step 1: Host the Magic Bar Assets

First, ensure that the Magic Bar assets are hosted on a CDN or your own server. The build process will generate:

- `magic-bar.umd.js` - The bundled JavaScript file
- `magic-bar.css` - The compiled CSS file

Upload these files to your hosting provider and note their URLs.

## Step 2: Update the Bootloader Configuration

Open the `bootloader.js` file and update the configuration with your asset URLs:

```js
const config = {
  appName: 'MagicBar',
  version: '1.0.0',
  cssUrl: 'https://your-domain.com/path/to/magic-bar.css',
  jsUrl: 'https://your-domain.com/path/to/magic-bar.umd.js',
  containerId: 'magic-bar-container'
};
```

## Step 3: Add the Bootloader to your Shopify Theme

1. Log in to your Shopify admin
2. Go to **Online Store** > **Themes**
3. Find your active theme and click **Actions** > **Edit code**
4. In the theme editor, locate `theme.liquid`
5. Add the bootloader script just before the closing `</body>` tag:

```html
<!-- Magic Bar Bootloader -->
<script>
  // Paste the minified contents of bootloader.js here
  (function(){/* bootloader code will be here */})();
</script>
```

Alternatively, you can host the bootloader on your server and include it as an external script:

```html
<!-- Magic Bar Bootloader -->
<script src="https://your-domain.com/path/to/bootloader.js"></script>
```

## Step 4: Test the Integration

1. Save your theme changes
2. Visit your Shopify store
3. You should see the Magic Bar appear on your site

## Troubleshooting

If the Magic Bar doesn't appear:

1. Check the browser console for any errors
2. Ensure all URLs in the bootloader configuration are correct
3. Verify that the assets are correctly hosted and accessible
4. Make sure there are no JavaScript conflicts with other scripts on your site

For further assistance, contact our support team.

## Advanced Configuration

The bootloader can be customized with additional options:

- Add initialization parameters
- Configure appearance settings
- Set up event tracking
- Integrate with your Shopify checkout

Contact our development team for custom integration support. 