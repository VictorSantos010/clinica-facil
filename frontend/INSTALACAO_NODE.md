# 📦 Como Instalar Node.js e npm

## ❌ Problema

O erro `npm não é reconhecido` significa que o Node.js não está instalado ou não está no PATH do sistema.

## ✅ Solução: Instalar Node.js

### Opção 1: Instalar via Site Oficial (Recomendado)

1. **Acesse:** https://nodejs.org/
2. **Baixe a versão LTS** (Long Term Support) - recomendada
   - Versão atual: Node.js 18.x ou 20.x
3. **Execute o instalador:**
   - Marque a opção "Automatically install the necessary tools"
   - Siga as instruções do instalador
4. **Reinicie o terminal/PowerShell** após a instalação
5. **Verifique a instalação:**
   ```bash
   node --version
   npm --version
   ```

### Opção 2: Instalar via Chocolatey (Windows)

Se você tem Chocolatey instalado:

```bash
choco install nodejs
```

### Opção 3: Instalar via Winget (Windows 10/11)

```bash
winget install OpenJS.NodeJS.LTS
```

## 🔍 Verificar Instalação

Após instalar, abra um **NOVO terminal** e execute:

```bash
node --version
npm --version
```

Se aparecerem números de versão, está instalado corretamente! ✅

## 🚀 Depois de Instalar

1. **Navegue até a pasta do frontend:**
   ```bash
   cd frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o frontend:**
   ```bash
   npm start
   ```

## ⚠️ Importante

- **Reinicie o terminal** após instalar o Node.js
- Se ainda não funcionar, reinicie o computador
- Certifique-se de baixar a versão **LTS** (mais estável)

## 🐛 Problemas Comuns

### "npm ainda não funciona após instalar"

1. Feche e abra um novo terminal
2. Verifique se o Node.js está no PATH:
   ```bash
   where node
   ```
3. Se não aparecer nada, adicione manualmente ao PATH:
   - O Node.js geralmente instala em: `C:\Program Files\nodejs\`
   - Adicione essa pasta ao PATH do Windows

### "Erro de permissão"

Execute o PowerShell como Administrador e tente novamente.

---

**Após instalar o Node.js, volte aqui e execute `npm install` novamente!**


