# ClínicaFácil - Sistema de Agendamento de Clínica

## 📋 Sobre o Projeto

Sistema de gerenciamento de agendamentos para clínica popular desenvolvido como projeto de conclusão da disciplina de Programação Orientada a Objetos (POO) 2025.2.

## 👥 Integrantes do Grupo

Victor Santos


## 🛠️ Tecnologias Utilizadas

### Backend
- **Java 17+**
- **Spring Boot 3.5.7**
  - Spring Web (REST API)
  - Spring Data JPA
  - Spring Validation
- **H2 Database** (banco de dados em memória)
- **Lombok** (redução de boilerplate)
- **Maven** (gerenciamento de dependências)

### Frontend
- **React 18** - Interface web moderna e responsiva
- **Axios** - Cliente HTTP
- **CSS3** - Estilização moderna

## 📦 Como Compilar e Executar

### Pré-requisitos

- Java 17 ou superior instalado
- Maven 3.6+ instalado (ou use o Maven Wrapper incluído no projeto)

### Compilação

```bash
mvn clean compile
```

### Execução

```bash
mvn spring-boot:run
```

Ou usando o Maven Wrapper:

**Windows:**
```bash
mvnw.cmd spring-boot:run
```

**Linux/Mac:**
```bash
./mvnw spring-boot:run
```

O servidor será iniciado em `http://localhost:8080`

### Executar Frontend (Opcional)

O projeto inclui um frontend completo em React. Para executá-lo:

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

O frontend será aberto automaticamente em `http://localhost:3000`

**Nota:** Certifique-se de que o backend está rodando antes de iniciar o frontend.

### Acesso ao Console H2

Após iniciar a aplicação, acesse o console do H2 Database em:
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:clinicafacil`
- Usuário: `sa`
- Senha: *(deixe em branco)*

## 📚 Documentação da API

### Base URL
```
http://localhost:8080/api
```

### Endpoints de Cadastro (CRUD Básico)

#### 1. Cadastrar Paciente
**POST** `/api/pacientes`

**Request Body:**
```json
{
  "nome": "João Silva",
  "cpf": "12345678901",
  "email": "joao.silva@email.com",
  "telefone": "11987654321"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "nome": "João Silva",
  "cpf": "12345678901",
  "email": "joao.silva@email.com",
  "telefone": "11987654321"
}
```

#### 2. Listar Todos os Pacientes
**GET** `/api/pacientes`

**Response:** `200 OK`
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

#### 3. Buscar Paciente por ID
**GET** `/api/pacientes/{id}`

**Response:** `200 OK`
```json
{
  "id": 1,
  "nome": "João Silva",
  "cpf": "12345678901",
  "email": "joao.silva@email.com",
  "telefone": "11987654321"
}
```

#### 4. Cadastrar Médico
**POST** `/api/medicos`

**Request Body:**
```json
{
  "nome": "Dr. Carlos Mendes",
  "crm": "CRM123456",
  "especialidade": "Cardiologia",
  "horarioInicio": "08:00:00",
  "horarioFim": "18:00:00"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "nome": "Dr. Carlos Mendes",
  "crm": "CRM123456",
  "especialidade": "Cardiologia",
  "horarioInicio": "08:00:00",
  "horarioFim": "18:00:00"
}
```

#### 5. Listar Todos os Médicos
**GET** `/api/medicos`

#### 6. Buscar Médico por ID
**GET** `/api/medicos/{id}`

#### 7. Cadastrar Serviço de Exame
**POST** `/api/exames`

**Request Body:**
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

**Response:** `201 Created`
```json
{
  "id": 1,
  "nome": "Raio-X Tórax",
  "nomeExame": "Radiografia de Tórax",
  "sala": "Sala 101",
  "equipamento": "Aparelho de Raio-X Digital",
  "horarioInicio": "08:00:00",
  "horarioFim": "17:00:00"
}
```

#### 8. Listar Todos os Serviços de Exame
**GET** `/api/exames`

#### 9. Buscar Serviço de Exame por ID
**GET** `/api/exames/{id}`

### Endpoints de Agendamento

#### 10. Listar Todos os Itens Agendáveis
**GET** `/api/agendaveis`

Retorna uma lista com todos os itens agendáveis (médicos e exames misturados).

**Response:** `200 OK`
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

#### 11. Listar Horários Disponíveis
**GET** `/api/agendaveis/{id}/agenda?dia=2025-11-20`

Retorna os horários disponíveis para um item agendável em um dia específico. Os horários são calculados em intervalos de 30 minutos, excluindo os horários já agendados.

**Parâmetros:**
- `id`: ID do item agendável (médico ou exame)
- `dia`: Data no formato `YYYY-MM-DD`

**Exemplo:**
```
GET /api/agendaveis/1/agenda?dia=2025-11-20
```

**Response:** `200 OK`
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
  }
]
```

#### 12. Criar Agendamento
**POST** `/api/agendamentos`

**Request Body:**
```json
{
  "idPaciente": 1,
  "idAgendavel": 1,
  "dataHora": "2025-11-20T10:30:00"
}
```

**Response:** `201 Created`
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

**Validações:**
- O horário deve estar dentro do período de trabalho do agendável
- O horário não pode estar já ocupado
- Retorna `400 Bad Request` se as validações falharem

#### 13. Listar Todos os Agendamentos
**GET** `/api/agendamentos`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "paciente": {
      "id": 1,
      "nome": "João Silva"
    },
    "itemAgendado": {
      "id": 1,
      "nome": "Dr. Carlos Mendes"
    },
    "dataHora": "2025-11-20T10:30:00"
  }
]
```

## 🏗️ Arquitetura e Padrões

### Estrutura do Projeto

```
src/main/java/com/clinica/clinicafacil/
├── model/              # Entidades JPA
│   ├── Agendavel.java  # Classe abstrata base
│   ├── Medico.java     # Herda de Agendavel
│   ├── ServicoExame.java # Herda de Agendavel
│   ├── Paciente.java
│   └── Agendamento.java
├── repository/         # Interfaces Spring Data JPA
├── service/            # Lógica de negócio
├── controller/         # Endpoints REST
└── dto/                # Data Transfer Objects
```

## 🔄 Herança e Polimorfismo com JPA

### Estratégia de Herança

O projeto utiliza **herança com estratégia JOINED** da JPA para implementar o polimorfismo entre `Medico` e `ServicoExame`, ambos herdando de `Agendavel`.

#### Classe Base: `Agendavel`

```java
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "agendaveis")
public abstract class Agendavel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    private LocalTime horarioInicio;
    private LocalTime horarioFim;
}
```

#### Classes Filhas

- **`Medico`**: Adiciona atributos específicos (`crm`, `especialidade`)
- **`ServicoExame`**: Adiciona atributos específicos (`nomeExame`, `sala`, `equipamento`)

### Polimorfismo no Relacionamento

A classe `Agendamento` utiliza um relacionamento polimórfico `@ManyToOne` com `Agendavel`:

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "agendavel_id", nullable = false)
private Agendavel itemAgendado;
```

Isso permite que um `Agendamento` possa referenciar tanto um `Medico` quanto um `ServicoExame` de forma transparente, demonstrando o polimorfismo em ação.

### Benefícios da Abordagem

1. **Reutilização de Código**: Atributos comuns (`nome`, `horarioInicio`, `horarioFim`) são definidos uma única vez na classe base
2. **Flexibilidade**: Novos tipos de itens agendáveis podem ser adicionados facilmente estendendo `Agendavel`
3. **Polimorfismo**: O mesmo endpoint (`/api/agendaveis`) retorna diferentes tipos de objetos de forma unificada
4. **Manutenibilidade**: Mudanças nos atributos comuns são feitas em um único lugar

### Estrutura do Banco de Dados

A estratégia JOINED cria três tabelas:

- `agendaveis`: Tabela base com atributos comuns
- `medicos`: Tabela específica com `crm` e `especialidade`
- `servicos_exames`: Tabela específica com `nome_exame`, `sala` e `equipamento`

As tabelas são relacionadas através de chaves estrangeiras, permitindo que o JPA reconstrua o objeto completo através de JOINs.

## 🧪 Testando a API

### Usando Postman ou Insomnia

1. Importe a coleção de endpoints (ou crie manualmente)
2. Configure a base URL: `http://localhost:8080`
3. Teste os endpoints na seguinte ordem:
   1. Criar um paciente
   2. Criar um médico
   3. Criar um serviço de exame
   4. Listar agendáveis
   5. Consultar horários disponíveis
   6. Criar um agendamento

### Exemplo de Fluxo Completo

1. **Criar Paciente:**
   ```json
   POST /api/pacientes
   {
     "nome": "Maria Santos",
     "cpf": "98765432100",
     "email": "maria@email.com",
     "telefone": "11912345678"
   }
   ```

2. **Criar Médico:**
   ```json
   POST /api/medicos
   {
     "nome": "Dr. Ana Costa",
     "crm": "CRM789012",
     "especialidade": "Pediatria",
     "horarioInicio": "09:00:00",
     "horarioFim": "17:00:00"
   }
   ```

3. **Consultar Horários Disponíveis:**
   ```
   GET /api/agendaveis/1/agenda?dia=2025-11-20
   ```

4. **Criar Agendamento:**
   ```json
   POST /api/agendamentos
   {
     "idPaciente": 1,
     "idAgendavel": 1,
     "dataHora": "2025-11-20T10:30:00"
   }
   ```

## 📝 Observações

- Os horários disponíveis são calculados em intervalos de **30 minutos**
- O sistema valida se o horário está dentro do período de trabalho do agendável
- Não é possível criar dois agendamentos para o mesmo item no mesmo horário
- O banco de dados H2 é em memória, então os dados são perdidos ao reiniciar a aplicação

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

