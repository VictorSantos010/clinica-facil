# 🚀 Como Enviar o Projeto para o GitHub - Passo a Passo Simples

## ⚠️ Problema Atual

O Git está tentando usar credenciais de outro usuário. Precisamos usar suas credenciais corretas.

---

## ✅ SOLUÇÃO: Use Personal Access Token

### Passo 1: Criar Token no GitHub

1. **Acesse:** https://github.com/settings/tokens
2. **Clique em:** "Generate new token" → "Generate new token (classic)"
3. **Preencha:**
   - **Note:** `ClinicaFacil`
   - **Expiration:** Escolha (ex: 90 days)
   - **Select scopes:** Marque **repo** ✅
4. **Clique em:** "Generate token" (rolar até o final)
5. **COPIE O TOKEN** que aparece (exemplo: `ghp_xxxxxxxxxxxxxxxxxxxx`)
   - ⚠️ **IMPORTANTE:** Você só verá esse token uma vez! Copie agora!

---

### Passo 2: Limpar Credenciais Antigas no Windows

Abra o **Gerenciador de Credenciais do Windows**:

1. Pressione `Windows + R`
2. Digite: `control /name Microsoft.CredentialManager`
3. Pressione Enter
4. Vá em **Credenciais do Windows**
5. Procure por entradas relacionadas a `github.com`
6. **Remova todas** as credenciais do GitHub que encontrar

**OU** use o PowerShell:

```powershell
# Abrir Gerenciador de Credenciais
cmdkey /list | findstr github
# Se aparecer algo, remova com:
# cmdkey /delete:git:https://github.com
```

---

### Passo 3: Fazer Push Novamente

No terminal, execute:

```bash
git push -u origin main
```

Quando pedir:
- **Username:** `VictorSantos010`
- **Password:** Cole o **Personal Access Token** que você copiou (não use sua senha normal!)

---

## 🎯 Alternativa Mais Simples: Usar GitHub Desktop

Se estiver difícil pelo terminal:

1. **Baixe GitHub Desktop:** https://desktop.github.com/
2. **Instale e faça login** com sua conta GitHub
3. **Adicione o repositório:**
   - File → Add local repository
   - Selecione a pasta `C:\clinica-facil`
4. **Publique:**
   - Clique em "Publish repository"
   - Marque "Keep this code private" (se quiser privado)
   - Clique em "Publish repository"

---

## 📋 Verificar se Funcionou

Após o push, acesse:
```
https://github.com/VictorSantos010/clinica-facil
```

Você deve ver todos os arquivos! ✅

---

## 🆘 Se Ainda Não Funcionar

Tente remover e adicionar o remote novamente:

```bash
git remote remove origin
git remote add origin https://github.com/VictorSantos010/clinica-facil.git
git push -u origin main
```

Use o **Personal Access Token** como senha quando pedir!


