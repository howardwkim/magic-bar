#!/bin/bash

# Local Test Script for Magic Bar
# This script automates the process of:
# 1. Building the Magic Bar with the correct local URL
# 2. Starting a local server to serve the dist directory
# 3. Opening a test page in the browser

echo "🧪 Magic Bar Local Testing Script"
echo "=================================="

# Check if serve is installed
if ! command -v npx &> /dev/null; then
  echo "❌ Error: npx is not installed. Please install Node.js."
  exit 1
fi

# Kill any background processes when the script exits
cleanup() {
  echo "🧹 Cleaning up..."
  if [ ! -z "$SERVER_PID" ]; then
    echo "🛑 Stopping server (PID: $SERVER_PID)..."
    kill $SERVER_PID 2>/dev/null
  fi
  echo "✅ Done"
}
trap cleanup EXIT

# Step 1: Find an available port
echo "🔍 Finding available port..."
PORT=3000
while nc -z localhost $PORT &>/dev/null; do
  echo "   Port $PORT is in use, trying next port..."
  PORT=$((PORT + 1))
done
echo "✅ Using port $PORT"

# Step 2: Build the project with the correct URL
echo "🏗️ Building Magic Bar with localhost:$PORT..."
export MAGIC_BAR_BASE_URL="http://localhost:$PORT"
npm run build:local

if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

# Step 3: Create a test HTML file with the correct port
echo "📝 Creating test HTML file..."
cat > test/local-test.tmp.html << EOL
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Magic Bar Local Test</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }
    h1 {
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 10px;
      border-top: 1px solid #eee;
      font-size: 0.8em;
      color: #666;
    }
  </style>
</head>
<body>
  <h1>Magic Bar Local Test Page</h1>
  <p>This page tests the Magic Bar bootloader in a local environment.</p>
  <p><strong>Using server on port: $PORT</strong></p>
  <p>If you don't see the Magic Bar appearing, check the browser console (F12) for errors.</p>
  
  <!-- Magic Bar Integration -->
  <script>
  (function () {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://localhost:$PORT/bootloader.min.js';
    script.async = true;
    document.body.appendChild(script);
  })();
  </script>
  
  <div class="footer">
    <p>Test page generated by local-test.sh script.</p>
    <p>Server running at: <a href="http://localhost:$PORT">http://localhost:$PORT</a></p>
  </div>
</body>
</html>
EOL

# Step 4: Start the server
echo "🚀 Starting server on port $PORT..."
npx serve dist --listen $PORT &
SERVER_PID=$!

# Wait a moment for the server to start
sleep 2

# Check if server is running
if ! nc -z localhost $PORT &>/dev/null; then
  echo "❌ Failed to start server on port $PORT"
  exit 1
fi

echo "✅ Server running at http://localhost:$PORT"

# Step 5: Open the test page in the browser
echo "🌐 Opening test page in browser..."
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  open test/local-test.tmp.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  # Linux
  xdg-open test/local-test.tmp.html
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  # Windows
  start test/local-test.tmp.html
else
  echo "⚠️ Could not automatically open browser. Please open test/local-test.tmp.html manually."
fi

echo "✅ Done! Magic Bar should be loaded in your browser."
echo "   Press Ctrl+C to stop the server when finished."

# Keep the script running until interrupted
wait $SERVER_PID 