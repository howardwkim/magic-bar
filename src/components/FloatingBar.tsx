import { JSX } from 'preact';

interface FloatingBarProps {
  onClick: JSX.MouseEventHandler<HTMLDivElement>;
}

export function FloatingBar({ onClick }: FloatingBarProps) {
  return (
    <div
      id='floating-bar'
      className='fixed top-3 left-1/2 transform -translate-x-1/2 bg-white text-black rounded-full 
                py-2.5 px-5 flex items-center gap-3 shadow-lg cursor-pointer z-50 w-4/5 max-w-md transition-all'
      onClick={onClick}
    >
      <div className='bg-yellow-200 rounded-lg w-8 h-8 flex items-center justify-center mr-2'>
        ✨
      </div>
      <div className='flex-grow'>
        <div className='font-semibold'>Dream something up</div>
        <div className='text-xs text-gray-500'>Any product, any style</div>
      </div>
    </div>
  );
}
