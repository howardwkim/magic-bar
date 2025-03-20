export function LoadingView() {
  return (
    <div className='p-5 text-center'>
      <div className='inline-block h-8 w-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-3'></div>
      <p className='mb-1'>Creating your dream design...</p>
      <p className='text-sm text-gray-500'>
        This will take approximately 20 seconds
      </p>
    </div>
  );
}
