@echo off
title Portfolio v10 - Nguyen D. Thang
color 07
echo.
echo  ==========================================
echo   NGUYEN D. THANG  v10  -  LAN SHARING
echo  ==========================================
echo.
node --version >nul 2>&1
if errorlevel 1 (echo  Node.js not installed. Get it at: https://nodejs.org & pause & exit /b 1)
if not exist "backend\node_modules"  (echo  Installing backend...  & cd backend  & npm install & cd ..)
if not exist "frontend\node_modules" (echo  Installing frontend... & cd frontend & npm install & cd ..)
echo.
echo  Finding your IP address...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
  set IP=%%a
  goto :found
)
:found
set IP=%IP: =%
echo.
echo  Local:   http://localhost:5173
echo  LAN:     http://%IP%:5173
echo.
echo  Share http://%IP%:5173 with devices on the same WiFi/network
echo  Admin:   http://localhost:5173/admin  [admin / Admin@2025]
echo.
start "Backend"  cmd /k "cd /d %~dp0backend  && npm run dev"
timeout /t 3 /nobreak >nul
start "Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"
timeout /t 4 /nobreak >nul
start http://localhost:5173
echo.
echo  Press any key to close this window (servers keep running)
pause >nul
