# 🔐 Solução para Enviar ao GitHub

## ❌ Problema Identificado

O Git está tentando usar credenciais de outro usuário (`Maycon-debug`) mas o repositório é de `VictorSantos010`.

## ✅ Soluções

### Opção 1: Usar Personal Access Token (Recomendado)

1. **Criar Token no GitHub:**
   - Acesse: https://github.com/settings/tokens
   - Clique em "Generate new token" → "Generate new token (classic)"
   - Nome: `ClinicaFacil`
   - Selecione escopo: **repo** (marque tudo)
   - Clique em "Generate token"
   - **COPIE O TOKEN** (você só verá uma vez!)

2. **Limpar credenciais antigas:**
   ```bash
   git credential-manager-core erase
   ```
   Quando pedir:
   - protocol: `https`
   - host: `github.com`
   - Pressione Enter duas vezes

3. **Tentar push novamente:**
   ```bash
   git push -u origin main
   ```
   Quando pedir:
   - **Username:** `VictorSantos010`
   - **Password:** Cole o **Personal Access Token** (não a senha!)

---

### Opção 2: Usar SSH (Alternativa)

1. **Gerar chave SSH:**
   ```bash
   ssh-keygen -t ed25519 -C "vhictor39@gmail.com"
   ```
   Pressione Enter para aceitar o local padrão
   (Deixe a senha em branco ou crie uma)

2. **Copiar a chave pública:**
   ```bash
   type %USERPROFILE%\.ssh\id_ed25519.pub
   ```
   Copie todo o conteúdo que aparecer

3. **Adicionar no GitHub:**
   - Acesse: https://github.com/settings/keys
   - "New SSH key"
   - Title: `ClinicaFacil`
   - Key: Cole o conteúdo copiado
   - "Add SSH key"

4. **Mudar URL para SSH:**
   ```bash
   git remote set-url origin git@github.com:VictorSantos010/clinica-facil.git
   ```

5. **Fazer push:**
   ```bash
   git push -u origin main
   ```

---

### Opção 3: Usar GitHub CLI (Mais Fácil)

1. **Instalar GitHub CLI:**
   - Baixe: https://cli.github.com/
   - Instale

2. **Fazer login:**
   ```bash
   gh auth login
   ```
   Siga as instruções na tela

3. **Fazer push:**
   ```bash
   git push -u origin main
   ```

---

## 🎯 Solução Rápida (Tente Esta Primeiro!)

Execute estes comandos no terminal:

```bash
# Limpar credenciais antigas
git credential-manager-core erase
# (Quando pedir, digite: protocol=https, host=github.com, depois Enter duas vezes)

# Tentar push novamente
git push -u origin main
```

Quando pedir autenticação:
- **Username:** `VictorSantos010`
- **Password:** Use um **Personal Access Token** (veja como criar acima)

---

## 📝 Como Criar Personal Access Token (Passo a Passo)

1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token" → "Generate new token (classic)"
3. Preencha:
   - **Note:** `ClinicaFacil`
   - **Expiration:** Escolha uma data (ex: 90 dias)
   - **Select scopes:** Marque **repo** (isso marca tudo dentro de repo)
4. Clique em "Generate token" (no final da página)
5. **COPIE O TOKEN IMEDIATAMENTE** (exemplo: `ghp_xxxxxxxxxxxxxxxxxxxx`)
6. Use esse token como senha quando o Git pedir!

---

## ✅ Verificar se Funcionou

Após fazer o push com sucesso, acesse:
```
https://github.com/VictorSantos010/clinica-facil
```

Você deve ver todos os arquivos do projeto! 🎉

---

## 🆘 Ainda com Problemas?

Se nada funcionar, tente:

1. **Verificar se o repositório existe:**
   - Acesse: https://github.com/VictorSantos010/clinica-facil
   - Se não existir, crie um novo repositório no GitHub

2. **Remover e adicionar remote novamente:**
   ```bash
   git remote remove origin
   git remote add origin https://github.com/VictorSantos010/clinica-facil.git
   git push -u origin main
   ```

3. **Verificar permissões:**
   - Certifique-se de estar logado como `VictorSantos010` no GitHub
   - Verifique se você tem permissão para fazer push no repositório


