import { JSX } from 'preact';

interface PhotoUploadProps {
  label: string;
  description: string;
  inputId: string;
  onImageUpload: JSX.GenericEventHandler<HTMLInputElement>;
  uploadedImage: string | null;
}

export function PhotoUpload({
  label,
  description,
  inputId,
  onImageUpload,
  uploadedImage,
}: PhotoUploadProps) {
  return (
    <div>
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
          <div>{label}</div>
          <div className='text-xs text-gray-500'>{description}</div>
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
  );
}
