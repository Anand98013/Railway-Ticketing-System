@echo off
cd /d "%~dp0frontend"
if not exist node_modules (
  echo Installing frontend dependencies...
  call npm install
)
echo Starting Railway Ticketing frontend on http://localhost:5173
call npm run dev
pause
