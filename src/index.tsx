// Main entry point for the Magic Bar application
import { render } from 'preact';
import { App } from './app.tsx';
import './index.css';

// Define the global interface
declare global {
  interface Window {
    MagicBar: {
      init: (container: HTMLElement) => void;
    };
  }
}

// Create a global namespace for the application
window.MagicBar = {
  /**
   * Initialize the Magic Bar application
   * @param {HTMLElement} container - The DOM element to render the app into
   */
  init: function (container: HTMLElement) {
    // If no container provided, create one
    if (!container) {
      container = document.createElement('div');
      container.id = 'magic-bar-container';
      document.body.appendChild(container);
    }

    // Get the Shadow Root if we're in a Shadow DOM context
    const shadowRoot = container.getRootNode() as ShadowRoot;
    const isShadowDOM = shadowRoot instanceof ShadowRoot;

    // Create a wrapper div for the app
    const appWrapper = document.createElement('div');
    appWrapper.id = 'magic-bar-app';
    container.appendChild(appWrapper);

    // Render the app into the wrapper
    render(<App />, appWrapper);

    console.log(
      'Magic Bar initialized in',
      isShadowDOM ? 'Shadow DOM' : 'main document',
    );
  },
};

// Auto-initialize if this script is loaded directly (for development)
if (import.meta.env.DEV) {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('app') || document.body;
    window.MagicBar.init(container);
  });
}
