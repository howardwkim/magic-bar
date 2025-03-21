import { JSX } from 'preact';

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
}: ImageUploadStepProps) {
  return (
    <div className='border-b border-gray-200 overflow-hidden'>
      <div
        className='flex justify-between items-center p-4 cursor-pointer bg-white'
        onClick={onToggle}
      >
        <div>
          <span className='font-bold mr-2'>{stepNumber}</span>
          <span>{title}</span>
          {/* <span className='text-xs text-gray-500 ml-1'>(Required)</span> */}
        </div>
        <div className={`transition-transform ${isActive ? 'rotate-180' : ''}`}>
          ▼
        </div>
      </div>

      {isActive && (
        <div className='p-4'>
          <input
            type='file'
            id={inputId}
            className='hidden'
            accept='image/*'
            onChange={onImageUpload}
          />

          {!uploadedImage ? (
            <div
              className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer'
              onClick={() => document.getElementById(inputId)?.click()}
            >
              <div className='text-2xl mb-2'>+</div>
              <div>{uploadLabel}</div>
              <div className='text-xs text-gray-500'>{uploadDescription}</div>
            </div>
          ) : (
            <div className='mt-4'>
              <img
                src={uploadedImage}
                alt='Uploaded Image'
                className='max-w-full rounded-lg'
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
