# 🚀 Como Iniciar o Backend - ClínicaFácil

## ⚠️ Problema: Porta 8080 Ocupada

Se você sempre recebe o erro "Porta 8080 já está em uso", use uma das soluções abaixo:

---

## ✅ Solução 1: Script Automático (RECOMENDADO)

Use o script que encerra processos automaticamente antes de iniciar:

```powershell
.\iniciar-backend.ps1
```

Este script:
- ✅ Verifica se a porta 8080 está ocupada
- ✅ Encerra processos automaticamente
- ✅ Inicia o Spring Boot

---

## ✅ Solução 2: Liberar Porta Manualmente

Se preferir fazer manualmente:

```powershell
# 1. Liberar a porta 8080
.\liberar-porta-8080.ps1

# 2. Depois iniciar o backend normalmente
mvn spring-boot:run
```

---

## ✅ Solução 3: Usar Outra Porta

Se quiser usar uma porta diferente (ex: 8081):

1. Abra o arquivo: `src/main/resources/application.properties`
2. Descomente a linha:
   ```properties
   server.port=8081
   ```
3. Inicie normalmente:
   ```powershell
   mvn spring-boot:run
   ```

**⚠️ Atenção:** Se mudar a porta, atualize também:
- Frontend (`frontend/src/services/api.js`) - altere `http://localhost:8080` para `http://localhost:8081`
- H2 Console - acesse `http://localhost:8081/h2-console`

---

## 📋 Comandos Rápidos

### Verificar se a porta está ocupada:
```powershell
netstat -ano | findstr :8080
```

### Encerrar processo manualmente (substitua PID pelo número):
```powershell
Stop-Process -Id PID -Force
```

### Iniciar backend normalmente:
```powershell
mvn spring-boot:run
```

---

## 🎯 Resumo

**Método mais fácil:** Use `.\iniciar-backend.ps1` - ele faz tudo automaticamente!

