# 🔧 Solução: Erro "Something is already running on port 3000"

## ❌ Problema

O erro `Something is already running on port 3000` significa que já existe um processo usando a porta 3000.

## ✅ Soluções

### Opção 1: Parar o Processo na Porta 3000 (Recomendado)

1. **Encontrar o processo:**
   ```bash
   netstat -ano | findstr :3000
   ```
   Anote o número do PID (última coluna)

2. **Matar o processo:**
   ```bash
   taskkill /PID [NUMERO_DO_PID] /F
   ```
   Substitua `[NUMERO_DO_PID]` pelo número que você anotou

3. **Tentar iniciar novamente:**
   ```bash
   npm start
   ```

### Opção 2: Usar Outra Porta

1. **Criar arquivo `.env` na pasta frontend:**
   ```
   PORT=3001
   ```

2. **Iniciar o frontend:**
   ```bash
   npm start
   ```
   Agora rodará em `http://localhost:3001`

### Opção 3: Fechar o Terminal e Abrir Novo

Às vezes o processo anterior ainda está rodando no terminal. Feche todos os terminais e abra um novo.

### Opção 4: Reiniciar o Computador

Se nada funcionar, reinicie o computador (isso fecha todos os processos).

---

## 🎯 Solução Rápida (PowerShell como Admin)

Execute no PowerShell como Administrador:

```powershell
# Encontrar e matar processo na porta 3000
$process = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($process) {
    Stop-Process -Id $process.OwningProcess -Force
    Write-Host "Processo na porta 3000 encerrado!"
}
```

Depois execute:
```bash
cd frontend
npm start
```

---

## 📝 Verificar se Funcionou

Após resolver, o frontend deve iniciar e mostrar:
```
Compiled successfully!

You can now view clinica-facil-frontend in the browser.

  Local:            http://localhost:3000
```

