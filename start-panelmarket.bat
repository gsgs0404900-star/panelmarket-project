@echo off
cd /d "%~dp0"
echo PanelMarket baslatiliyor...
if not exist node_modules (
  echo Gerekli paketler kuruluyor...
  call npm install
  if errorlevel 1 (
    echo Paket kurulumu basarisiz oldu.
    pause
    exit /b 1
  )
)
call npm start
pause
