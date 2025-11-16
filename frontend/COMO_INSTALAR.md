# 🚀 Como Instalar e Executar o Frontend

## ❌ Problema Atual

O Node.js não está instalado no seu computador. É necessário instalá-lo para executar o frontend React.

---

## ✅ SOLUÇÃO: Instalar Node.js

### Passo 1: Baixar Node.js

1. **Acesse:** https://nodejs.org/
2. **Clique em "Download"** na versão **LTS** (Long Term Support)
   - Exemplo: "Recommended For Most Users" - Node.js 20.x LTS
3. **Baixe o instalador** (.msi para Windows)

### Passo 2: Instalar Node.js

1. **Execute o arquivo baixado** (ex: `node-v20.x.x-x64.msi`)
2. **Siga o assistente de instalação:**
   - Clique em "Next" em todas as telas
   - **IMPORTANTE:** Marque a opção "Automatically install the necessary tools"
   - Clique em "Install"
3. **Aguarde a instalação** terminar
4. **Clique em "Finish"**

### Passo 3: Verificar Instalação

1. **Feche e abra um NOVO terminal/PowerShell**
2. **Execute:**
   ```bash
   node --version
   npm --version
   ```
3. **Se aparecerem números de versão, está instalado! ✅**

### Passo 4: Instalar Dependências do Frontend

1. **Navegue até a pasta do frontend:**
   ```bash
   cd C:\clinica-facil\frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```
   - Isso pode levar alguns minutos na primeira vez

3. **Inicie o frontend:**
   ```bash
   npm start
   ```

4. **O navegador abrirá automaticamente em:** `http://localhost:3000`

---

## 🎯 Resumo Rápido

```bash
# 1. Instalar Node.js (baixar de nodejs.org)
# 2. Reiniciar terminal
# 3. Verificar instalação
node --version
npm --version

# 4. Instalar dependências
cd frontend
npm install

# 5. Iniciar frontend
npm start
```

---

## ⚠️ Importante

- **Reinicie o terminal** após instalar o Node.js
- Se ainda não funcionar, **reinicie o computador**
- Use a versão **LTS** (mais estável)

---

## 🆘 Ainda com Problemas?

### Erro: "npm não é reconhecido"

1. Verifique se o Node.js está instalado:
   ```bash
   where node
   ```
2. Se não aparecer nada, reinstale o Node.js
3. Certifique-se de marcar "Add to PATH" durante a instalação

### Erro: "Permission denied"

Execute o PowerShell como **Administrador**

### Erro: "Cannot find module"

Execute novamente:
```bash
cd frontend
npm install
```

---

## 📝 Alternativa: Usar Apenas o Backend

Se você não quiser instalar o Node.js agora, pode:

1. **Usar apenas o backend** com Postman/Insomnia
2. **Acessar a API diretamente** em `http://localhost:8080/api`
3. **Instalar o Node.js depois** quando quiser testar o frontend

O backend funciona perfeitamente sozinho! O frontend é opcional.

---

**Após instalar o Node.js, volte aqui e execute os comandos acima!** 🚀


