interface ActionButtonsProps {
  onClear: () => void;
  onDream: () => void;
  disabled?: boolean;
}

export function ActionButtons({
  onClear,
  onDream,
  disabled = false,
}: ActionButtonsProps) {
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
          className={`flex-1 rounded-lg py-3 flex items-center justify-center text-sm font-medium ${
            disabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
          onClick={onDream}
          disabled={disabled}
        >
          <span className='mr-1'>✨</span> Create
        </button>
      </div>
    </div>
  );
}
