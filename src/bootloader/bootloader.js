// Magic Bar Bootloader for Shopify Integration
(function () {
  // Configuration
  const config = {
    appName: 'MagicBar',
    version: '1.0.0',
    // The baseUrl will be replaced during build
    baseUrl: '__MAGIC_BAR_BASE_URL__',
    containerId: 'magic-bar-container',
  };

  // Create container for the app with Shadow DOM for style isolation
  function createContainer() {
    const hostContainer = document.createElement('div');
    hostContainer.id = config.containerId;

    // Attach Shadow DOM to the container
    const shadowRoot = hostContainer.attachShadow({ mode: 'open' });

    // Create an inner container inside the Shadow DOM
    const innerContainer = document.createElement('div');
    innerContainer.id = `${config.containerId}-inner`;
    shadowRoot.appendChild(innerContainer);

    document.body.appendChild(hostContainer);
    return { hostContainer, shadowRoot, innerContainer };
  }

  // Load CSS within Shadow DOM
  function loadCSS(url, shadowRoot) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`));
      shadowRoot.appendChild(link);
    });
  }

  // Load JS
  function loadJS(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error(`Failed to load JavaScript: ${url}`));
      document.body.appendChild(script);
    });
  }

  // Initialize the app
  async function init() {
    try {
      console.log('Initializing Magic Bar...');

      // Create container with Shadow DOM
      const { hostContainer, shadowRoot, innerContainer } = createContainer();

      // Load CSS within Shadow DOM
      const cssUrl = `${config.baseUrl}/magic-bar.css`;
      console.log('Loading CSS from:', cssUrl);
      await loadCSS(cssUrl, shadowRoot);

      // Then load JavaScript
      const jsUrl = `${config.baseUrl}/magic-bar.js`;
      console.log('Loading JS from:', jsUrl);
      await loadJS(jsUrl);

      // Initialize the app
      console.log('Checking for MagicBar object...');
      if (
        window[config.appName] &&
        typeof window[config.appName].init === 'function'
      ) {
        console.log('Initializing MagicBar app...');
        window[config.appName].init(innerContainer, shadowRoot);
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
