@echo off
chcp 65001 >nul
title Bitacora de Flota
cd /d "%~dp0"
set "PY=python"
where py >nul 2>nul
if %errorlevel%==0 set "PY=py"
%PY% -c "import openpyxl" >nul 2>nul
if not %errorlevel%==0 (
  echo Instalando openpyxl por unica vez...
  %PY% -m pip install --user openpyxl
)
%PY% servidor.py %*
pause
