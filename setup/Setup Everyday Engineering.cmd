@echo off
rem ============================================================================
rem  Everyday Engineering - one-click setup for a new Windows PC.
rem  Download this file from GitHub, double-click it, and follow the prompts.
rem  It installs Git, Node.js and FFmpeg (with winget), downloads the repo,
rem  installs the tools, puts an icon on the desktop and opens the app.
rem  Safe to run again: it skips what is already there.
rem ============================================================================
title Everyday Engineering setup
setlocal
set "REPO=https://github.com/omashour/everyday-engineering.git"
set "DEST=%USERPROFILE%\everyday-engineering"

where winget >nul 2>nul || (
  echo winget is missing. Install "App Installer" from the Microsoft Store, then run this again.
  pause & exit /b 1
)

echo.
echo [1/6] Installing Git, Node.js and FFmpeg (skipped if already installed)...
where git  >nul 2>nul || winget install --id Git.Git -e --silent --accept-source-agreements --accept-package-agreements
where node >nul 2>nul || winget install --id OpenJS.NodeJS.LTS -e --silent --accept-source-agreements --accept-package-agreements
where ffmpeg >nul 2>nul || winget install --id Gyan.FFmpeg -e --silent --accept-source-agreements --accept-package-agreements

rem Reload PATH so the new programs work in this window.
for /f "tokens=2,*" %%A in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path 2^>nul') do set "SYSPATH=%%B"
for /f "tokens=2,*" %%A in ('reg query "HKCU\Environment" /v Path 2^>nul') do set "USRPATH=%%B"
call set "PATH=%SYSPATH%;%USRPATH%"

where git >nul 2>nul || ( echo Git did not install. Restart the PC and run this again. & pause & exit /b 1 )
where node >nul 2>nul || ( echo Node.js did not install. Restart the PC and run this again. & pause & exit /b 1 )

echo.
echo [2/6] Downloading the Everyday Engineering repo to %DEST% ...
echo       (a GitHub sign-in window may open: sign in as the channel owner)
if exist "%DEST%\.git" (
  git -C "%DEST%" pull --ff-only
) else (
  git clone "%REPO%" "%DEST%" || ( echo Download failed. & pause & exit /b 1 )
)
cd /d "%DEST%"

echo.
echo [3/6] Installing the tools (a few minutes)...
call npm install --no-audit --no-fund || ( echo npm install failed. & pause & exit /b 1 )

echo.
echo [4/6] Installing the speech transcriber (one-time download)...
call npx hyperframes models install parakeet

echo.
echo [5/6] Checking everything works...
call npm test --silent

echo.
echo [6/6] Creating the desktop icon...
node tools\app\install-shortcut.mjs

echo.
echo Done. Opening the app - next time, use the "Everyday Engineering" icon on your desktop.
echo Remember: voice recordings are not on GitHub. Copy your old PC's videos\*\audio folders here if you need them.
start "" "%DEST%\Everyday Engineering.cmd"
pause
