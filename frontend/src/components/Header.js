import React from 'react';
import './Header.css';

const Header = ({ activeView, setActiveView }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo" onClick={() => setActiveView('dashboard')}>
          🏥 ClínicaFácil
        </h1>
        <nav className="nav">
          <button
            className={activeView === 'dashboard' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveView('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={activeView === 'cadastro-paciente' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveView('cadastro-paciente')}
          >
            Paciente
          </button>
          <button
            className={activeView === 'cadastro-medico' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveView('cadastro-medico')}
          >
            Médico
          </button>
          <button
            className={activeView === 'cadastro-exame' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveView('cadastro-exame')}
          >
            Exame
          </button>
          <button
            className={activeView === 'criar-agendamento' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveView('criar-agendamento')}
          >
            Agendar
          </button>
          <button
            className={activeView === 'listar-agendamentos' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveView('listar-agendamentos')}
          >
            Agendamentos
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;


