import React from 'react';
import './Dashboard.css';

const Dashboard = ({ setActiveView }) => {
  const cards = [
    {
      title: 'Cadastrar Paciente',
      description: 'Adicione novos pacientes ao sistema',
      icon: '👤',
      action: () => setActiveView('cadastro-paciente'),
      color: '#667eea',
    },
    {
      title: 'Cadastrar Médico',
      description: 'Registre médicos e suas especialidades',
      icon: '👨‍⚕️',
      action: () => setActiveView('cadastro-medico'),
      color: '#764ba2',
    },
    {
      title: 'Cadastrar Exame',
      description: 'Adicione serviços de exames disponíveis',
      icon: '🔬',
      action: () => setActiveView('cadastro-exame'),
      color: '#f093fb',
    },
    {
      title: 'Criar Agendamento',
      description: 'Agende consultas e exames',
      icon: '📅',
      action: () => setActiveView('criar-agendamento'),
      color: '#4facfe',
    },
    {
      title: 'Ver Agendamentos',
      description: 'Visualize todos os agendamentos',
      icon: '📋',
      action: () => setActiveView('listar-agendamentos'),
      color: '#43e97b',
    },
    {
      title: 'Consultar Horários',
      description: 'Veja horários disponíveis',
      icon: '🕐',
      action: () => setActiveView('consultar-horarios'),
      color: '#fa709a',
    },
  ];

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard - ClínicaFácil</h2>
      <p className="dashboard-subtitle">Gerencie agendamentos de forma fácil e rápida</p>
      
      <div className="cards-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className="dashboard-card"
            onClick={card.action}
            style={{ '--card-color': card.color }}
          >
            <div className="card-icon">{card.icon}</div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;


