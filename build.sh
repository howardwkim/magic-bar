#!/bin/bash

# Magic Bar Build Script
echo "📦 Building Magic Bar for production..."

# 1. Clean up previous builds
if [ -d "dist" ]; then
  echo "🧹 Cleaning up previous build..."
  rm -rf dist
fi

# 2. Install dependencies if needed
if [ "$1" == "--install" ]; then
  echo "📚 Installing dependencies..."
  npm install
fi

# 3. Run the build process
echo "🏗️ Building application..."
npm run build

# 4. Copy the bootloader files
echo "🚀 Copying bootloader files..."
cp bootloader.js dist/
cp bootloader.min.js dist/

# 5. Create a deployment package
echo "📦 Creating deployment package..."
mkdir -p dist/deploy

# Copy the necessary files to the deployment directory
cp dist/magic-bar.umd.js dist/deploy/
cp dist/magic-bar.css dist/deploy/
cp bootloader.min.js dist/deploy/
cp shopify-integration.md dist/deploy/

# 6. Create a zip archive for easy deployment
echo "🗜️ Creating zip archive..."
cd dist && zip -r magic-bar-deploy.zip deploy/

echo "✅ Build completed successfully!"
echo "📁 Deployment package is available at: dist/magic-bar-deploy.zip"
echo "📝 Integration instructions are in: dist/deploy/shopify-integration.md" 