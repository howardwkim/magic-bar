import { useState } from 'preact/hooks';
import { ResultsView } from './ResultsView';
import { LoadingView } from './LoadingView';
import { ImageUploadStep } from './ImageUploadStep';
import { StyleSelectionStep } from './StyleSelectionStep';
import { PromptInputStep } from './PromptInputStep';
import { ActionButtons } from './ActionButtons';

const styleOptions = [
  {
    id: 'impressionism',
    imageUrl:
      'https://images.unsplash.com/photo-1577083552431-6e5c0198d8b3?w=400&h=400&fit=crop',
    label: 'Impressionism',
  },
  {
    id: 'pop-art',
    imageUrl:
      'https://images.unsplash.com/photo-1577083552431-6e5c0198d8b3?w=400&h=400&fit=crop',
    label: 'Pop Art',
  },
  {
    id: 'minimalism',
    imageUrl:
      'https://images.unsplash.com/photo-1577083552431-6e5c0198d8b3?w=400&h=400&fit=crop',
    label: 'Minimalism',
  },
  {
    id: 'art-deco',
    imageUrl:
      'https://images.unsplash.com/photo-1577083552431-6e5c0198d8b3?w=400&h=400&fit=crop',
    label: 'Art Deco',
  },
  {
    id: 'watercolor',
    imageUrl:
      'https://images.unsplash.com/photo-1577083552431-6e5c0198d8b3?w=400&h=400&fit=crop',
    label: 'Watercolor',
  },
  {
    id: 'abstract',
    imageUrl:
      'https://images.unsplash.com/photo-1577083552431-6e5c0198d8b3?w=400&h=400&fit=crop',
    label: 'Abstract',
  },
];

interface ExpandedUIProps {
  activeTags: string[];
  availableTags: string[];
  generatedImages: string[];
  handleClear: () => void;
  handleDream: () => void;
  handleMainImageUpload: (e: Event) => void;
  handlePromptChange: (e: Event) => void;
  handleStyleImageUpload: (e: Event) => void;
  isExpanded: boolean;
  mainImage: string | null;
  prompt: string;
  selectStyleOption: (style: string) => void;
  selectedStyle: string | null;
  setMainImage: (image: string | null) => void;
  setSelectedStyle: (style: string | null) => void;
  setStyleImage: (image: string | null) => void;
  styleImage: string | null;
  toggleTag: (tag: string) => void;
}

export function ExpandedUI({
  activeTags,
  availableTags,
  generatedImages,
  handleClear,
  handleDream,
  handleMainImageUpload,
  handlePromptChange,
  handleStyleImageUpload,
  isExpanded,
  mainImage,
  prompt,
  selectStyleOption,
  selectedStyle,
  setMainImage,
  setSelectedStyle,
  setStyleImage,
  styleImage,
  toggleTag,
}: ExpandedUIProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGeneratedImage, setSelectedGeneratedImage] = useState<
    number | null
  >(null);

  const toggleStep = (stepIndex: number) => {
    setActiveStep(activeStep === stepIndex ? -1 : stepIndex);
  };

  const handleRegenerate = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
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

  return (
    <div
      id='expanded-ui'
      className={`fixed top-[50px] inset-x-0 mx-auto w-[90%] max-w-md bg-white rounded-xl shadow-xl z-50 
          transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? 'block' : 'hidden'
          }`}
      style={{
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
      }}
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
            onClear={() => setMainImage(null)}
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
            onClear={() => {
              setStyleImage(null);
              setSelectedStyle(null);
            }}
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
            mainImage={mainImage}
            styleImage={styleImage}
            selectedStyle={selectedStyle}
            styleOptions={styleOptions}
          />

          {/* Action Buttons */}
          <ActionButtons
            onClear={handleClear}
            onDream={handleDream}
            disabled={!mainImage || (!styleImage && !selectedStyle)}
          />
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
  );
}
