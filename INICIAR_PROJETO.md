# 🚀 Como Iniciar o Projeto ClínicaFácil

## 📋 Ordem Correta de Inicialização

### 1️⃣ PRIMEIRO: Iniciar o Backend (Spring Boot)

O backend deve ser iniciado **ANTES** do frontend, pois o frontend depende da API.

**No terminal 1:**
```bash
mvn spring-boot:run
```

**Aguarde até ver:**
```
Started ClinicaFacilApplication in X.XXX seconds
```

O backend estará rodando em: `http://localhost:8080`

---

### 2️⃣ SEGUNDO: Iniciar o Frontend (React)

**Apenas após o backend estar rodando**, inicie o frontend.

**No terminal 2 (novo terminal):**
```bash
cd frontend
npm start
```

**Aguarde até ver:**
```
Compiled successfully!

You can now view clinica-facil-frontend in the browser.

  Local:            http://localhost:3000
```

O frontend abrirá automaticamente em: `http://localhost:3000`

---

## ✅ Verificação

### Backend está rodando?
- Acesse: `http://localhost:8080/api/pacientes`
- Deve retornar: `[]` (lista vazia) ou lista de pacientes

### Frontend está rodando?
- Acesse: `http://localhost:3000`
- Deve mostrar a interface do ClínicaFácil

---

## 🛑 Como Parar

### Parar o Backend:
- No terminal do backend, pressione: `Ctrl + C`

### Parar o Frontend:
- No terminal do frontend, pressione: `Ctrl + C`

---

## 📝 Resumo Rápido

```bash
# Terminal 1 - Backend
mvn spring-boot:run

# Terminal 2 - Frontend (após backend iniciar)
cd frontend
npm start
```

---

## ⚠️ Importante

- **Sempre inicie o backend primeiro**
- **Aguarde o backend iniciar completamente** antes de iniciar o frontend
- **Mantenha ambos os terminais abertos** enquanto usar a aplicação

---

## 🐛 Problemas Comuns

### Frontend não conecta ao backend
- Verifique se o backend está rodando
- Verifique se está em `http://localhost:8080`
- Verifique o arquivo `frontend/src/services/api.js`

### Porta 8080 já em uso
- Feche outras aplicações usando a porta 8080
- Ou altere a porta no `application.properties`

### Porta 3000 já em uso
- Feche o processo na porta 3000
- Ou use outra porta criando `.env` com `PORT=3001`

