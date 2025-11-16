# 🧪 Guia de Testes com Postman - ClínicaFácil

## 📥 Importando a Coleção do Postman

1. Abra o Postman
2. Clique em **Import** (canto superior esquerdo)
3. Selecione o arquivo `ClinicFacil.postman_collection.json` (se disponível)
4. Ou copie a coleção JSON abaixo e cole no Postman

## 🚀 Passo a Passo para Testar

### 1. Iniciar a Aplicação

Primeiro, certifique-se de que a aplicação está rodando:

```bash
mvn spring-boot:run
```

A aplicação estará disponível em: `http://localhost:8080`

### 2. Configurar Variáveis de Ambiente (Opcional mas Recomendado)

1. No Postman, clique em **Environments** (lateral esquerda)
2. Clique em **+** para criar um novo ambiente
3. Nome: `ClínicaFácil Local`
4. Adicione as variáveis:
   - `base_url`: `http://localhost:8080`
   - `api_base`: `{{base_url}}/api`
5. Salve e selecione o ambiente

Agora você pode usar `{{api_base}}` em todas as requisições!

### 3. Testar os Endpoints na Ordem

#### ✅ Passo 1: Criar um Paciente

**Método:** `POST`  
**URL:** `http://localhost:8080/api/pacientes`  
**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "nome": "João Silva",
  "cpf": "12345678901",
  "email": "joao.silva@email.com",
  "telefone": "11987654321"
}
```

**O que esperar:**
- Status: `201 Created`
- Response com o paciente criado incluindo o `id` gerado
- **Anote o `id` do paciente** (você precisará dele depois)

---

#### ✅ Passo 2: Criar um Médico

**Método:** `POST`  
**URL:** `http://localhost:8080/api/medicos`  
**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "nome": "Dr. Carlos Mendes",
  "crm": "CRM123456",
  "especialidade": "Cardiologia",
  "horarioInicio": "08:00:00",
  "horarioFim": "18:00:00"
}
```

**O que esperar:**
- Status: `201 Created`
- Response com o médico criado incluindo o `id`
- **Anote o `id` do médico**

---

#### ✅ Passo 3: Criar um Serviço de Exame

**Método:** `POST`  
**URL:** `http://localhost:8080/api/exames`  
**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "nome": "Raio-X Tórax",
  "nomeExame": "Radiografia de Tórax",
  "sala": "Sala 101",
  "equipamento": "Aparelho de Raio-X Digital",
  "horarioInicio": "08:00:00",
  "horarioFim": "17:00:00"
}
```

**O que esperar:**
- Status: `201 Created`
- Response com o serviço criado incluindo o `id`
- **Anote o `id` do serviço**

---

#### ✅ Passo 4: Listar Todos os Itens Agendáveis

**Método:** `GET`  
**URL:** `http://localhost:8080/api/agendaveis`

**O que esperar:**
- Status: `200 OK`
- Lista com médicos e exames misturados
- Verifique que aparecem tanto o médico quanto o exame criados

---

#### ✅ Passo 5: Consultar Horários Disponíveis

**Método:** `GET`  
**URL:** `http://localhost:8080/api/agendaveis/{id}/agenda?dia=2025-11-20`

**Substitua `{id}` pelo ID do médico criado (ex: `1`)**

**Exemplo completo:**
```
http://localhost:8080/api/agendaveis/1/agenda?dia=2025-11-20
```

**O que esperar:**
- Status: `200 OK`
- Lista de horários disponíveis em intervalos de 30 minutos
- Exemplo de resposta:
```json
[
  {"horario": "08:00:00"},
  {"horario": "08:30:00"},
  {"horario": "09:00:00"},
  ...
]
```

---

#### ✅ Passo 6: Criar um Agendamento

**Método:** `POST`  
**URL:** `http://localhost:8080/api/agendamentos`  
**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "idPaciente": 1,
  "idAgendavel": 1,
  "dataHora": "2025-11-20T10:30:00"
}
```

**Substitua os IDs pelos valores reais:**
- `idPaciente`: ID do paciente criado no Passo 1
- `idAgendavel`: ID do médico criado no Passo 2
- `dataHora`: Use um horário que apareceu na lista de disponíveis

**O que esperar:**
- Status: `201 Created`
- Response com o agendamento completo incluindo paciente e item agendado

---

#### ✅ Passo 7: Listar Todos os Agendamentos

**Método:** `GET`  
**URL:** `http://localhost:8080/api/agendamentos`

**O que esperar:**
- Status: `200 OK`
- Lista com todos os agendamentos criados

---

#### ✅ Passo 8: Verificar Horários Novamente

**Método:** `GET`  
**URL:** `http://localhost:8080/api/agendaveis/1/agenda?dia=2025-11-20`

**O que esperar:**
- O horário `10:30:00` não deve mais aparecer na lista (foi agendado)

---

## 🧪 Testes Adicionais

### Teste de Validação - CPF Duplicado

**Método:** `POST`  
**URL:** `http://localhost:8080/api/pacientes`  
**Body:**
```json
{
  "nome": "Outro Paciente",
  "cpf": "12345678901",
  "email": "outro@email.com",
  "telefone": "11999999999"
}
```

**O que esperar:**
- Status: `500 Internal Server Error` ou `400 Bad Request`
- Erro indicando que o CPF já existe

### Teste de Validação - Horário Fora do Período

**Método:** `POST`  
**URL:** `http://localhost:8080/api/agendamentos`  
**Body:**
```json
{
  "idPaciente": 1,
  "idAgendavel": 1,
  "dataHora": "2025-11-20T07:00:00"
}
```

**O que esperar:**
- Status: `400 Bad Request`
- Erro indicando que o horário está fora do período de trabalho

### Teste de Validação - Horário Já Ocupado

**Método:** `POST`  
**URL:** `http://localhost:8080/api/agendamentos`  
**Body:**
```json
{
  "idPaciente": 1,
  "idAgendavel": 1,
  "dataHora": "2025-11-20T10:30:00"
}
```

**O que esperar:**
- Status: `400 Bad Request`
- Erro indicando que o horário não está disponível

---

## 📋 Checklist de Testes

- [ ] Criar paciente com sucesso
- [ ] Criar médico com sucesso
- [ ] Criar serviço de exame com sucesso
- [ ] Listar agendáveis retorna médicos e exames
- [ ] Consultar horários disponíveis retorna lista correta
- [ ] Criar agendamento com sucesso
- [ ] Horário agendado não aparece mais na lista de disponíveis
- [ ] Validação de CPF duplicado funciona
- [ ] Validação de horário fora do período funciona
- [ ] Validação de horário já ocupado funciona

---

## 💡 Dicas

1. **Use a aba "Tests" no Postman** para automatizar verificações:
   ```javascript
   pm.test("Status code is 201", function () {
       pm.response.to.have.status(201);
   });
   ```

2. **Salve os IDs em variáveis** para usar em outras requisições:
   ```javascript
   var jsonData = pm.response.json();
   pm.environment.set("paciente_id", jsonData.id);
   ```

3. **Use Collections** para organizar todos os endpoints

4. **Exporte sua Collection** para compartilhar com a equipe

---

## 🔍 Verificando no Console H2

1. Acesse: `http://localhost:8080/h2-console`
2. JDBC URL: `jdbc:h2:mem:clinicafacil`
3. Usuário: `sa`
4. Senha: *(deixe em branco)*
5. Execute queries como:
   ```sql
   SELECT * FROM pacientes;
   SELECT * FROM agendaveis;
   SELECT * FROM medicos;
   SELECT * FROM servicos_exames;
   SELECT * FROM agendamentos;
   ```

---

## 🐛 Solução de Problemas

**Erro: "Connection refused"**
- Verifique se a aplicação está rodando
- Confirme que está usando a porta 8080

**Erro: "404 Not Found"**
- Verifique se a URL está correta
- Confirme que está usando `/api` antes do endpoint

**Erro: "400 Bad Request"**
- Verifique o formato do JSON
- Confirme que todos os campos obrigatórios estão presentes
- Verifique o formato das datas (ISO 8601)

**Erro: "500 Internal Server Error"**
- Verifique os logs da aplicação
- Pode ser um erro de validação ou constraint do banco

