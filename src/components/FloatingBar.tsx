import { JSX } from 'preact';

interface FloatingBarProps {
  onClick: JSX.MouseEventHandler<HTMLDivElement>;
}
interface FloatingBarProps {
  onClick: JSX.MouseEventHandler<HTMLDivElement>;
  icon?: string;
  title?: string;
  subtitle?: string;
}

export function FloatingBar({
  onClick,
  icon = '✨',
  title = 'Create some art!',
  subtitle = 'Any photo, any style',
}: FloatingBarProps) {
  return (
    <div
      id='floating-bar'
      className='fixed bottom-6 inset-x-0 mx-auto bg-white text-black rounded-lg
            py-2.5 px-5 flex items-center gap-3 shadow-lg cursor-pointer z-50 w-4/5 max-w-md transition-all'
      onClick={onClick}
    >
      <div className='bg-yellow-200 rounded-lg w-8 h-8 flex items-center justify-center mr-2'>
        {icon}
      </div>
      <div className='flex-grow'>
        <div className='font-semibold'>{title}</div>
        <div className='text-xs text-gray-500'>{subtitle}</div>
      </div>
    </div>
  );
}
