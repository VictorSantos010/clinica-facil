# Script para liberar a porta 8080
# Use este script quando a porta 8080 estiver ocupada

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Liberando Porta 8080" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar processos usando a porta 8080
Write-Host "Verificando processos na porta 8080..." -ForegroundColor Yellow
$porta8080 = netstat -ano | findstr :8080

if ($porta8080) {
    Write-Host "Processos encontrados na porta 8080:" -ForegroundColor Yellow
    Write-Host ""
    
    # Extrair PIDs dos processos usando a porta 8080
    $pids = $porta8080 | ForEach-Object {
        if ($_ -match '\s+(\d+)\s*$') {
            [int]$matches[1]
        }
    } | Where-Object { $_ -gt 0 } | Select-Object -Unique
    
    foreach ($processId in $pids) {
        try {
            $processo = Get-Process -Id $processId -ErrorAction SilentlyContinue
            if ($processo) {
                Write-Host "  PID: $processId - Processo: $($processo.ProcessName)" -ForegroundColor White
            }
        } catch {
            # Processo não encontrado
        }
    }
    
    Write-Host ""
    Write-Host "Encerrando processos..." -ForegroundColor Yellow
    
    foreach ($processId in $pids) {
        try {
            $processo = Get-Process -Id $processId -ErrorAction SilentlyContinue
            if ($processo) {
                Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
                Write-Host "  ✓ Processo PID $processId encerrado" -ForegroundColor Green
            }
        } catch {
            Write-Host "  ✗ Erro ao encerrar PID $processId" -ForegroundColor Red
        }
    }
    
    Start-Sleep -Seconds 2
    
    # Verificar novamente
    $porta8080 = netstat -ano | findstr :8080
    if ($porta8080) {
        Write-Host ""
        Write-Host "⚠ Aviso: Ainda há processos na porta 8080" -ForegroundColor Red
    } else {
        Write-Host ""
        Write-Host "✓ Porta 8080 liberada com sucesso!" -ForegroundColor Green
    }
} else {
    Write-Host "✓ Porta 8080 já está livre!" -ForegroundColor Green
}

Write-Host ""

