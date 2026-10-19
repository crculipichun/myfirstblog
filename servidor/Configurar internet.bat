@echo off
chcp 65001 >nul
title Bitacora de Flota - conexion por internet
cd /d "%~dp0"
echo.
echo Para que cualquier celular envie datos desde cualquier lugar se usa ngrok (gratis).
echo 1. Crea una cuenta en https://dashboard.ngrok.com/signup
echo 2. Copia tu Authtoken:      https://dashboard.ngrok.com/get-started/your-authtoken
echo 3. Crea tu dominio gratis:  https://dashboard.ngrok.com/domains  (boton "New Domain")
echo.
set /p TOKEN=Pega aqui tu Authtoken y presiona Enter: 
set /p DOMINIO=Escribe tu dominio (ejemplo mi-flota.ngrok-free.dev) y presiona Enter: 
echo.
echo Listo. Desde ahora basta con abrir "Iniciar Bitacora.bat".
call "Iniciar Bitacora.bat" --ngrok-token "%TOKEN%" --dominio "%DOMINIO%"
