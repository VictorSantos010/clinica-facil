# 🎯 Guia Completo - Testando Todos os Endpoints no Postman

## 📋 Pré-requisitos

✅ Aplicação rodando (você já tem isso - 200 OK funcionou!)  
✅ Ambiente "ClinicaFacil Local" configurado  
✅ Variável `base_url` = `http://localhost:8080`

---

## 🚀 PASSO 1: Criar um Paciente

### O que fazer:

1. **No Postman, clique em "New"** (canto superior esquerdo) ou use a coleção importada
2. **Selecione "HTTP Request"**
3. **Configure assim:**
   - **Método:** Selecione `POST` no dropdown (está escrito "GET" por padrão)
   - **URL:** Digite `{{base_url}}/api/pacientes`
   - **Headers:** Clique na aba "Headers"
     - Key: `Content-Type`
     - Value: `application/json`
   - **Body:** Clique na aba "Body"
     - Selecione `raw`
     - No dropdown ao lado, seleção `JSON`
     - Cole este JSON:
     ```json
     {
       "nome": "João Silva",
       "cpf": "12345678901",
       "email": "joao.silva@email.com",
       "telefone": "11987654321"
     }
     ```

4. **Clique em "Send"** (botão azul à direita)

### ✅ Resultado esperado:
- Status: `201 Created`
- Response Body:
```json
{
  "id": 1,
  "nome": "João Silva",
  "cpf": "12345678901",
  "email": "joao.silva@email.com",
  "telefone": "11987654321"
}
```

### 📝 IMPORTANTE:
**Anote o ID do paciente!** (exemplo: `id: 1`) - você vai precisar depois.

---

## 🚀 PASSO 2: Listar Todos os Pacientes

### O que fazer:

1. **Crie uma nova requisição** (ou duplique a anterior)
2. **Configure:**
   - **Método:** `GET`
   - **URL:** `{{base_url}}/api/pacientes`
   - **Body:** Não precisa (GET não tem body)

3. **Clique em "Send"**

### ✅ Resultado esperado:
- Status: `200 OK`
- Response Body: Lista com o paciente criado:
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "cpf": "12345678901",
    "email": "joao.silva@email.com",
    "telefone": "11987654321"
  }
]
```

---

## 🚀 PASSO 3: Criar um Médico

### O que fazer:

1. **Nova requisição**
2. **Configure:**
   - **Método:** `POST`
   - **URL:** `{{base_url}}/api/medicos`
   - **Headers:**
     - Key: `Content-Type`
     - Value: `application/json`
   - **Body (raw JSON):**
     ```json
     {
       "nome": "Dr. Carlos Mendes",
       "crm": "CRM123456",
       "especialidade": "Cardiologia",
       "horarioInicio": "08:00:00",
       "horarioFim": "18:00:00"
     }
     ```

3. **Clique em "Send"**

### ✅ Resultado esperado:
- Status: `201 Created`
- Response com o médico criado incluindo o `id`

### 📝 IMPORTANTE:
**Anote o ID do médico!** (exemplo: `id: 1`)

---

## 🚀 PASSO 4: Criar um Serviço de Exame

### O que fazer:

1. **Nova requisição**
2. **Configure:**
   - **Método:** `POST`
   - **URL:** `{{base_url}}/api/exames`
   - **Headers:**
     - Key: `Content-Type`
     - Value: `application/json`
   - **Body (raw JSON):**
     ```json
     {
       "nome": "Raio-X Tórax",
       "nomeExame": "Radiografia de Tórax",
       "sala": "Sala 101",
       "equipamento": "Aparelho de Raio-X Digital",
       "horarioInicio": "08:00:00",
       "horarioFim": "17:00:00"
     }

3. **Clique em "Send"**

### ✅ Resultado esperado:
- Status: `201 Created`
- Response com o serviço criado incluindo o `id`

### 📝 IMPORTANTE:
**Anote o ID do serviço!** (exemplo: `id: 2`)

---

## 🚀 PASSO 5: Listar Todos os Itens Agendáveis

### O que fazer:

1. **Nova requisição**
2. **Configure:**
   - **Método:** `GET`
   - **URL:** `{{base_url}}/api/agendaveis`
   - **Body:** Não precisa

3. **Clique em "Send"**

### ✅ Resultado esperado:
- Status: `200 OK`
- Response Body: Lista com médico E exame misturados:
```json
[
  {
    "id": 1,
    "nome": "Dr. Carlos Mendes",
    "horarioInicio": "08:00:00",
    "horarioFim": "18:00:00"
  },
  {
    "id": 2,
    "nome": "Raio-X Tórax",
    "horarioInicio": "08:00:00",
    "horarioFim": "17:00:00"
  }
]
```

**🎉 Isso demonstra o polimorfismo!** O mesmo endpoint retorna diferentes tipos (Médico e Exame).

---

## 🚀 PASSO 6: Consultar Horários Disponíveis

### O que fazer:

1. **Nova requisição**
2. **Configure:**
   - **Método:** `GET`
   - **URL:** `{{base_url}}/api/agendaveis/1/agenda?dia=2025-11-20`
     - **Substitua `1` pelo ID do médico que você anotou**
     - **A data `2025-11-20` pode ser qualquer data futura**
   - **Body:** Não precisa

3. **Clique em "Send"**

### ✅ Resultado esperado:
- Status: `200 OK`
- Response Body: Lista de horários disponíveis em intervalos de 30 minutos:
```json
[
  {
    "horario": "08:00:00"
  },
  {
    "horario": "08:30:00"
  },
  {
    "horario": "09:00:00"
  },
  {
    "horario": "09:30:00"
  },
  {
    "horario": "10:00:00"
  },
  {
    "horario": "10:30:00"
  }
  // ... e assim por diante até o horarioFim
]
```

### 📝 IMPORTANTE:
**Escolha um horário da lista!** (exemplo: `10:30:00`) - você vai usar no próximo passo.

---

## 🚀 PASSO 7: Criar um Agendamento

### O que fazer:

1. **Nova requisição**
2. **Configure:**
   - **Método:** `POST`
   - **URL:** `{{base_url}}/api/agendamentos`
   - **Headers:**
     - Key: `Content-Type`
     - Value: `application/json`
   - **Body (raw JSON):**
     ```json
     {
       "idPaciente": 1,
       "idAgendavel": 1,
       "dataHora": "2025-11-20T10:30:00"
     }
     ```
     - **Substitua `idPaciente` pelo ID do paciente que você anotou**
     - **Substitua `idAgendavel` pelo ID do médico (ou exame)**
     - **Substitua a data/hora:**
       - Data: use a mesma do passo anterior (`2025-11-20`)
       - Hora: use um horário que apareceu na lista de disponíveis (`10:30:00`)
       - **Formato completo:** `2025-11-20T10:30:00` (ano-mês-dia**T**hora:minuto:segundo)

3. **Clique em "Send"**

### ✅ Resultado esperado:
- Status: `201 Created`
- Response Body com o agendamento completo:
```json
{
  "id": 1,
  "paciente": {
    "id": 1,
    "nome": "João Silva",
    "cpf": "12345678901",
    "email": "joao.silva@email.com",
    "telefone": "11987654321"
  },
  "itemAgendado": {
    "id": 1,
    "nome": "Dr. Carlos Mendes",
    "horarioInicio": "08:00:00",
    "horarioFim": "18:00:00"
  },
  "dataHora": "2025-11-20T10:30:00"
}
```

---

## 🚀 PASSO 8: Listar Todos os Agendamentos

### O que fazer:

1. **Nova requisição**
2. **Configure:**
   - **Método:** `GET`
   - **URL:** `{{base_url}}/api/agendamentos`
   - **Body:** Não precisa

3. **Clique em "Send"**

### ✅ Resultado esperado:
- Status: `200 OK`
- Response Body: Lista com o agendamento criado

---

## 🚀 PASSO 9: Verificar que o Horário Foi Ocupado

### O que fazer:

1. **Execute novamente o PASSO 6** (Consultar Horários Disponíveis)
2. **Use a mesma data e o mesmo ID do médico**

### ✅ Resultado esperado:
- O horário `10:30:00` **NÃO deve mais aparecer** na lista!
- Isso prova que o sistema está funcionando corretamente.

---

## 🧪 TESTES DE VALIDAÇÃO (Opcional)

### Teste 1: Tentar Criar Paciente com CPF Duplicado

1. **Nova requisição POST** para `/api/pacientes`
2. **Body:**
```json
{
  "nome": "Outro Paciente",
  "cpf": "12345678901",
  "email": "outro@email.com",
  "telefone": "11999999999"
}
```
3. **Clique em "Send"**

### ✅ Resultado esperado:
- Status: `500 Internal Server Error` ou `400 Bad Request`
- Erro indicando que o CPF já existe

---

### Teste 2: Tentar Agendar em Horário Fora do Período

1. **Nova requisição POST** para `/api/agendamentos`
2. **Body:**
```json
{
  "idPaciente": 1,
  "idAgendavel": 1,
  "dataHora": "2025-11-20T07:00:00"
}
```
(07:00 está antes do horarioInicio 08:00)

3. **Clique em "Send"**

### ✅ Resultado esperado:
- Status: `400 Bad Request`
- Erro indicando que o horário está fora do período de trabalho

---

### Teste 3: Tentar Agendar em Horário Já Ocupado

1. **Nova requisição POST** para `/api/agendamentos`
2. **Body:**
```json
{
  "idPaciente": 1,
  "idAgendavel": 1,
  "dataHora": "2025-11-20T10:30:00"
}
```
(Mesmo horário que você já agendou)

3. **Clique em "Send"**

### ✅ Resultado esperado:
- Status: `400 Bad Request`
- Erro indicando que o horário não está disponível

---

## 📊 Resumo dos Endpoints Testados

| # | Método | Endpoint | Descrição |
|---|--------|----------|-----------|
| 1 | POST | `/api/pacientes` | Criar paciente |
| 2 | GET | `/api/pacientes` | Listar pacientes |
| 3 | POST | `/api/medicos` | Criar médico |
| 4 | POST | `/api/exames` | Criar serviço de exame |
| 5 | GET | `/api/agendaveis` | Listar itens agendáveis |
| 6 | GET | `/api/agendaveis/{id}/agenda?dia=YYYY-MM-DD` | Horários disponíveis |
| 7 | POST | `/api/agendamentos` | Criar agendamento |
| 8 | GET | `/api/agendamentos` | Listar agendamentos |

---

## 💡 Dicas Importantes

1. **Sempre anote os IDs** retornados nas respostas
2. **Use a mesma data** em todos os testes de agendamento
3. **Escolha horários que aparecem na lista** de disponíveis
4. **Formato de data/hora:** `YYYY-MM-DDTHH:mm:ss` (exemplo: `2025-11-20T10:30:00`)
5. **Salve suas requisições** no Postman para reutilizar depois

---

## 🐛 Problemas Comuns

### Erro: "Connection refused"
- **Solução:** Verifique se a aplicação está rodando

### Erro: "404 Not Found"
- **Solução:** Verifique se a URL está correta (deve ter `/api` antes do endpoint)

### Erro: "400 Bad Request"
- **Solução:** Verifique o formato do JSON e se todos os campos obrigatórios estão presentes

### Erro: "500 Internal Server Error"
- **Solução:** Pode ser validação (CPF duplicado, horário inválido, etc.) - verifique os logs da aplicação

---

## ✅ Checklist Final

- [ ] Criar paciente com sucesso
- [ ] Listar pacientes
- [ ] Criar médico com sucesso
- [ ] Criar serviço de exame com sucesso
- [ ] Listar agendáveis (médicos e exames misturados)
- [ ] Consultar horários disponíveis
- [ ] Criar agendamento com sucesso
- [ ] Listar agendamentos
- [ ] Verificar que horário agendado não aparece mais na lista
- [ ] Testar validações (opcional)

**Parabéns! Você testou toda a API! 🎉**

