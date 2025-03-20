import { JSX } from 'preact';

interface PromptInputStepProps {
  isActive: boolean;
  onToggle: () => void;
  prompt: string;
  onPromptChange: JSX.GenericEventHandler<HTMLTextAreaElement>;
  activeTags: string[];
  onTagToggle: (tag: string) => void;
  availableTags: string[];
}

export function PromptInputStep({
  isActive,
  onToggle,
  prompt,
  onPromptChange,
  activeTags,
  onTagToggle,
  availableTags,
}: PromptInputStepProps) {
  return (
    <div className='border-b border-gray-200 overflow-hidden'>
      <div
        className='flex justify-between items-center p-4 cursor-pointer bg-white'
        onClick={onToggle}
      >
        <div>
          <span className='font-bold mr-2'>3</span>
          <span>Tell us what you're looking for</span>
          <span className='text-xs text-gray-500 ml-1'>(Optional)</span>
        </div>
        <div className={`transition-transform ${isActive ? 'rotate-180' : ''}`}>
          ▼
        </div>
      </div>

      {isActive && (
        <div className='p-4'>
          <p className='mb-2'>
            Refine your prompt to describe the design and style you're looking
            for. The more detail, the better!
          </p>
          <textarea
            className='w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm'
            placeholder="Describe the product you're dreaming of"
            rows={4}
            value={prompt}
            onChange={onPromptChange}
          ></textarea>

          <div className='flex flex-wrap gap-2 mt-3'>
            {availableTags.map((tag) => (
              <button
                key={tag}
                className={`rounded-full px-4 py-1 text-sm ${
                  activeTags.includes(tag)
                    ? 'bg-black text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => onTagToggle(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
