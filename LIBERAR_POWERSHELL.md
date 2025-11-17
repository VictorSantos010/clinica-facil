# Como Liberar o PowerShell para Executar Scripts

## ⚠️ IMPORTANTE
Execute estes comandos **manualmente** no PowerShell **como Administrador** (clique com botão direito no PowerShell e escolha "Executar como administrador").

---

## 🔓 Opções para Liberar o PowerShell

### **Opção 1: Liberar apenas para o Usuário Atual (RECOMENDADO)**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**O que faz:**
- Permite executar scripts locais (criados no seu computador)
- Bloqueia scripts baixados da internet (a menos que sejam assinados)
- Aplica apenas ao seu usuário (não afeta outros usuários)
- **Mais seguro** ✅

---

### **Opção 2: Liberar apenas para esta Sessão (TEMPORÁRIO)**
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

**O que faz:**
- Permite executar qualquer script
- **Válido apenas enquanto o PowerShell estiver aberto**
- Quando fechar e abrir novamente, volta ao padrão
- **Menos seguro, mas temporário** ⚠️

---

### **Opção 3: Liberar Permanentemente (CUIDADO)**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine
```

**O que faz:**
- Permite executar scripts locais para todos os usuários
- **Requer permissões de Administrador**
- **Aplica a todo o sistema**
- ⚠️ **Use com cuidado**

---

## 📝 Passo a Passo (RECOMENDADO)

1. **Abra o PowerShell como Administrador:**
   - Pressione `Windows + X`
   - Clique em "Windows PowerShell (Admin)" ou "Terminal (Admin)"

2. **Execute o comando:**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **Confirme digitando `S` quando solicitado**

4. **Verifique se funcionou:**
   ```powershell
   Get-ExecutionPolicy
   ```
   Deve retornar: `RemoteSigned`

5. **Pronto!** Agora você pode executar os scripts `.ps1` do projeto.

---

## ✅ Verificar Política Atual

Para ver a política atual:
```powershell
Get-ExecutionPolicy -List
```

---

## 🚀 Depois de Liberar

Você poderá executar:
- `.\iniciar-backend.ps1`
- `.\liberar-porta-8080.ps1`
- `.\frontend\iniciar-frontend.ps1`

---

## 💡 Alternativa: Usar Arquivos .bat

Se não quiser alterar a política do PowerShell, você pode usar os arquivos `.bat`:
- `iniciar-backend.bat` (se existir)
- `iniciar-frontend.bat` ✅ (já criado)

Os arquivos `.bat` **não precisam** de permissões especiais!

---

## ❓ Dúvidas?

- **RemoteSigned**: Scripts locais podem executar, scripts da internet precisam ser assinados
- **Bypass**: Remove todas as restrições (use com cuidado)
- **Restricted**: Padrão do Windows - bloqueia todos os scripts

