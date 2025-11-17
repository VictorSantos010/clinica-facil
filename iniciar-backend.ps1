# Script para iniciar o backend do ClínicaFácil
# Este script encerra processos que estão usando a porta 8080 antes de iniciar

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ClínicaFácil - Iniciando Backend" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se está no diretório correto
if (-not (Test-Path "pom.xml")) {
    Write-Host "❌ Erro: Arquivo pom.xml não encontrado!" -ForegroundColor Red
    Write-Host "   Execute este script na raiz do projeto (onde está o pom.xml)" -ForegroundColor Yellow
    exit 1
}

# Verificar se Maven está instalado
try {
    $null = mvn -version 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        throw "Maven não encontrado"
    }
} catch {
    Write-Host "❌ Erro: Maven não está instalado ou não está no PATH!" -ForegroundColor Red
    Write-Host "   Instale o Maven ou adicione-o ao PATH do sistema" -ForegroundColor Yellow
    exit 1
}

# Verificar e encerrar processos na porta 8080
Write-Host "Verificando porta 8080..." -ForegroundColor Yellow
$porta8080 = netstat -ano | findstr :8080

if ($porta8080) {
    Write-Host "⚠ Porta 8080 está em uso. Encerrando processos..." -ForegroundColor Yellow
    Write-Host ""
    
    # Extrair PIDs dos processos usando a porta 8080 (melhor regex)
    $pids = $porta8080 | ForEach-Object {
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
        $porta8080 = netstat -ano | findstr :8080
        if ($porta8080) {
            Write-Host ""
            Write-Host "⚠ Aviso: Ainda há processos na porta 8080" -ForegroundColor Red
            Write-Host "   Tente executar: .\liberar-porta-8080.ps1" -ForegroundColor Yellow
            Write-Host ""
        }
    }
} else {
    Write-Host "✓ Porta 8080 está livre." -ForegroundColor Green
}

Write-Host ""
Write-Host "Iniciando Spring Boot..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Iniciar o Spring Boot
try {
    mvn spring-boot:run
} catch {
    Write-Host ""
    Write-Host "❌ Erro ao iniciar o Spring Boot!" -ForegroundColor Red
    Write-Host "   Verifique se todas as dependências estão instaladas" -ForegroundColor Yellow
    exit 1
}

