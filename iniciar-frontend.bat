@echo off
echo ========================================
echo   ClínicaFácil - Iniciando Frontend
echo ========================================
echo.

REM Navegar para a pasta frontend
cd /d "%~dp0frontend"

REM Verificar se está no diretório correto
if not exist "package.json" (
    echo [ERRO] Arquivo package.json nao encontrado!
    echo    Verifique se a pasta frontend existe
    pause
    exit /b 1
)

REM Verificar se Node.js está instalado
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Node.js nao esta instalado ou nao esta no PATH!
    echo    Instale o Node.js de https://nodejs.org
    pause
    exit /b 1
)

REM Verificar e encerrar processos na porta 3000
echo Verificando porta 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    echo   Encerrando processo PID: %%a
    taskkill /F /PID %%a >nul 2>&1
)

timeout /t 2 /nobreak >nul

REM Verificar se node_modules existe
if not exist "node_modules" (
    echo [AVISO] node_modules nao encontrado. Instalando dependencias...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERRO] Falha ao instalar dependencias!
        pause
        exit /b 1
    )
    echo.
)

echo.
echo Iniciando React App...
echo ========================================
echo.
echo Frontend sera aberto em: http://localhost:3000
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

REM Iniciar o React
call npm start

