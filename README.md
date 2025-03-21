# Magic Bar Shopify Integration Guide

## Overview
This guide will help you integrate the Magic Bar into your Shopify store. The Magic Bar adds a floating search and navigation bar to your site.

## Installation Steps

### 1. Log in to your Shopify Admin Panel

Access your Shopify store admin panel.

### 2. Navigate to Themes

Go to the "Online Store" > "Themes" section.

### 3. Edit your active theme

Click on the "Actions" button for your active theme and select "Edit code".

### 4. Add the Magic Bar script

Find the `theme.liquid` file (under Layout) and paste the following code just before the closing `</body>` tag:

```html
<!-- Magic Bar Integration -->
<script>
(function () {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://mementum-test.web.app/bootloader.min.js';
  script.async = true;
  document.body.appendChild(script);
})();
</script>
<!-- End Magic Bar Integration -->
```

### 5. Save your changes

Click the "Save" button to apply your changes.

## Verification

After saving, visit your store to verify that the Magic Bar is loading correctly. It should appear as a floating bar on your site.

## Troubleshooting

If the Magic Bar doesn't appear:
1. Check your browser console for any JavaScript errors
2. Ensure the bootloader URL is correct
3. Verify that your theme.liquid file contains the integration code
4. Clear your browser cache and refresh the page

For additional support, please contact our support team. 