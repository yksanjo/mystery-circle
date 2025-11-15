#!/bin/bash

# Mystery Circle - Start Script
# Starts a local web server to run the application

echo "⭕ Starting Mystery Circle..."
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "Starting Python HTTP server on port 8000..."
    echo "Open http://localhost:8000/public in your browser"
    echo ""
    cd "$(dirname "$0")"
    python3 -m http.server 8000
# Check if Python 2 is available
elif command -v python &> /dev/null; then
    echo "Starting Python HTTP server on port 8000..."
    echo "Open http://localhost:8000/public in your browser"
    echo ""
    cd "$(dirname "$0")"
    python -m SimpleHTTPServer 8000
else
    echo "Python not found. Please install Python or use:"
    echo "  npx http-server -p 8000"
    echo ""
    echo "Then open http://localhost:8000/public in your browser"
    exit 1
fi

