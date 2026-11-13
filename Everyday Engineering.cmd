@echo off
rem Starts the Everyday Engineering app. The desktop shortcut runs this file.
title Everyday Engineering
cd /d "%~dp0"
echo Getting the latest from GitHub...
git pull --ff-only --quiet 2>nul || echo   (could not update from GitHub - continuing with this PC's copy)
if not exist node_modules (
  echo First start on this PC: installing the tools, this takes a few minutes...
  call npm install --no-audit --no-fund
)
node tools\app\server.mjs
if errorlevel 1 pause
