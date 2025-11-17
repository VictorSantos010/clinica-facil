@echo off
echo ========================================
echo   ClínicaFácil - Iniciando Frontend
echo ========================================
echo.

REM Verificar se está no diretório correto
if not exist "package.json" (
    echo [ERRO] Arquivo package.json não encontrado!
    echo    Execute este script na pasta frontend
    exit /b 1
)

REM Verificar se Node.js está instalado
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Node.js não está instalado ou não está no PATH!
    echo    Instale o Node.js de https://nodejs.org
    exit /b 1
)

REM Verificar se npm está instalado
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] npm não está instalado!
    exit /b 1
)

REM Verificar e encerrar processos na porta 3000
echo Verificando porta 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo   Encerrando processo PID: %%a
    taskkill /F /PID %%a >nul 2>&1
)

timeout /t 2 /nobreak >nul

REM Verificar se node_modules existe
if not exist "node_modules" (
    echo [AVISO] node_modules não encontrado. Instalando dependências...
    call npm install
    echo.
)

echo.
echo Iniciando React...
echo ========================================
echo.

REM Iniciar o React
call npm start


