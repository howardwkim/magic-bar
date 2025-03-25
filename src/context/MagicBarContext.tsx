import { createContext, useContext, useState, ReactNode } from 'preact/compat';

interface MagicBarContextType {
  // State
  mainImage: string | null;
  styleImage: string | null;
  generatedImages: string[];

  // Actions
  setMainImage: (image: string | null) => void;
  setStyleImage: (image: string | null) => void;
  setGeneratedImages: (images: string[]) => void;

  // Handlers
  handleMainImageUpload: (e: Event) => void;
  handleStyleImageUpload: (e: Event) => void;
  handleDream: () => void;
}

const MagicBarContext = createContext<MagicBarContextType | null>(null);

export function MagicBarProvider({ children }: { children: ReactNode }) {
  // State
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [styleImage, setStyleImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  // Handlers
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
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDream = () => {
    if (!mainImage) {
      alert('Please upload an image first');
      return;
    }

    if (!styleImage) {
      alert('Please upload a style image');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Generate mock images
      const mockImages = Array(4)
        .fill(0)
        .map(
          (_) =>
            `https://cataas.com/cat?width=400&height=400&t=${Math.floor(
              Math.random() * 1000,
            )}`,
        );

      setGeneratedImages(mockImages);
    }, 3000);
  };

  const value = {
    // State
    mainImage,
    styleImage,
    generatedImages,

    // Actions
    setMainImage,
    setStyleImage,
    setGeneratedImages,

    // Handlers
    handleMainImageUpload,
    handleStyleImageUpload,
    handleDream,
  };

  return (
    <MagicBarContext.Provider value={value}>
      {children}
    </MagicBarContext.Provider>
  );
}

export function useMagicBar() {
  const context = useContext(MagicBarContext);
  if (!context) {
    throw new Error('useMagicBar must be used within a MagicBarProvider');
  }
  return context;
}
