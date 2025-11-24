# 🏥 Clínica Fácil

Sistema completo de gerenciamento de agendamentos para clínicas médicas, desenvolvido com Spring Boot (Backend) e React (Frontend).

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Executar](#-como-executar)
- [API Endpoints](#-api-endpoints)
- [Banco de Dados](#-banco-de-dados)
- [Autenticação](#-autenticação)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Design System](#-design-system)
- [Scripts Úteis](#-scripts-úteis)
- [Troubleshooting](#-troubleshooting)
- [Contribuindo](#-contribuindo)

---

## 🎯 Sobre o Projeto

O **Clínica Fácil** é um sistema web completo para gerenciamento de agendamentos de clínicas médicas. O sistema permite:

- **Área Pública**: Visualização de médicos disponíveis, horários e solicitação de agendamentos
- **Área Administrativa**: Gerenciamento completo de pacientes, médicos, exames e agendamentos

### Características Principais

- ✅ Interface moderna e responsiva
- ✅ Design profissional com paleta de cores azul (inspirado em clínicas odontológicas)
- ✅ Sistema de autenticação para administradores
- ✅ CRUD completo para todas as entidades
- ✅ Validação de dados no frontend e backend
- ✅ Banco de dados H2 (persistente em arquivo)
- ✅ API RESTful completa
- ✅ CORS configurado para desenvolvimento

---

## 🛠️ Tecnologias Utilizadas

### Backend

- **Java 21** - Linguagem de programação
- **Spring Boot 3.2.12** - Framework Java
  - Spring Web (REST API)
  - Spring Data JPA (Persistência)
  - Spring Validation (Validação)
- **Hibernate** - ORM (Object-Relational Mapping)
- **H2 Database** - Banco de dados em memória/arquivo
- **Lombok** - Redução de boilerplate
- **Maven** - Gerenciamento de dependências

### Frontend

- **React 18.2.0** - Biblioteca JavaScript
- **React Hooks** - Gerenciamento de estado
- **Axios 1.6.0** - Cliente HTTP
- **CSS3** - Estilização
  - Design System customizado
  - Glassmorphism
  - Animações CSS
  - Responsive Design

### Ferramentas

- **Node.js** - Runtime JavaScript
- **npm** - Gerenciador de pacotes
- **Maven Wrapper** - Build sem instalação do Maven
- **ESLint** - Linter JavaScript

---

## ✨ Funcionalidades

### Área Pública (Home)

- 🏠 Página inicial com banner personalizado
- 👨‍⚕️ Visualização de médicos disponíveis em grid moderno
- 📅 Visualização de horários disponíveis por médico
- 📋 Solicitação de calendário de consultas via modal
- 🗺️ Mapa de localização (placeholder)
- 📱 Design totalmente responsivo

### Área Administrativa

#### Dashboard
- 📊 Visão geral do sistema
- 🎯 Acesso rápido a todas as funcionalidades
- 📈 Cards interativos com ícones SVG

#### Gerenciamento de Pacientes
- ➕ Cadastro de novos pacientes
- 📋 Listagem de pacientes cadastrados
- ✏️ Edição de dados (futuro)
- 🗑️ Exclusão de pacientes

#### Gerenciamento de Médicos
- ➕ Cadastro de médicos com foto
- 📋 Listagem em grid moderno
- ✏️ Edição completa de dados
- 🗑️ Exclusão de médicos
- 📸 Upload e redimensionamento de fotos
- ⏰ Configuração de horários de atendimento

#### Gerenciamento de Exames
- ➕ Cadastro de serviços de exames
- 📋 Listagem de exames disponíveis
- ✏️ Edição de exames
- 🗑️ Exclusão de exames

#### Agendamentos
- ➕ Criação de novos agendamentos
- 📋 Listagem de todos os agendamentos
- 🔍 Consulta de horários disponíveis
- ⚠️ Validação de conflitos de horário

---

## 📁 Estrutura do Projeto

```
clinica-facil/
├── frontend/                 # Aplicação React
│   ├── public/              # Arquivos públicos
│   │   ├── images/          # Imagens e banners
│   │   └── index.html       # HTML principal
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── contexts/        # Context API (Auth)
│   │   ├── layouts/         # Layouts (AdminLayout)
│   │   ├── pages/           # Páginas (HomePage)
│   │   ├── services/        # Serviços (API)
│   │   └── styles/          # Estilos globais
│   ├── package.json         # Dependências Node
│   └── build/               # Build de produção
│
├── src/main/java/           # Código fonte Java
│   └── com/clinica/clinicafacil/
│       ├── config/          # Configurações (CORS, Jackson)
│       ├── controller/      # Controllers REST
│       ├── dto/             # Data Transfer Objects
│       ├── exception/       # Exceções customizadas
│       ├── model/           # Entidades JPA
│       ├── repository/      # Repositórios JPA
│       └── service/         # Lógica de negócio
│
├── src/main/resources/
│   └── application.properties  # Configurações Spring
│
├── data/                    # Banco de dados H2 (gerado)
│   └── clinicafacil.mv.db
│
├── pom.xml                  # Configuração Maven
├── mvnw                     # Maven Wrapper (Linux/Mac)
└── mvnw.cmd                 # Maven Wrapper (Windows)
```

---

## 📦 Pré-requisitos

### Backend

- **Java 21** ou superior
  - Verificar: `java -version`
  - Download: [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) ou [OpenJDK](https://adoptium.net/)
- **Maven 3.6+** (opcional, projeto inclui Maven Wrapper)

### Frontend

- **Node.js 16+** e **npm**
  - Verificar: `node -v` e `npm -v`
  - Download: [Node.js](https://nodejs.org/)

### Sistema Operacional

- Windows 10/11
- Linux
- macOS

---

## 🚀 Instalação

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd clinica-facil
```

### 2. Instalar Dependências do Frontend

```bash
cd frontend
npm install
cd ..
```

### 3. Configurar Backend

O projeto já está configurado. O banco de dados H2 será criado automaticamente na primeira execução.

**Configurações importantes** (`src/main/resources/application.properties`):

```properties
# Porta do servidor
server.port=8080

# Banco de dados H2 (persistente)
spring.datasource.url=jdbc:h2:file:./data/clinicafacil
spring.datasource.username=sa
spring.datasource.password=

# H2 Console (acesso via navegador)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

---

## ▶️ Como Executar

### Opção 1: Scripts Automatizados (Recomendado)

#### Windows

**Backend:**
```powershell
.\iniciar-backend.ps1
```

**Frontend:**
```powershell
cd frontend
.\iniciar-frontend.ps1
```

Ou use os arquivos `.bat`:
```cmd
iniciar-backend.bat
cd frontend
iniciar-frontend.bat
```

#### Linux/Mac

```bash
# Backend
./mvnw spring-boot:run

# Frontend (em outro terminal)
cd frontend
npm start
```

### Opção 2: Comandos Manuais

#### Backend

```bash
# Usando Maven Wrapper
./mvnw spring-boot:run

# Ou usando Maven instalado
mvn spring-boot:run
```

O backend estará disponível em: `http://localhost:8080`

#### Frontend

```bash
cd frontend
npm start
```

O frontend estará disponível em: `http://localhost:3000`

### Verificar se está funcionando

1. **Backend**: Acesse `http://localhost:8080/h2-console` (H2 Console)
2. **Frontend**: Acesse `http://localhost:3000` (Interface web)

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:8080/api
```

### Médicos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/medicos` | Lista todos os médicos |
| GET | `/medicos/{id}` | Busca médico por ID |
| POST | `/medicos` | Cria novo médico |
| PUT | `/medicos/{id}` | Atualiza médico |
| DELETE | `/medicos/{id}` | Remove médico |

### Pacientes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/pacientes` | Lista todos os pacientes |
| GET | `/pacientes/{id}` | Busca paciente por ID |
| POST | `/pacientes` | Cria novo paciente |
| PUT | `/pacientes/{id}` | Atualiza paciente |
| DELETE | `/pacientes/{id}` | Remove paciente |

### Exames

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/exames` | Lista todos os exames |
| GET | `/exames/{id}` | Busca exame por ID |
| POST | `/exames` | Cria novo exame |
| PUT | `/exames/{id}` | Atualiza exame |
| DELETE | `/exames/{id}` | Remove exame |

### Agendamentos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/agendamentos` | Lista todos os agendamentos |
| GET | `/agendamentos/{id}` | Busca agendamento por ID |
| POST | `/agendamentos` | Cria novo agendamento |
| DELETE | `/agendamentos/{id}` | Remove agendamento |

### Agendáveis (Médicos e Exames)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/agendaveis` | Lista todos os agendáveis (médicos e exames) |
| GET | `/agendaveis/{id}/agenda` | Busca agenda de um agendável específico |

### Horários Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/agendaveis/{id}/horarios-disponiveis` | Lista horários disponíveis de um agendável |

### Exemplo de Requisição

**Criar Médico:**
```bash
POST http://localhost:8080/api/medicos
Content-Type: application/json

{
  "nome": "Dr. João Silva",
  "crm": "12345",
  "especialidade": "Cardiologia",
  "horarioInicio": "08:00",
  "horarioFim": "18:00",
  "fotoUrl": "data:image/jpeg;base64,..."
}
```

---

## 🗄️ Banco de Dados

### H2 Database

O projeto utiliza **H2 Database** em modo persistente (arquivo).

- **Localização**: `./data/clinicafacil.mv.db`
- **Tipo**: Banco em arquivo (dados persistem entre execuções)
- **Usuário**: `sa`
- **Senha**: (vazia)

### Acessar H2 Console

1. Inicie o backend
2. Acesse: `http://localhost:8080/h2-console`
3. Configure a conexão:
   - **JDBC URL**: `jdbc:h2:file:./data/clinicafacil`
   - **User Name**: `sa`
   - **Password**: (deixe vazio)
4. Clique em "Connect"

### Entidades do Banco

1. **Paciente**
   - id, nome, cpf, telefone, email, dataNascimento

2. **Medico**
   - id, nome, crm, especialidade, horarioInicio, horarioFim, fotoUrl

3. **ServicoExame**
   - id, nome, descricao, duracaoMinutos

4. **Agendavel** (abstrata)
   - Base para Médico e ServicoExame

5. **Agendamento**
   - id, paciente, agendavel, dataHora, observacoes

### Relacionamentos

- `Agendamento` → `Paciente` (Many-to-One)
- `Agendamento` → `Agendavel` (Many-to-One)
- `Medico` → `Agendavel` (herança)
- `ServicoExame` → `Agendavel` (herança)

---

## 🔐 Autenticação

### Credenciais de Teste

O sistema possui autenticação simulada no frontend:

**Administrador:**
- Email: `admin@clinica.com`
- Senha: `admin123`

**Usuário Comum:**
- Email: `usuario@clinica.com`
- Senha: `user123`

### Como Funciona

- A autenticação é gerenciada pelo `AuthContext` (React)
- Não há backend de autenticação (simulado)
- O estado de autenticação é mantido no contexto React
- Ao fazer logout, o estado é limpo

---

## 🎨 Design System

### Paleta de Cores

O projeto utiliza uma paleta profissional de azuis, inspirada em clínicas odontológicas:

**Cores Principais:**
- Primary: `#3d8eff` → `#1e6fd8` (Azul vibrante)
- Secondary: `#0ea5e9` → `#0284c7` (Azul claro)
- Accent: `#14b8a6` (Turquesa suave)

**Cores Neutras:**
- Gray Scale: `#f9fafb` → `#0f172a`

### Componentes Visuais

- **Glassmorphism**: Headers com efeito de vidro
- **Gradientes**: Transições suaves de cor
- **Animações**: Fade-in, slide-up, scale
- **Sombras**: Profundidade e elevação
- **Bordas arredondadas**: Design moderno

### Tipografia

- **Font Principal**: Inter
- **Font Display**: Poppins
- **Tamanhos**: Sistema de escala responsivo

---

## 📂 Estrutura de Pastas Detalhada

### Backend (`src/main/java/com/clinica/clinicafacil/`)

```
├── config/
│   ├── CorsConfig.java          # Configuração CORS
│   └── JacksonConfig.java       # Configuração JSON
│
├── controller/
│   ├── AgendamentoController.java
│   ├── AgendavelController.java
│   ├── MedicoController.java
│   ├── PacienteController.java
│   └── ServicoExameController.java
│
├── dto/
│   ├── AgendamentoRequestDTO.java
│   └── HorarioDisponivelDTO.java
│
├── exception/
│   ├── EntidadeNaoEncontradaException.java
│   └── HorarioIndisponivelException.java
│
├── model/
│   ├── Agendamento.java
│   ├── Agendavel.java
│   ├── Medico.java
│   ├── Paciente.java
│   └── ServicoExame.java
│
├── repository/
│   ├── AgendamentoRepository.java
│   ├── AgendavelRepository.java
│   ├── MedicoRepository.java
│   ├── PacienteRepository.java
│   └── ServicoExameRepository.java
│
└── service/
    ├── AgendamentoService.java
    ├── AgendavelService.java
    ├── MedicoService.java
    ├── PacienteService.java
    └── ServicoExameService.java
```

### Frontend (`frontend/src/`)

```
├── components/
│   ├── AdminHeader.js           # Header administrativo
│   ├── Dashboard.js              # Dashboard principal
│   ├── Home.js                   # Página inicial pública
│   ├── LoginModal.js             # Modal de login
│   ├── CadastroMedico.js         # Formulário médico
│   ├── CadastroPaciente.js       # Formulário paciente
│   ├── CadastroExame.js          # Formulário exame
│   ├── ListarMedicos.js          # Lista de médicos
│   ├── ListarPacientes.js        # Lista de pacientes
│   ├── MedicoCard.js             # Card de médico
│   └── ... (outros componentes)
│
├── contexts/
│   └── AuthContext.js            # Context de autenticação
│
├── layouts/
│   └── AdminLayout.js            # Layout administrativo
│
├── pages/
│   └── HomePage.js               # Página home completa
│
├── services/
│   └── api.js                    # Configuração Axios
│
└── styles/
    └── design-system.css         # Sistema de design
```

---

## 🛠️ Scripts Úteis

### Backend

```bash
# Executar aplicação
./mvnw spring-boot:run

# Compilar projeto
./mvnw clean compile

# Executar testes
./mvnw test

# Gerar JAR executável
./mvnw clean package
```

### Frontend

```bash
# Iniciar servidor de desenvolvimento
npm start

# Criar build de produção
npm run build

# Executar testes
npm test

# Verificar lint
npm run lint
```

---

## 🔧 Troubleshooting

### Porta 8080 já está em uso

**Solução 1**: Liberar a porta
```powershell
# Windows PowerShell (como Administrador)
.\liberar-porta-8080.ps1
```

**Solução 2**: Alterar porta no `application.properties`
```properties
server.port=8081
```

E atualizar a URL no `frontend/src/services/api.js`:
```javascript
baseURL: 'http://localhost:8081/api'
```

### Erro ao instalar dependências npm

```bash
# Limpar cache e reinstalar
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Erro de CORS

O CORS já está configurado no backend (`CorsConfig.java`). Se ainda houver problemas:

1. Verifique se o backend está rodando
2. Verifique a URL no `api.js`
3. Limpe o cache do navegador

### Banco de dados não persiste

Verifique se o arquivo `data/clinicafacil.mv.db` existe. Se não existir, o H2 criará automaticamente na primeira execução.

### Erro de encoding (caracteres especiais)

Certifique-se de que os arquivos estão salvos em **UTF-8 sem BOM**.

---

## 📝 Adicionar Banner na Home

1. Coloque sua imagem em: `frontend/public/images/banners/banner-home.jpg`
2. Tamanho recomendado: 1920x600px
3. Formato: JPG, PNG ou WebP
4. Peso máximo: 500KB

O banner aparecerá automaticamente na home.

Veja mais detalhes em: `frontend/COMO_ADICIONAR_BANNER.md`

---

## 🧪 Testando a API

### Usando Postman

O projeto inclui uma coleção Postman: `ClinicFacil.postman_collection.json`

1. Importe a coleção no Postman
2. Configure a variável `base_url` como `http://localhost:8080/api`
3. Execute as requisições

### Usando cURL

**Listar Médicos:**
```bash
curl http://localhost:8080/api/medicos
```

**Criar Médico:**
```bash
curl -X POST http://localhost:8080/api/medicos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Dr. Teste",
    "crm": "99999",
    "especialidade": "Clínica Geral",
    "horarioInicio": "08:00",
    "horarioFim": "18:00"
  }'
```

---

## 🚀 Deploy

### Backend

```bash
# Gerar JAR
./mvnw clean package

# Executar JAR
java -jar target/clinica-facil-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
cd frontend
npm run build

# A pasta build/ contém os arquivos estáticos
# Servir com nginx, Apache, ou qualquer servidor web
```

---

## 📚 Documentação Adicional

- `COMO_INICIAR_PROJETO.md` - Guia detalhado de inicialização
- `COMO_INICIAR_BACKEND.md` - Guia específico do backend
- `EXEMPLOS_H2_CONSOLE.md` - Exemplos de uso do H2 Console
- `RELATORIO_TECNOLOGIAS.md` - Relatório completo de tecnologias
- `frontend/COMO_ADICIONAR_BANNER.md` - Como adicionar banner

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais (Projeto POO 2025.2).

---

## 👥 Autores

Desenvolvido como projeto acadêmico.

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique a seção [Troubleshooting](#-troubleshooting)
2. Consulte a documentação adicional
3. Verifique os logs do backend e console do navegador

---

## 🎯 Próximas Melhorias

- [ ] Sistema de autenticação real (JWT)
- [ ] Upload de imagens para servidor
- [ ] Integração com Google Maps
- [ ] Notificações por email
- [ ] Relatórios e estatísticas
- [ ] Testes automatizados
- [ ] Docker Compose para facilitar deploy

---

**Desenvolvido com ❤️ para facilitar o gerenciamento de clínicas médicas**

