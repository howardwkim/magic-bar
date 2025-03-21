interface ActionButtonsProps {
  onClear: () => void;
  onDream: () => void;
}

export function ActionButtons({ onClear, onDream }: ActionButtonsProps) {
  return (
    <div className='p-5'>
      <div className='flex gap-3'>
        <button
          className='flex-1 bg-gray-100 rounded-lg py-3 uppercase text-sm font-medium'
          onClick={onClear}
        >
          Clear
        </button>
        <button
          className='flex-1 bg-black text-white rounded-lg py-3 flex items-center justify-center text-sm font-medium'
          onClick={onDream}
        >
          <span className='mr-1'>✨</span> Create
        </button>
      </div>
    </div>
  );
}
