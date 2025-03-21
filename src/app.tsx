import { useState, useEffect } from 'preact/hooks';
import { FloatingBar } from './components/FloatingBar';
import { ImageUploadStep } from './components/ImageUploadStep';
import { StyleSelectionStep } from './components/StyleSelectionStep';
import { PromptInputStep } from './components/PromptInputStep';
import { ActionButtons } from './components/ActionButtons';
import { LoadingView } from './components/LoadingView';
import { ResultsView } from './components/ResultsView';

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

  const styleOptions = [
    { id: 'style1', imageUrl: 'https://picsum.photos/id/237/200' },
    { id: 'style2', imageUrl: 'https://picsum.photos/id/238/200' },
    { id: 'style3', imageUrl: 'https://picsum.photos/id/239/200' },
    { id: 'style4', imageUrl: 'https://picsum.photos/id/240/200' },
  ];

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
        setActiveStep(1);
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
        setActiveStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectStyleOption = (style: string) => {
    setSelectedStyle(style);
    setStyleImage(null); // Clear any uploaded style image
    setActiveStep(2);
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
    // Only close if clicking outside floating bar and expanded UI
    const target = e.target as HTMLElement;
    const floatingBar = document.getElementById('floating-bar');
    const expandedUI = document.getElementById('expanded-ui');

    if (isExpanded && floatingBar && expandedUI) {
      const isClickInsideModal =
        expandedUI.contains(target) || floatingBar.contains(target);
      if (!isClickInsideModal) {
        setIsExpanded(false);
      }
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
    <div className='font-sans antialiased bg-gray-50 min-h-screen'>
      {/* Floating Bar */}
      <FloatingBar onClick={toggleExpand} />

      {/* Background Blur */}
      <div
        className={`fixed inset-0 bg-amber-50 g-opacity-40 z-40 ${
          isExpanded ? 'block' : 'hidden'
        }`}
      ></div>

      {/* Expanded UI */}
      <div
        id='expanded-ui'
        className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-white rounded-xl shadow-xl z-50 overflow-hidden ${
          isExpanded ? 'block' : 'hidden'
        }`}
      >
        {/* Only show steps if not loading and no results yet */}
        {!isLoading && generatedImages.length === 0 && (
          <>
            {/* Step 1: Main Image Upload */}
            <ImageUploadStep
              title='Upload your favorite photo'
              stepNumber={1}
              isActive={activeStep === 0}
              onToggle={() => toggleStep(0)}
              uploadedImage={mainImage}
              onImageUpload={handleMainImageUpload}
              uploadLabel='Upload your image'
              uploadDescription='Select a high-quality image to transform'
              inputId='main-image-input'
            />

            {/* Step 2: Style Selection */}
            <StyleSelectionStep
              isActive={activeStep === 1}
              onToggle={() => toggleStep(1)}
              selectedStyle={selectedStyle}
              styleImage={styleImage}
              onStyleImageUpload={handleStyleImageUpload}
              onStyleSelect={selectStyleOption}
              styleOptions={styleOptions}
            />

            {/* Step 3: Prompt Input */}
            <PromptInputStep
              isActive={activeStep === 2}
              onToggle={() => toggleStep(2)}
              prompt={prompt}
              onPromptChange={handlePromptChange}
              activeTags={activeTags}
              onTagToggle={toggleTag}
              availableTags={availableTags}
            />

            {/* Action Buttons */}
            <ActionButtons onClear={handleClear} onDream={handleDream} />
          </>
        )}

        {/* Loading Indicator */}
        {isLoading && <LoadingView />}

        {/* Results Container */}
        {generatedImages.length > 0 && !isLoading && (
          <ResultsView
            generatedImages={generatedImages}
            selectedImageIndex={selectedGeneratedImage}
            onImageSelect={setSelectedGeneratedImage}
            onRegenerate={handleRegenerate}
            onSelectImage={handleSelect}
          />
        )}
      </div>
    </div>
  );
}
