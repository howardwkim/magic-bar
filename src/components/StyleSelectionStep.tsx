import { JSX } from 'preact';
import { PhotoUpload } from './PhotoUpload';

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
            <div className='flex gap-3 overflow-x-auto pb-2'>
              {/* Predefined styles */}
              {styleOptions.map((style) => (
                <div
                  key={style.id}
                  className={`flex-shrink-0 w-24 h-24 rounded-lg bg-cover bg-center cursor-pointer border-2 ${
                    selectedStyle === style.id
                      ? 'border-blue-500'
                      : 'border-gray-200'
                  }`}
                  style={{ backgroundImage: `url(${style.imageUrl})` }}
                  onClick={() => onStyleSelect(style.id)}
                ></div>
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
