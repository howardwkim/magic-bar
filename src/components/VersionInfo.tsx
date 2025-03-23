import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

interface VersionInfo {
  environment: 'production' | 'staging';
  buildDate: string;
  commitHash: string;
  commitMessage: string;
}

export const VersionInfo = () => {
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);

  useEffect(() => {
    const info: VersionInfo = {
      environment: import.meta.env.VITE_ENVIRONMENT as 'production' | 'staging',
      buildDate: import.meta.env.VITE_BUILD_DATE || new Date().toISOString(),
      commitHash: import.meta.env.VITE_GIT_COMMIT_HASH || 'unknown',
      commitMessage: import.meta.env.VITE_GIT_COMMIT_MESSAGE || 'unknown',
    };
    setVersionInfo(info);
  }, []);

  if (!versionInfo) return null;

  const barColor =
    versionInfo.environment === 'production' ? 'bg-green-500' : 'bg-blue-500';

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden'>
        <div className={`${barColor} px-4 py-2 text-white font-semibold`}>
          {versionInfo.environment.toUpperCase()}
        </div>
        <div className='p-6'>
          <h1 className='text-2xl font-bold mb-6'>
            Magic Bar Version Information
          </h1>

          <div className='space-y-4'>
            <div>
              <h2 className='text-lg font-semibold text-gray-700'>
                Environment
              </h2>
              <p className='text-gray-600'>{versionInfo.environment}</p>
            </div>

            <div>
              <h2 className='text-lg font-semibold text-gray-700'>
                Build Date
              </h2>
              <p className='text-gray-600'>
                {new Date(versionInfo.buildDate).toLocaleString()}
              </p>
            </div>

            <div>
              <h2 className='text-lg font-semibold text-gray-700'>
                Git Commit
              </h2>
              <p className='text-gray-600 font-mono'>
                {versionInfo.commitHash}
              </p>
              <p className='text-gray-600 mt-1'>{versionInfo.commitMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
