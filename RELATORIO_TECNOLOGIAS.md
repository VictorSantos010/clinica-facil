# 📊 Relatório de Tecnologias - Clínica Fácil

## 📅 Data: 2025
## 🎯 Projeto: Sistema de Agendamento de Clínica

---

## 🏗️ ARQUITETURA DO PROJETO

O projeto utiliza uma arquitetura **Full Stack** com separação entre:
- **Backend**: API REST em Java/Spring Boot
- **Frontend**: Interface web em React
- **Banco de Dados**: H2 Database (em arquivo)

---

## 🔷 BACKEND (Java/Spring Boot)

### **Linguagem de Programação**
- **Java 17** (JDK 17)
  - Versão LTS (Long Term Support)
  - Suporte a records, pattern matching, text blocks

### **Framework Principal**
- **Spring Boot 3.5.7**
  - Framework para desenvolvimento de aplicações Java
  - Autoconfiguração e convenção sobre configuração
  - Embedded server (Tomcat)

### **Dependências Spring Boot**

#### **Spring Boot Starter Web**
- `spring-boot-starter-web` (v3.5.7)
  - Spring MVC para criação de APIs REST
  - Tomcat Embedded (servidor web)
  - Jackson para serialização JSON
  - Suporte a HTTP/HTTPS

#### **Spring Boot Starter Data JPA**
- `spring-boot-starter-data-jpa` (v3.5.7)
  - Spring Data JPA para acesso a dados
  - Hibernate como implementação JPA
  - Gerenciamento de transações
  - Repositórios automáticos

#### **Spring Boot Starter Validation**
- `spring-boot-starter-validation` (v3.5.7)
  - Bean Validation (JSR-303)
  - Validação de dados de entrada
  - Anotações: @NotNull, @NotBlank, @Valid, etc.

#### **Spring Boot Starter Test**
- `spring-boot-starter-test` (v3.5.7)
  - JUnit 5
  - Mockito
  - AssertJ
  - Spring Test

### **ORM e Persistência**
- **Hibernate** (via Spring Data JPA)
  - Versão: Incluída no Spring Boot 3.5.7
  - Dialeto: `org.hibernate.dialect.H2Dialect`
  - Configuração: `ddl-auto=update` (atualização automática do schema)
  - SQL formatado: Habilitado para debug

### **Bibliotecas Auxiliares**

#### **Lombok**
- `org.projectlombok:lombok` (versão herdada do Spring Boot)
  - Redução de boilerplate
  - Anotações: @Data, @Builder, @Getter, @Setter, @NoArgsConstructor, @AllArgsConstructor
  - Processamento em tempo de compilação

### **Padrões de Arquitetura Utilizados**
- **MVC (Model-View-Controller)**
  - Controllers: `@RestController`
  - Services: `@Service`
  - Repositories: `@Repository`
  - Models: `@Entity`

- **DTO (Data Transfer Object)**
  - Classes para transferência de dados entre camadas
  - Exemplos: `AgendamentoRequestDTO`, `HorarioDisponivelDTO`

- **Exception Handling**
  - Exceções customizadas: `EntidadeNaoEncontradaException`, `HorarioIndisponivelException`

---

## 🎨 FRONTEND (React)

### **Linguagem de Programação**
- **JavaScript (ES6+)**
  - Arrow functions
  - Destructuring
  - Template literals
  - Async/await

### **Framework/Biblioteca Principal**
- **React 18.2.0**
  - Biblioteca para construção de interfaces de usuário
  - Componentes funcionais com Hooks
  - Virtual DOM
  - React StrictMode habilitado

### **Dependências Frontend**

#### **React DOM**
- `react-dom` ^18.2.0
  - Renderização de componentes React no DOM
  - ReactDOM.createRoot (API moderna)

#### **React Scripts**
- `react-scripts` 5.0.1
  - Create React App (CRA)
  - Webpack configurado
  - Babel transpilador
  - Hot Module Replacement (HMR)
  - Servidor de desenvolvimento

#### **Axios**
- `axios` ^1.6.0
  - Cliente HTTP para requisições à API
  - Promises
  - Interceptors
  - Suporte a async/await

### **Ferramentas de Build Frontend**
- **Webpack** (via react-scripts)
  - Bundling de módulos
  - Code splitting
  - Minificação
  - Otimização de assets

- **Babel** (via react-scripts)
  - Transpilação ES6+ para ES5
  - JSX para JavaScript
  - Polyfills

### **ESLint**
- Configuração: `react-app`
  - Linting de código JavaScript/React
  - Regras de estilo e boas práticas

### **Estrutura de Componentes**
- Componentes funcionais com Hooks
- `useState` para gerenciamento de estado
- Componentes organizados em:
  - Dashboard
  - Formulários (Cadastro)
  - Listagens
  - Consultas

---

## 🗄️ BANCO DE DADOS

### **SGBD**
- **H2 Database**
  - Versão: Incluída no Spring Boot 3.5.7
  - Driver: `org.h2.Driver`
  - Tipo: Banco em arquivo (persistente)
  - URL: `jdbc:h2:file:./data/clinicafacil`

### **Características**
- **Modo**: File-based (dados persistidos em disco)
- **Localização**: `./data/clinicafacil.mv.db`
- **Usuário**: `sa` (System Administrator)
- **Senha**: (vazia)
- **Console H2**: Habilitado em `/h2-console`

### **ORM e Mapeamento**
- **JPA (Java Persistence API)**
  - Anotações: `@Entity`, `@Id`, `@GeneratedValue`, `@Column`, `@ManyToOne`, `@OneToMany`
- **Hibernate** como implementação JPA
  - DDL Auto: `update` (atualiza schema automaticamente)
  - Show SQL: Habilitado para debug

### **Entidades do Sistema**
1. `Paciente` - Dados dos pacientes
2. `Medico` - Dados dos médicos
3. `ServicoExame` - Serviços de exames
4. `Agendavel` - Entidade abstrata para médicos e exames
5. `Agendamento` - Agendamentos realizados

---

## 🛠️ FERRAMENTAS DE BUILD E GERENCIAMENTO

### **Backend**
- **Apache Maven**
  - Gerenciamento de dependências
  - Build automation
  - Maven Wrapper incluído (`mvnw`, `mvnw.cmd`)

#### **Plugins Maven**
- **maven-compiler-plugin**
  - Compilação Java
  - Configuração para Lombok (annotation processor)

- **spring-boot-maven-plugin**
  - Empacotamento como JAR executável
  - Execução: `mvn spring-boot:run`

### **Frontend**
- **npm (Node Package Manager)**
  - Gerenciamento de pacotes Node.js
  - Instalação de dependências
  - Execução de scripts

- **Node.js**
  - Runtime JavaScript
  - Versão: Compatível com React 18 e react-scripts 5.0.1

---

## 🔧 FERRAMENTAS DE DESENVOLVIMENTO

### **Scripts de Automação**

#### **PowerShell Scripts**
- `iniciar-backend.ps1`
  - Verificação de porta 8080
  - Liberação automática de porta
  - Verificação de Maven
  - Inicialização do Spring Boot

- `iniciar-frontend.ps1`
  - Verificação de porta 3000
  - Liberação automática de porta
  - Verificação de Node.js/npm
  - Instalação de dependências
  - Inicialização do React

- `liberar-porta-8080.ps1`
  - Encerramento de processos na porta 8080

#### **Batch Scripts (Windows)**
- `iniciar-backend.bat`
- `iniciar-frontend.bat`
- `liberar-powershell.bat`

### **Ferramentas de Teste e Documentação**
- **Postman Collection**
  - Arquivo: `ClinicFacil.postman_collection.json`
  - Testes de API
  - Documentação de endpoints

### **Controle de Versão**
- **Git**
  - `.gitignore` configurado
  - Ignora: `target/`, `node_modules/`, `data/`, `*.mv.db`

---

## 🌐 PROTOCOLOS E PADRÕES

### **HTTP/REST**
- **REST API**
  - Métodos: GET, POST, PUT, DELETE
  - JSON como formato de dados
  - Status codes HTTP padrão

### **CORS (Cross-Origin Resource Sharing)**
- Configuração customizada em `CorsConfig.java`
- Origens permitidas:
  - `http://localhost:3000` (React dev server)
  - `http://localhost:3001` (alternativa)
- Métodos: Todos (`*`)
- Headers: Todos (`*`)
- Credenciais: Permitidas

---

## 📦 DEPENDÊNCIAS TRANSITIVAS (Incluídas automaticamente)

### **Spring Framework Core**
- Spring Core
- Spring Context
- Spring Beans
- Spring AOP

### **Spring Web**
- Spring MVC
- Spring Web
- Jackson (JSON)

### **Hibernate Core**
- Hibernate ORM
- Hibernate Validator

### **Tomcat**
- Tomcat Embedded (via Spring Boot)
- Servlet API

### **Outras**
- SLF4J (Logging)
- Logback (Implementação de logging)
- Apache Commons

---

## 🚀 AMBIENTE DE EXECUÇÃO

### **Portas Utilizadas**
- **8080**: Backend Spring Boot
- **3000**: Frontend React (desenvolvimento)

### **URLs do Sistema**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080`
- H2 Console: `http://localhost:8080/h2-console`

---

## 📋 RESUMO DAS TECNOLOGIAS PRINCIPAIS

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| **Linguagem Backend** | Java | 17 |
| **Framework Backend** | Spring Boot | 3.5.7 |
| **ORM** | Hibernate/JPA | (via Spring Boot) |
| **Banco de Dados** | H2 Database | (via Spring Boot) |
| **Build Tool Backend** | Apache Maven | (via wrapper) |
| **Linguagem Frontend** | JavaScript (ES6+) | - |
| **Framework Frontend** | React | 18.2.0 |
| **Build Tool Frontend** | Webpack/Babel | (via react-scripts 5.0.1) |
| **HTTP Client** | Axios | ^1.6.0 |
| **Runtime Frontend** | Node.js | (compatível) |
| **Package Manager** | npm | (via Node.js) |

---

## 📝 OBSERVAÇÕES IMPORTANTES

### **Desenvolvimento**
- Banco de dados H2 em modo arquivo (dados persistidos)
- Hot reload habilitado no frontend (React)
- SQL logging habilitado no backend (Hibernate)
- CORS configurado para desenvolvimento local

### **Produção**
- ⚠️ H2 Database não é recomendado para produção
- Recomenda-se migração para PostgreSQL ou MySQL
- Build de produção: `npm run build` (frontend)
- JAR executável: `mvn package` (backend)

---

## 📚 DOCUMENTAÇÃO ADICIONAL

- `COMO_INICIAR_PROJETO.md` - Guia de inicialização
- `COMO_INICIAR_BACKEND.md` - Guia específico do backend
- `EXEMPLOS_H2_CONSOLE.md` - Exemplos de consultas SQL
- `SOLUCAO_ERRO_NPM_START.md` - Solução de problemas comuns

---

**Relatório gerado em:** 2025  
**Projeto:** Clínica Fácil - Sistema de Agendamento  
**Versão:** 0.0.1-SNAPSHOT

