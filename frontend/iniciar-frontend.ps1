# Script para iniciar o frontend do ClínicaFácil
# Este script encerra processos que estão usando a porta 3000 antes de iniciar

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ClínicaFácil - Iniciando Frontend" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se está no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erro: Arquivo package.json não encontrado!" -ForegroundColor Red
    Write-Host "   Execute este script na pasta frontend (onde está o package.json)" -ForegroundColor Yellow
    exit 1
}

# Verificar se Node.js está instalado
try {
    $null = node -v 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        throw "Node.js não encontrado"
    }
} catch {
    Write-Host "❌ Erro: Node.js não está instalado ou não está no PATH!" -ForegroundColor Red
    Write-Host "   Instale o Node.js de https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Verificar se npm está instalado
try {
    $null = npm -v 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        throw "npm não encontrado"
    }
} catch {
    Write-Host "❌ Erro: npm não está instalado!" -ForegroundColor Red
    exit 1
}

# Verificar e encerrar processos na porta 3000
Write-Host "Verificando porta 3000..." -ForegroundColor Yellow
$porta3000 = netstat -ano | findstr :3000

if ($porta3000) {
    Write-Host "⚠ Porta 3000 está em uso. Encerrando processos..." -ForegroundColor Yellow
    Write-Host ""
    
    # Extrair PIDs dos processos usando a porta 3000
    $pids = $porta3000 | ForEach-Object {
        if ($_ -match '\s+(\d+)\s*$') {
            [int]$matches[1]
        }
    } | Where-Object { $_ -gt 0 } | Select-Object -Unique
    
    $processosEncerrados = 0
    foreach ($processId in $pids) {
        try {
            $processo = Get-Process -Id $processId -ErrorAction SilentlyContinue
            if ($processo) {
                Write-Host "  Encerrando processo PID: $processId ($($processo.ProcessName))" -ForegroundColor Yellow
                Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
                $processosEncerrados++
                Start-Sleep -Milliseconds 500
            }
        } catch {
            # Processo já foi encerrado ou não existe mais
        }
    }
    
    if ($processosEncerrados -gt 0) {
        Write-Host ""
        Write-Host "✓ $processosEncerrados processo(s) encerrado(s)!" -ForegroundColor Green
        Start-Sleep -Seconds 2
        
        # Verificar novamente se a porta foi liberada
        $porta3000 = netstat -ano | findstr :3000
        if ($porta3000) {
            Write-Host ""
            Write-Host "⚠ Aviso: Ainda há processos na porta 3000" -ForegroundColor Red
            Write-Host ""
        }
    }
} else {
    Write-Host "✓ Porta 3000 está livre." -ForegroundColor Green
}

Write-Host ""
Write-Host "Iniciando React..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠ node_modules não encontrado. Instalando dependências..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Iniciar o React
try {
    npm start
} catch {
    Write-Host ""
    Write-Host "❌ Erro ao iniciar o React!" -ForegroundColor Red
    Write-Host "   Verifique se todas as dependências estão instaladas" -ForegroundColor Yellow
    exit 1
}



