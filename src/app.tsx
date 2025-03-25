import { useState, useEffect } from 'preact/hooks';
import { FloatingBar } from './components/FloatingBar';
import { ExpandedUI } from './components/ExpandedUI';

export function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [styleImage, setStyleImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const availableTags = ['Dainty', 'Minimalist', 'Bold', 'Vintage'];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMainImageUpload = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setMainImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStyleImageUpload = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setStyleImage(result);
        setSelectedStyle(null); // Clear any selected predefined style
      };
      reader.readAsDataURL(file);
    }
  };

  const selectStyleOption = (style: string) => {
    setSelectedStyle(style);
    setStyleImage(null); // Clear any uploaded style image
  };

  const toggleTag = (tag: string) => {
    setActiveTags(
      activeTags.includes(tag)
        ? activeTags.filter((t) => t !== tag)
        : [...activeTags, tag],
    );
  };

  const handlePromptChange = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    setPrompt(target.value);
  };

  const handleDream = () => {
    if (!mainImage) {
      alert('Please upload an image first');
      return;
    }

    if (!styleImage && !selectedStyle) {
      alert('Please select or upload a style image');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Generate mock images
      const mockImages = Array(4)
        .fill(0)
        .map(
          (_) =>
            `https://placekitten.com/400/400?image=${Math.floor(
              Math.random() * 1000,
            )}`,
        );

      setGeneratedImages(mockImages);
    }, 3000);
  };

  const handleClear = () => {
    setMainImage(null);
    setStyleImage(null);
    setSelectedStyle(null);
    setPrompt('');
    setActiveTags([]);
    setGeneratedImages([]);
    setIsExpanded(false);
  };

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
      <FloatingBar onClick={toggleExpand} />

      {/* Background Blur */}
      <div
        id='modal-overlay'
        className={`fixed inset-0 bg-amber-50/60 z-40 ${
          isExpanded ? 'block' : 'hidden'
        }`}
        onClick={handleOutsideClick}
      ></div>

      {/* Expanded UI */}
      <ExpandedUI
        isExpanded={isExpanded}
        generatedImages={generatedImages}
        mainImage={mainImage}
        handleMainImageUpload={handleMainImageUpload}
        setMainImage={setMainImage}
        selectedStyle={selectedStyle}
        styleImage={styleImage}
        handleStyleImageUpload={handleStyleImageUpload}
        selectStyleOption={selectStyleOption}
        setStyleImage={setStyleImage}
        setSelectedStyle={setSelectedStyle}
        prompt={prompt}
        handlePromptChange={handlePromptChange}
        activeTags={activeTags}
        toggleTag={toggleTag}
        availableTags={availableTags}
        handleClear={handleClear}
        handleDream={handleDream}
      />
    </div>
  );
}
