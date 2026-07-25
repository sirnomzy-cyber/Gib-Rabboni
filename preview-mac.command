#!/bin/bash
cd "$(dirname "$0")"
echo "Starting local preview server for Gib Rabboni Limited website..."
echo ""
echo "Opening http://localhost:8000 in your browser in a moment..."
echo "Press CTRL+C in this window to stop the server when you're done."
echo ""
( sleep 1.5 && open "http://localhost:8000" 2>/dev/null || xdg-open "http://localhost:8000" 2>/dev/null ) &
python3 -m http.server 8000 2>/dev/null || python -m http.server 8000
