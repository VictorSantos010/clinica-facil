@echo off
echo ========================================
echo   Liberando PowerShell para Scripts
echo ========================================
echo.
echo Este script tentara liberar o PowerShell para executar scripts.
echo.
echo IMPORTANTE: Execute este arquivo como ADMINISTRADOR!
echo.
pause

REM Tentar liberar para o usuario atual
echo.
echo Tentando liberar PowerShell para o usuario atual...
powershell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [SUCESSO] PowerShell liberado com sucesso!
    echo.
    echo Agora voce pode executar os scripts .ps1 do projeto.
) else (
    echo.
    echo [AVISO] Nao foi possivel liberar automaticamente.
    echo.
    echo SOLUCAO MANUAL:
    echo 1. Abra o PowerShell como Administrador
    echo 2. Execute: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    echo 3. Confirme digitando S
    echo.
    echo OU use os arquivos .bat que nao precisam de permissao:
    echo   - iniciar-frontend.bat
    echo.
)

echo.
echo Verificando politica atual...
powershell -Command "Get-ExecutionPolicy"

echo.
echo ========================================
pause

