import { useEffect, useState } from 'preact/hooks';
import { FloatingBar } from './components/FloatingBar';
import { ExpandedUI } from './components/ExpandedUI';
import { MagicBarProvider } from './context/MagicBarContext';

function AppContent() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOutsideClick = (e: MouseEvent) => {
    // Only close if clicking the background overlay
    const target = e.target as HTMLElement;
    const overlay = document.getElementById('modal-overlay');

    if (isExpanded && overlay && target === overlay) {
      setIsExpanded(false);
    }
  };

  // Set up outside click handler
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isExpanded]);

  return (
    <div>
      {/* Floating Bar */}
      <FloatingBar onClick={() => setIsExpanded(!isExpanded)} />

      {/* Background Blur */}
      <div
        id='modal-overlay'
        className={`fixed inset-0 bg-amber-50/60 z-40 ${
          isExpanded ? 'block' : 'hidden'
        }`}
        onClick={handleOutsideClick}
      ></div>

      {/* Expanded UI */}
      <ExpandedUI isExpanded={isExpanded} />
    </div>
  );
}

export function App() {
  return (
    <MagicBarProvider>
      <AppContent />
    </MagicBarProvider>
  );
}
