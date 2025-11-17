# 🔧 Solução: Erro ao Executar `npm start`

## ❌ Problema

Erro de política de execução do PowerShell:
```
scripts foi desabilitada neste sistema
PSSecurityException: UnauthorizedAccess
```

---

## ✅ Soluções

### **Solução 1: Usar Script .BAT (RECOMENDADO)**

Use o arquivo `.bat` que não tem restrições do PowerShell:

```cmd
cd frontend
iniciar-frontend.bat
```

Ou simplesmente:
```cmd
cd frontend
npm start
```

---

### **Solução 2: Alterar Política de Execução do PowerShell**

Se preferir usar o script `.ps1`, execute no PowerShell **como Administrador**:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Depois execute:
```powershell
cd frontend
.\iniciar-frontend.ps1
```

---

### **Solução 3: Executar Diretamente (MAIS SIMPLES)**

**Navegue até a pasta frontend e execute:**

```cmd
cd frontend
npm start
```

**Ou no PowerShell:**
```powershell
cd frontend
npm start
```

---

## 🎯 Comandos Rápidos

### **Backend:**
```powershell
.\iniciar-backend.ps1
```

### **Frontend (sem problemas de política):**
```cmd
cd frontend
npm start
```

Ou use o `.bat`:
```cmd
cd frontend
iniciar-frontend.bat
```

---

## 📝 Explicação

O erro ocorre porque o PowerShell tem políticas de segurança que podem bloquear scripts `.ps1`. 

**Soluções:**
- ✅ Use scripts `.bat` (não têm essas restrições)
- ✅ Execute `npm start` diretamente (mais simples)
- ✅ Altere a política de execução do PowerShell (se necessário)

---

## 🚀 Recomendação

**Use o comando direto:**
```cmd
cd frontend
npm start
```

É a forma mais simples e não tem problemas de política!


