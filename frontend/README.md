# 🎨 Frontend ClínicaFácil

Interface web moderna e responsiva para o sistema de agendamento ClínicaFácil.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **Axios** - Cliente HTTP para comunicação com a API
- **CSS3** - Estilização moderna com gradientes e animações

## 📋 Pré-requisitos

- **Node.js** 16+ instalado
- **npm** ou **yarn**
- Backend rodando em `http://localhost:8080`

## 🔧 Instalação

1. **Navegue até a pasta do frontend:**
   ```bash
   cd frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

## ▶️ Executar

```bash
npm start
```

A aplicação será aberta automaticamente em `http://localhost:3000`

## 📱 Funcionalidades

### ✅ Cadastro
- **Pacientes**: Cadastro completo com validação de CPF
- **Médicos**: Cadastro com CRM, especialidade e horários de trabalho
- **Exames**: Cadastro de serviços de exame com sala e equipamento

### 📅 Agendamento
- **Criar Agendamento**: Interface intuitiva para agendar consultas/exames
- **Consultar Horários**: Visualize horários disponíveis por item e data
- **Listar Agendamentos**: Veja todos os agendamentos cadastrados

### 📊 Visualização
- **Dashboard**: Visão geral com acesso rápido a todas as funcionalidades
- **Listagem de Agendáveis**: Veja médicos e exames disponíveis

## 🎨 Interface

- **Design Moderno**: Interface limpa e profissional
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Animações Suaves**: Transições e efeitos visuais agradáveis
- **Feedback Visual**: Mensagens de sucesso e erro claras

## 🔌 Configuração da API

A URL da API está configurada em `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

Se sua API estiver em outro endereço, altere essa constante.

## 📦 Build para Produção

Para gerar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `build/` e podem ser servidos por qualquer servidor web estático.

## 🐛 Solução de Problemas

### Erro: "Cannot GET /"
- Certifique-se de que o backend está rodando em `http://localhost:8080`

### Erro: "Network Error"
- Verifique se a URL da API está correta
- Verifique se o backend está acessível
- Verifique o CORS no backend (se necessário)

### Erro: "Module not found"
- Execute `npm install` novamente
- Delete a pasta `node_modules` e reinstale

## 📁 Estrutura do Projeto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Dashboard.js
│   │   ├── CadastroPaciente.js
│   │   ├── CadastroMedico.js
│   │   ├── CadastroExame.js
│   │   ├── CriarAgendamento.js
│   │   ├── ListarAgendaveis.js
│   │   ├── ConsultarHorarios.js
│   │   └── ListarAgendamentos.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎯 Próximos Passos (Melhorias Futuras)

- [ ] Autenticação de usuários
- [ ] Filtros e busca avançada
- [ ] Gráficos e relatórios
- [ ] Notificações em tempo real
- [ ] Exportação de dados
- [ ] Tema escuro/claro

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---

**Desenvolvido com ❤️ para o projeto ClínicaFácil**


