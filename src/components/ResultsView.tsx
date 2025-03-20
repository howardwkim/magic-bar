interface ResultsViewProps {
  generatedImages: string[];
  selectedImageIndex: number | null;
  onImageSelect: (index: number) => void;
  onRegenerate: () => void;
  onSelectImage: () => void;
}

export function ResultsView({
  generatedImages,
  selectedImageIndex,
  onImageSelect,
  onRegenerate,
  onSelectImage,
}: ResultsViewProps) {
  return (
    <div className='p-5'>
      <h3 className='font-medium mb-3'>Select your favorite creation</h3>
      <div className='grid grid-cols-2 gap-3 mb-4'>
        {generatedImages.map((img, idx) => (
          <div
            key={idx}
            className={`rounded-lg overflow-hidden aspect-square cursor-pointer ${
              selectedImageIndex === idx ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onImageSelect(idx)}
          >
            <img
              src={img}
              alt={`Generated design ${idx + 1}`}
              className='w-full h-full object-cover'
            />
          </div>
        ))}
      </div>
      <div className='flex gap-3 mt-4'>
        <button
          className='flex-1 bg-gray-100 rounded-lg py-3 uppercase text-sm font-medium'
          onClick={onRegenerate}
        >
          Regenerate
        </button>
        <button
          className='flex-1 bg-black text-white rounded-lg py-3 text-sm font-medium'
          onClick={onSelectImage}
        >
          Select & Checkout
        </button>
      </div>
    </div>
  );
}
