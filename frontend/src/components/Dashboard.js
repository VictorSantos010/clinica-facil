import React from 'react';
import './Dashboard.css';

// Componentes de Ícones SVG
const IconPaciente = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const IconMedico = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
    <path d="M12 11v6M9 14h6"></path>
  </svg>
);

const IconExame = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="9" y1="15" x2="15" y2="15"></line>
    <line x1="12" y1="12" x2="12" y2="18"></line>
  </svg>
);

const IconAgendamento = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"></path>
  </svg>
);

const IconListaAgendamentos = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="9" y1="15" x2="15" y2="15"></line>
  </svg>
);

const IconHorarios = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const IconListaPacientes = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const IconListaMedicos = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    <line x1="9" y1="11" x2="9" y2="13"></line>
    <line x1="9" y1="15" x2="9" y2="17"></line>
  </svg>
);

const Dashboard = ({ setActiveView }) => {
  const cards = [
    {
      title: 'Cadastrar Paciente',
      description: 'Adicione novos pacientes ao sistema',
      icon: <IconPaciente />,
      action: () => setActiveView('cadastro-paciente'),
      color: '#3d8eff',
    },
    {
      title: 'Cadastrar Médico',
      description: 'Registre médicos e suas especialidades',
      icon: <IconMedico />,
      action: () => setActiveView('cadastro-medico'),
      color: '#1e6fd8',
    },
    {
      title: 'Cadastrar Exame',
      description: 'Adicione serviços de exames disponíveis',
      icon: <IconExame />,
      action: () => setActiveView('cadastro-exame'),
      color: '#7ab8ff',
    },
    {
      title: 'Criar Agendamento',
      description: 'Agende consultas e exames',
      icon: <IconAgendamento />,
      action: () => setActiveView('criar-agendamento'),
      color: '#4facfe',
    },
    {
      title: 'Ver Agendamentos',
      description: 'Visualize todos os agendamentos',
      icon: <IconListaAgendamentos />,
      action: () => setActiveView('listar-agendamentos'),
      color: '#43e97b',
    },
    {
      title: 'Consultar Horários',
      description: 'Veja horários disponíveis',
      icon: <IconHorarios />,
      action: () => setActiveView('consultar-horarios'),
      color: '#fa709a',
    },
    {
      title: 'Ver Pacientes',
      description: 'Visualize todos os pacientes cadastrados',
      icon: <IconListaPacientes />,
      action: () => setActiveView('listar-pacientes'),
      color: '#3d8eff',
    },
    {
      title: 'Ver Médicos',
      description: 'Visualize todos os médicos cadastrados',
      icon: <IconListaMedicos />,
      action: () => setActiveView('listar-medicos'),
      color: '#1e6fd8',
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Dashboard Administrativo</h2>
          <p className="dashboard-subtitle">Gerencie agendamentos, pacientes, médicos e exames</p>
        </div>
      </div>
      
      <div className="cards-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className="dashboard-card"
            onClick={card.action}
            style={{ '--card-color': card.color }}
          >
            <div className="card-icon" style={{ color: card.color }}>
              {card.icon}
            </div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
