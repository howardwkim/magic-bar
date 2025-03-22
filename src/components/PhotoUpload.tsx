import { JSX } from 'preact';
import { useRef } from 'preact/hooks';
interface PhotoUploadProps {
  label: string;
  description: string;
  inputId: string;
  onImageUpload: JSX.GenericEventHandler<HTMLInputElement>;
  uploadedImage: string | null;
  onClear?: () => void;
}

export function PhotoUpload({
  label,
  description,
  inputId,
  onImageUpload,
  uploadedImage,
  onClear,
}: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    inputRef.current?.click();
  };

  return (
    <div>
      <input
        ref={inputRef}
        type='file'
        id={inputId}
        className='hidden'
        accept='image/*'
        onChange={onImageUpload}
      />

      {!uploadedImage ? (
        <div
          className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer'
          onClick={handleClick}
        >
          <div className='text-2xl mb-2'>+</div>
          <div>{label}</div>
          <div className='text-xs text-gray-500'>{description}</div>
        </div>
      ) : (
        <div className='flex items-center gap-4'>
          <div className='relative w-32 h-32 flex-shrink-0'>
            <img
              src={uploadedImage}
              alt='Uploaded Image'
              className='w-full h-full object-cover rounded-lg'
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClear?.();
            }}
            className='p-2 text-gray-500 hover:text-red-500 transition-colors'
            aria-label='Remove image'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
