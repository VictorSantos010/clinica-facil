# 🚀 Guia Completo - Enviar Projeto para GitHub

## 📋 Pré-requisitos

1. **Git instalado** - Verifique com: `git --version`
2. **Conta no GitHub** - Crie em: https://github.com
3. **Projeto pronto** - ✅ Você já tem!

---

## 🔧 PASSO 1: Verificar se Git está instalado

Abra o terminal e execute:

```bash
git --version
```

Se aparecer uma versão (ex: `git version 2.x.x`), está instalado! ✅

Se não estiver instalado, baixe em: https://git-scm.com/downloads

---

## 📦 PASSO 2: Inicializar o Repositório Git

No terminal, dentro da pasta do projeto (`C:\clinica-facil`), execute:

```bash
git init
```

Isso cria a pasta `.git` (oculta) que gerencia o repositório.

---

## 📝 PASSO 3: Configurar Git (se ainda não configurou)

Configure seu nome e email (use os mesmos do GitHub):

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
```

**Exemplo:**
```bash
git config --global user.name "Victor Santos"
git config --global user.email "victor@email.com"
```

---

## 📂 PASSO 4: Adicionar Arquivos ao Git

Adicione todos os arquivos do projeto:

```bash
git add .
```

Isso adiciona todos os arquivos (exceto os que estão no `.gitignore`).

---

## 💾 PASSO 5: Fazer o Primeiro Commit

Salve as mudanças com uma mensagem descritiva:

```bash
git commit -m "Initial commit: Projeto ClínicaFácil - Sistema de agendamento com herança e polimorfismo JPA"
```

---

## 🌐 PASSO 6: Criar Repositório no GitHub

1. **Acesse:** https://github.com
2. **Faça login** na sua conta
3. **Clique no botão "+"** (canto superior direito)
4. **Selecione "New repository"**
5. **Preencha:**
   - **Repository name:** `clinica-facil` (ou outro nome)
   - **Description:** `Sistema de agendamento de clínica - Projeto POO 2025.2`
   - **Visibility:** Escolha **Public** (para o projeto) ou **Private**
   - **NÃO marque** "Add a README file" (já temos um)
   - **NÃO marque** "Add .gitignore" (já temos um)
   - **NÃO marque** "Choose a license"
6. **Clique em "Create repository"**

---

## 🔗 PASSO 7: Conectar ao Repositório Remoto

Após criar o repositório, o GitHub mostrará comandos. Use estes:

```bash
git remote add origin https://github.com/SEU-USUARIO/clinica-facil.git
```

**Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub!**

**Exemplo:**
```bash
git remote add origin https://github.com/victorsantos/clinica-facil.git
```

---

## 📤 PASSO 8: Enviar para o GitHub

Envie o código para o GitHub:

```bash
git branch -M main
git push -u origin main
```

Se pedir autenticação:
- **Username:** Seu usuário do GitHub
- **Password:** Use um **Personal Access Token** (não a senha normal)

### Como criar Personal Access Token:

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Dê um nome (ex: "ClinicaFacil")
4. Selecione escopo: **repo** (marcar tudo dentro de repo)
5. Generate token
6. **Copie o token** (você só verá uma vez!)
7. Use esse token como senha quando o Git pedir

---

## ✅ PASSO 9: Verificar

Acesse seu repositório no GitHub:
```
https://github.com/SEU-USUARIO/clinica-facil
```

Você deve ver todos os arquivos do projeto! 🎉

---

## 🔄 Comandos para Futuras Atualizações

Sempre que fizer mudanças no código:

```bash
# 1. Ver o que mudou
git status

# 2. Adicionar mudanças
git add .

# 3. Fazer commit
git commit -m "Descrição das mudanças"

# 4. Enviar para GitHub
git push
```

---

## 📋 Checklist Final

- [ ] Git instalado
- [ ] Repositório inicializado (`git init`)
- [ ] Git configurado (nome e email)
- [ ] Arquivos adicionados (`git add .`)
- [ ] Primeiro commit feito
- [ ] Repositório criado no GitHub
- [ ] Repositório remoto conectado
- [ ] Código enviado (`git push`)
- [ ] Projeto visível no GitHub

---

## 🐛 Problemas Comuns

### Erro: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/clinica-facil.git
```

### Erro: "Authentication failed"
- Use Personal Access Token em vez da senha
- Ou configure SSH keys

### Erro: "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## 💡 Dica Extra: Adicionar Integrantes

Se for trabalho em grupo:

1. GitHub → Settings → Collaborators
2. Add people
3. Digite o username do colega
4. Ele receberá um convite por email

---

**Pronto! Seu projeto está no GitHub! 🚀**

