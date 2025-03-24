import { useEffect } from 'preact/hooks';

export function NotFound() {
  useEffect(() => {
    // Set the status code to 404 for SEO and analytics
    document.title = 'Page Not Found - Magic Bar';
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='text-center p-8 bg-white rounded-lg shadow-md'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
          404 - Page Not Found
        </h1>
        <p className='text-gray-600 mb-4'>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href='/' className='text-blue-600 hover:text-blue-800 underline'>
          Return to Home
        </a>
      </div>
    </div>
  );
}
