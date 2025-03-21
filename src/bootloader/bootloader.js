// Magic Bar Bootloader for Shopify Integration
(function () {
  // Configuration
  const config = {
    appName: 'MagicBar',
    version: '1.0.0',
    cssUrl: './dist/magic-bar.css',
    jsUrl: './dist/magic-bar.js',
    containerId: 'magic-bar-container',
  };

  // Create container for the app
  function createContainer() {
    const container = document.createElement('div');
    container.id = config.containerId;
    document.body.appendChild(container);
    return container;
  }

  // Load CSS
  function loadCSS(url) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;

      link.onload = () => {
        console.log('CSS loaded successfully:', url);
        resolve();
      };
      link.onerror = (e) => {
        console.error('Failed to load CSS:', url, e);
        reject(new Error(`Failed to load CSS: ${url}`));
      };

      document.head.appendChild(link);
    });
  }

  // Load JS
  function loadJS(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;

      script.onload = () => {
        console.log('JavaScript loaded successfully:', url);
        resolve();
      };
      script.onerror = (e) => {
        console.error('Failed to load JavaScript:', url, e);
        reject(new Error(`Failed to load JavaScript: ${url}`));
      };

      document.body.appendChild(script);
    });
  }

  // Initialize the app
  async function init() {
    try {
      console.log('Initializing Magic Bar...');

      // Create container
      const container = createContainer();

      // Load CSS first
      console.log('Loading CSS from:', config.cssUrl);
      await loadCSS(config.cssUrl);

      // Then load JavaScript
      console.log('Loading JS from:', config.jsUrl);
      await loadJS(config.jsUrl);

      // Initialize the app
      console.log('Checking for MagicBar object...');
      if (
        window[config.appName] &&
        typeof window[config.appName].init === 'function'
      ) {
        console.log('Initializing MagicBar app...');
        window[config.appName].init(container);
        console.log('MagicBar initialized successfully!');
      } else {
        console.error(
          `${config.appName} application not found or init method not available`,
        );
      }
    } catch (error) {
      console.error('Failed to initialize Magic Bar:', error);
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
