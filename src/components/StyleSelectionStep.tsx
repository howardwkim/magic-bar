import { JSX } from 'preact';

interface StyleOption {
  id: string;
  imageUrl: string;
}

interface StyleSelectionStepProps {
  isActive: boolean;
  onToggle: () => void;
  selectedStyle: string | null;
  styleImage: string | null;
  onStyleImageUpload: JSX.GenericEventHandler<HTMLInputElement>;
  onStyleSelect: (style: string) => void;
  styleOptions: StyleOption[];
}

export function StyleSelectionStep({
  isActive,
  onToggle,
  selectedStyle,
  styleImage,
  onStyleImageUpload,
  onStyleSelect,
  styleOptions,
}: StyleSelectionStepProps) {
  return (
    <div className='border-b border-gray-200 overflow-hidden'>
      <div
        className='flex justify-between items-center p-4 cursor-pointer bg-white'
        onClick={onToggle}
      >
        <div>
          <span className='font-bold mr-2'>2</span>
          <span>Select a style</span>
        </div>
        <div className={`transition-transform ${isActive ? 'rotate-180' : ''}`}>
          ▼
        </div>
      </div>

      {isActive && (
        <div className='p-4'>
          <div className='grid grid-cols-2 gap-3 mb-4'>
            {/* Predefined styles */}
            {styleOptions.map((style) => (
              <div
                key={style.id}
                className={`rounded-lg aspect-square bg-cover bg-center cursor-pointer border ${
                  selectedStyle === style.id
                    ? 'border-2 border-blue-500'
                    : 'border-gray-200'
                }`}
                style={{ backgroundImage: `url(${style.imageUrl})` }}
                onClick={() => onStyleSelect(style.id)}
              ></div>
            ))}
          </div>

          <p className='mb-2'>Or upload your own style image:</p>
          <input
            type='file'
            id='style-image-input'
            className='hidden'
            accept='image/*'
            onChange={onStyleImageUpload}
          />

          {!styleImage ? (
            <div
              className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer'
              onClick={() =>
                document.getElementById('style-image-input')?.click()
              }
            >
              <div className='text-2xl mb-2'>+</div>
              <div>Upload style image</div>
              <div className='text-xs text-gray-500'>
                Use an image with a style you'd like to apply
              </div>
            </div>
          ) : (
            <div className='mt-4'>
              <img
                src={styleImage}
                alt='Style Image'
                className='max-w-full rounded-lg'
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
