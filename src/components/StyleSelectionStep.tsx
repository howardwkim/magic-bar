import { JSX } from 'preact';
import { PhotoUpload } from './PhotoUpload';

interface StyleOption {
  id: string;
  imageUrl: string;
  label: string;
}

interface StyleSelectionStepProps {
  isActive: boolean;
  onToggle: () => void;
  selectedStyle: string | null;
  styleImage: string | null;
  onStyleImageUpload: JSX.GenericEventHandler<HTMLInputElement>;
  onStyleSelect: (style: string) => void;
  styleOptions: StyleOption[];
  onClear?: () => void;
}

export function StyleSelectionStep({
  isActive,
  onToggle,
  selectedStyle,
  styleImage,
  onStyleImageUpload,
  onStyleSelect,
  styleOptions,
  onClear,
}: StyleSelectionStepProps) {
  return (
    <div className='border-b border-gray-200 overflow-hidden'>
      <div
        className='flex justify-between items-center p-4 cursor-pointer bg-white'
        onClick={onToggle}
      >
        <div className='flex items-start'>
          <span className='font-bold mr-2'>2</span>
          <span>Select a style</span>
          <span className='text-red-500 text-sm leading-none align-super'>
            •
          </span>
        </div>
        <div className={`transition-transform ${isActive ? 'rotate-180' : ''}`}>
          ▼
        </div>
      </div>

      {isActive && (
        <div className='p-4'>
          <div className='mb-6'>
            <h3 className='text-sm font-medium text-gray-900 mb-3'>
              Preset Styles
            </h3>
            <div className='grid grid-cols-3 gap-4'>
              {/* Predefined styles */}
              {styleOptions.map((style) => (
                <div key={style.id} className='flex flex-col items-center'>
                  <div
                    className={`w-full aspect-square rounded-lg bg-cover bg-center cursor-pointer mb-2 transition-all duration-200 !border-2 ${
                      selectedStyle === style.id
                        ? '!border-blue-500 !ring-2 !ring-blue-200'
                        : '!border-gray-300 hover:!border-gray-400'
                    }`}
                    style={{ backgroundImage: `url(${style.imageUrl})` }}
                    onClick={() => onStyleSelect(style.id)}
                  ></div>
                  <span className='text-xs text-gray-600 text-center'>
                    {style.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className='text-sm font-medium text-gray-900 mb-3'>
              Custom Style
            </h3>
            <PhotoUpload
              label='Upload style image'
              description="Use an image with a style you'd like to apply"
              inputId='style-image-input'
              onImageUpload={onStyleImageUpload}
              uploadedImage={styleImage}
              onClear={onClear}
            />
          </div>
        </div>
      )}
    </div>
  );
}
