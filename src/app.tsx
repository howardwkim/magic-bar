import { useState, useEffect } from 'preact/hooks';
import { FloatingBar } from './components/FloatingBar';
import { ExpandedUI } from './components/ExpandedUI';

export function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [styleImage, setStyleImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedGeneratedImage, setSelectedGeneratedImage] = useState<
    number | null
  >(null);

  const availableTags = ['Dainty', 'Minimalist', 'Bold', 'Vintage'];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleStep = (stepIndex: number) => {
    setActiveStep(activeStep === stepIndex ? -1 : stepIndex);
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

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

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

  const handleRegenerate = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      // Generate new mock images
      const mockImages = Array(4)
        .fill(0)
        .map(
          (_) =>
            `https://placekitten.com/400/400?image=${Math.floor(
              Math.random() * 1000,
            )}`,
        );

      setGeneratedImages(mockImages);
      setSelectedGeneratedImage(null);
    }, 3000);
  };

  const handleSelect = () => {
    if (selectedGeneratedImage === null) {
      alert('Please select an image first');
      return;
    }

    alert('Selected image would now be passed to checkout!');
    // In the real implementation, this would add the image to cart or trigger checkout
  };

  const handleClear = () => {
    setMainImage(null);
    setStyleImage(null);
    setSelectedStyle(null);
    setPrompt('');
    setActiveTags([]);
    setGeneratedImages([]);
    setSelectedGeneratedImage(null);
    setActiveStep(0);
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
        isLoading={isLoading}
        generatedImages={generatedImages}
        activeStep={activeStep}
        toggleStep={toggleStep}
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
        selectedGeneratedImage={selectedGeneratedImage}
        setSelectedGeneratedImage={setSelectedGeneratedImage}
        handleRegenerate={handleRegenerate}
        handleSelect={handleSelect}
      />
    </div>
  );
}
