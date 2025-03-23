import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Get git information
const getGitInfo = () => {
  try {
    const commitHash = execSync('git rev-parse HEAD').toString().trim();
    const commitMessage = execSync('git log -1 --pretty=%B').toString().trim();
    return { commitHash, commitMessage };
  } catch (error) {
    console.error('Error getting git info:', error);
    return { commitHash: 'unknown', commitMessage: 'unknown' };
  }
};

// Get build date
const buildDate = new Date().toISOString();

// Get environment from command line args
const args = process.argv.slice(2);
const isProduction = args.includes('--prod');

const env = isProduction ? 'production' : 'staging';

// Get git info
const { commitHash, commitMessage } = getGitInfo();

// Create version info object
const versionInfo = {
  VITE_BUILD_DATE: buildDate,
  VITE_GIT_COMMIT_HASH: commitHash,
  VITE_GIT_COMMIT_MESSAGE: commitMessage,
  VITE_ENVIRONMENT: env,
};

// Convert to env file format
const envContent = Object.entries(versionInfo)
  .map(([key, value]) => `${key}="${value}"`)
  .join('\n');

// Write to .env file
const envPath = join(process.cwd(), '.env');
writeFileSync(envPath, envContent);

console.log('Version information injected successfully');
