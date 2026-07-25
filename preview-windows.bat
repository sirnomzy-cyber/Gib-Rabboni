@echo off
echo Starting local preview server for Gib Rabboni Limited website...
echo.
echo Once it says "Serving HTTP", open this in your browser:
echo    http://localhost:8000
echo.
echo Press CTRL+C in this window to stop the server when you're done.
echo.
cd /d "%~dp0"
python -m http.server 8000 2>nul || py -m http.server 8000
pause
