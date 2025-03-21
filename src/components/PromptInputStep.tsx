import { JSX } from 'preact';

interface PromptInputStepProps {
  isActive: boolean;
  onToggle: () => void;
  prompt: string;
  onPromptChange: JSX.GenericEventHandler<HTMLTextAreaElement>;
  activeTags: string[];
  onTagToggle: (tag: string) => void;
  availableTags: string[];
  mainImage: string | null;
  styleImage: string | null;
  selectedStyle: string | null;
  styleOptions: Array<{ id: string; imageUrl: string; label: string }>;
}

export function PromptInputStep({
  isActive,
  onToggle,
  prompt,
  onPromptChange,
  activeTags,
  onTagToggle,
  availableTags,
  mainImage,
  styleImage,
  selectedStyle,
  styleOptions,
}: PromptInputStepProps) {
  const selectedStyleOption = selectedStyle
    ? styleOptions.find((style) => style.id === selectedStyle)
    : null;

  return (
    <div className='border-b border-gray-200 overflow-hidden'>
      <div
        className='flex justify-between items-center p-4 cursor-pointer bg-white'
        onClick={onToggle}
      >
        <div className='flex items-start'>
          <span className='font-bold mr-2'>3</span>
          <span>Add details</span>
        </div>
        <div className={`transition-transform ${isActive ? 'rotate-180' : ''}`}>
          ▼
        </div>
      </div>

      {isActive && (
        <div className='p-4'>
          <div className='mb-6'>
            <h3 className='text-sm font-medium text-gray-900 mb-3'>
              Selected Images
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              {/* Main Image */}
              <div className='flex flex-col items-center'>
                <div
                  className={`w-full aspect-square rounded-lg bg-cover bg-center border-2 border-gray-200 mb-2 ${
                    mainImage ? '' : 'bg-gray-100'
                  }`}
                  style={
                    mainImage
                      ? { backgroundImage: `url(${mainImage})` }
                      : undefined
                  }
                ></div>
                <span className='text-xs text-gray-600 text-center'>
                  Your Photo
                </span>
              </div>

              {/* Style Image */}
              <div className='flex flex-col items-center'>
                <div
                  className={`w-full aspect-square rounded-lg bg-cover bg-center border-2 border-gray-200 mb-2 ${
                    styleImage || selectedStyleOption ? '' : 'bg-gray-100'
                  }`}
                  style={
                    styleImage
                      ? { backgroundImage: `url(${styleImage})` }
                      : selectedStyleOption
                      ? {
                          backgroundImage: `url(${selectedStyleOption.imageUrl})`,
                        }
                      : undefined
                  }
                ></div>
                <span className='text-xs text-gray-600 text-center'>
                  {styleImage
                    ? 'Custom Style'
                    : selectedStyleOption
                    ? selectedStyleOption.label
                    : 'Style Image'}
                </span>
              </div>
            </div>
          </div>

          <div className='mb-6'>
            <h3 className='text-sm font-medium text-gray-900 mb-3'>
              Add details
            </h3>
            <textarea
              value={prompt}
              onChange={onPromptChange}
              placeholder='Describe your vision...'
              className='w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
            />
          </div>

          <div>
            <h3 className='text-sm font-medium text-gray-900 mb-3'>
              Style tags
            </h3>
            <div className='flex flex-wrap gap-2'>
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeTags.includes(tag)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
