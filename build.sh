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
  echo "   Looking for fallback bootloader.min.js..."
  
  if [ -f "src/bootloader/bootloader.min.js" ]; then
    echo "✅ Found fallback. Copying and applying base URL..."
    # Create a temporary file with the correct base URL
    TEMP_FILE=$(mktemp)
    sed "s|https://your-deployment-server.com|$MAGIC_BAR_BASE_URL|g" src/bootloader/bootloader.min.js > "$TEMP_FILE"
    cp "$TEMP_FILE" dist/bootloader.min.js
    rm "$TEMP_FILE"
  else
    echo "❌ No bootloader found. Cannot generate bootloader.min.js!"
    exit 1
  fi
fi

# 5. Verify files exist
echo "🔍 Verifying built files..."
if [ ! -f "dist/bootloader.min.js" ]; then
  echo "❌ Error: bootloader.min.js not found in dist directory!"
  exit 1
else
  echo "✅ bootloader.min.js found"
fi

if [ ! -f "dist/magic-bar.css" ]; then
  echo "⚠️ Warning: magic-bar.css not found in dist directory."
  echo "   Creating an empty CSS file to prevent bootloader errors"
  touch dist/magic-bar.css
fi

if [ ! -f "dist/magic-bar.js" ]; then
  echo "⚠️ Warning: magic-bar.js not found in dist directory."
  exit 1
fi

echo "✅ Build completed successfully!"
echo "📄 Bootloader is available at: dist/bootloader.min.js"
echo "🌐 Using base URL: $MAGIC_BAR_BASE_URL"
ls -la dist