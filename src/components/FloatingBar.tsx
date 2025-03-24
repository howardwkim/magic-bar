import { JSX } from 'preact';

interface FloatingBarProps {
  onClick: JSX.MouseEventHandler<HTMLDivElement>;
}

export function FloatingBar({ onClick }: FloatingBarProps) {
  return (
    <div
      id='floating-bar'
      className='fixed top-3 inset-x-0 mx-auto bg-white text-black rounded-lg
            py-2.5 px-5 flex items-center gap-3 shadow-lg cursor-pointer z-50 w-4/5 max-w-md transition-all'
      onClick={onClick}
    >
      <div className='bg-yellow-200 rounded-lg w-8 h-8 flex items-center justify-center mr-2'>
        ✨
      </div>
      <div className='flex-grow'>
        <div className='font-semibold'>Create some art!</div>
        <div className='text-xs text-gray-500'>Any photo, any style</div>
      </div>
    </div>
  );
}
