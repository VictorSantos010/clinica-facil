# 🚀 Como Iniciar o Projeto ClínicaFácil

## 📋 Pré-requisitos

- ✅ Java 17+ instalado
- ✅ Maven instalado
- ✅ Node.js instalado (com npm)

---

## 🎯 Início Rápido

### 1️⃣ Backend (Spring Boot)

**Na raiz do projeto:**

```powershell
.\iniciar-backend.ps1
```

Este script:
- ✅ Verifica e libera a porta 8080 automaticamente
- ✅ Verifica se o Maven está instalado
- ✅ Inicia o Spring Boot

**Aguarde aparecer:** `Started ClinicaFacilApplication`

---

### 2️⃣ Frontend (React)

**Em um NOVO terminal, na pasta frontend:**

```powershell
cd frontend
.\iniciar-frontend.ps1
```

Ou manualmente:
```powershell
cd frontend
npm start
```

Este script:
- ✅ Verifica e libera a porta 3000 automaticamente
- ✅ Verifica se Node.js e npm estão instalados
- ✅ Instala dependências se necessário
- ✅ Inicia o React

**O navegador abrirá automaticamente em:** `http://localhost:3000`

---

## 🌐 URLs Após Iniciar

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **H2 Console:** http://localhost:8080/h2-console

---

## ⚠️ Problemas Comuns

### Erro: "Porta 8080 já está em uso"

**Solução:** Use o script automático:
```powershell
.\iniciar-backend.ps1
```

Ou libere manualmente:
```powershell
.\liberar-porta-8080.ps1
```

---

### Erro: "Something is already running on port 3000"

**Solução:** Use o script automático:
```powershell
cd frontend
.\iniciar-frontend.ps1
```

Ou libere manualmente:
```powershell
# Encontrar o processo
netstat -ano | findstr :3000

# Encerrar (substitua PID pelo número encontrado)
Stop-Process -Id PID -Force
```

---

### Erro: "Maven não encontrado"

**Solução:** Instale o Maven e adicione ao PATH do sistema.

---

### Erro: "Node.js não encontrado"

**Solução:** 
1. Baixe e instale Node.js de https://nodejs.org
2. Reinicie o terminal
3. Verifique: `node -v`

---

## 📝 Comandos Alternativos

### Backend (sem script):
```powershell
mvn spring-boot:run
```

### Frontend (sem script):
```powershell
cd frontend
npm start
```

---

## 🎯 Ordem de Execução

1. **Primeiro:** Inicie o **Backend** (porta 8080)
2. **Depois:** Inicie o **Frontend** (porta 3000) em outro terminal

---

## ✅ Verificação

Após iniciar ambos, você deve ver:

- ✅ Backend rodando em `http://localhost:8080`
- ✅ Frontend rodando em `http://localhost:3000`
- ✅ Navegador aberto automaticamente com a aplicação

---

## 🆘 Precisa de Ajuda?

Se ainda tiver problemas:
1. Verifique se todas as portas estão livres
2. Verifique se Java, Maven e Node.js estão instalados
3. Execute os scripts automáticos (eles fazem verificações)



