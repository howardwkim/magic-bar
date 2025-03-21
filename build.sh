#!/bin/bash

# Magic Bar Build Script
echo "📦 Building Magic Bar for production..."

# 1. Clean up previous builds
if [ -d "dist" ]; then
  echo "🧹 Cleaning up previous build..."
  rm -rf dist
fi

# 2. Install dependencies if needed
if [ "$1" == "--prod" ]; then
  echo "📚 Installing dependencies for production..."
  echo "🤖 Using npm ci for CI environment..."
  npm ci
else
  echo "📚 Installing dependencies for local development..."
  echo "💻 Using npm install..."
  npm install
fi

# 3. Run the build process
echo "🏗️ Building application..."
npm run build

# 4. Copy the bootloader files
echo "🚀 Copying bootloader files..."
cp src/bootloader/bootloader.min.js dist/

# 5. Create a deployment package
echo "📦 Creating deployment package..."
mkdir -p dist/deploy

# Copy the necessary files to the deployment directory
cp dist/magic-bar.js dist/deploy/
cp dist/magic-bar.css dist/deploy/
cp src/bootloader/bootloader.min.js dist/deploy/

# 6. Create a zip archive for easy deployment
echo "🗜️ Creating zip archive..."
cd dist && zip -r magic-bar-deploy.zip deploy/

echo "✅ Build completed successfully!"
echo "📁 Deployment package is available at: dist/magic-bar-deploy.zip"