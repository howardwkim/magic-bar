# Magic Bar Bootloader

The Magic Bar bootloader is a lightweight script that loads the Magic Bar application into a Shopify store. It handles resource loading and initialization of the application without requiring changes to the main Shopify theme code.

## How the Bootloader Works

1. **Initialization**: The bootloader is loaded by the Shopify theme and automatically initializes when the DOM is ready.

2. **Container Creation**: It creates a dedicated container element for the Magic Bar application.

3. **Resource Loading**: The bootloader loads the necessary CSS and JavaScript resources asynchronously.

4. **Application Initialization**: Once resources are loaded, it initializes the Magic Bar application by calling the global `MagicBar.init()` function.

## Key Components

### Bootloader Files

- `bootloader.js` - Main bootloader script (unminified)
- `bootloader.min.js` - Minified version for production use
- `shopify-integration.md` - Documentation for Shopify integration

### Application Entry Point

- `src/index.js` - Exposes the global `MagicBar` object with an initialization method

### Build Configuration

- `vite.config.ts` - Configured to build the app as a library
- `build.sh` - Script to package everything for deployment

## Integration Process

1. Build the application with `npm run build:prod`
2. Upload the generated files to your hosting provider
3. Update the URLs in the bootloader configuration
4. Add the bootloader to your Shopify theme

## Configuration Options

```javascript
const config = {
  appName: 'MagicBar',
  version: '1.0.0',
  cssUrl: 'https://yourdomain.com/magic-bar/styles.css',
  jsUrl: 'https://yourdomain.com/magic-bar/bundle.js',
  containerId: 'magic-bar-container'
};
```

## Deployment

For deployment, run `./build.sh` which will:
1. Build the application with Vite
2. Copy bootloader files to the distribution directory
3. Create a deployment package with all necessary files
4. Generate a zip archive for easy deployment

## For Developers

When extending the bootloader:
- Maintain the asynchronous loading pattern to ensure proper resource loading
- Keep the bootloader as lightweight as possible
- Follow the existing error handling patterns 