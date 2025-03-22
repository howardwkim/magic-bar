import { JSX } from 'preact';
import { PhotoUpload } from './PhotoUpload';

interface ImageUploadStepProps {
  title: string;
  stepNumber: number;
  isActive: boolean;
  onToggle: () => void;
  uploadedImage: string | null;
  onImageUpload: JSX.GenericEventHandler<HTMLInputElement>;
  uploadLabel: string;
  uploadDescription: string;
  inputId: string;
  onClear?: () => void;
}

export function ImageUploadStep({
  title,
  stepNumber,
  isActive,
  onToggle,
  uploadedImage,
  onImageUpload,
  uploadLabel,
  uploadDescription,
  inputId,
  onClear,
}: ImageUploadStepProps) {
  return (
    <div className='border-b border-gray-200 overflow-hidden'>
      <div
        className='flex justify-between items-center p-4 cursor-pointer bg-white'
        onClick={onToggle}
      >
        <div className='flex items-start'>
          <span className='font-bold mr-2'>{stepNumber}</span>
          <span>{title}</span>
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
          <PhotoUpload
            label={uploadLabel}
            description={uploadDescription}
            inputId={inputId}
            onImageUpload={onImageUpload}
            uploadedImage={uploadedImage}
            onClear={onClear}
          />
        </div>
      )}
    </div>
  );
}
