import { useState } from 'preact/hooks';
import { FloatingBar } from './components/FloatingBar';
import { ExpandedUI } from './components/ExpandedUI';
import { MagicBarProvider } from './context/MagicBarContext';

function AppContainer() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking directly on the overlay
    if (e.target === e.currentTarget) {
      setIsExpanded(false);
    }
  };

  return (
    <div>
      {/* Floating Bar */}
      <FloatingBar onClick={() => setIsExpanded(!isExpanded)} />

      {/* Background Blur */}
      {isExpanded && (
        <div
          id='modal-overlay'
          className='fixed inset-0 bg-amber-50/60 z-40'
          onClick={handleOverlayClick}
        ></div>
      )}

      {/* Expanded UI */}
      <ExpandedUI isExpanded={isExpanded} />
    </div>
  );
}

export function App() {
  return (
    <MagicBarProvider>
      <AppContainer />
    </MagicBarProvider>
  );
}
