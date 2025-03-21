#!/bin/bash

# Magic Bar Build Script
echo "📦 Building Magic Bar for production..."

# Check for BASE_URL environment variable
if [ -z "$MAGIC_BAR_BASE_URL" ]; then
  echo "⚠️ Warning: MAGIC_BAR_BASE_URL environment variable not set"
  echo "⚠️ Using default: https://localhost:3000"
  MAGIC_BAR_BASE_URL="https://localhost:3000"
fi

echo "🌐 Using base URL: $MAGIC_BAR_BASE_URL"

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

# 4. Generate the bootloader with the correct base URL
echo "🚀 Generating bootloader..."
if [ -f "src/bootloader/bootloader.js" ]; then
  echo "🔄 Processing bootloader.js with environment variables..."
  # Create temp file with replaced base URL
  sed "s|__MAGIC_BAR_BASE_URL__|$MAGIC_BAR_BASE_URL|g" src/bootloader/bootloader.js > dist/bootloader.temp.js
  
  # Minify using Terser (if available)
  if command -v npx &> /dev/null; then
    echo "🔧 Minifying bootloader using Terser..."
    npx terser dist/bootloader.temp.js -o dist/bootloader.min.js --compress --mangle
    rm dist/bootloader.temp.js
  else
    echo "⚠️ Terser not available. Using unminified bootloader."
    mv dist/bootloader.temp.js dist/bootloader.min.js
  fi
else
  echo "❌ Error: src/bootloader/bootloader.js not found!"
  exit 1
fi


# # 6. Create a zip archive for easy deployment
# echo "🗜️ Creating zip archive..."
# cd dist && zip -r magic-bar-deploy.zip deploy/

echo "✅ Build completed successfully!"
# echo "📁 Deployment package is available at: dist/magic-bar-deploy.zip"