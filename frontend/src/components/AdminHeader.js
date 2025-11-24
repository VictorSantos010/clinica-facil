import React from 'react';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';
import './AdminHeader.css';

const AdminHeader = ({ activeView, setActiveView }) => {
  const { user, logout, isAdmin } = useAuth();

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'cadastro-paciente', label: 'Paciente', icon: '👤' },
    { id: 'cadastro-medico', label: 'Médico', icon: '👨‍⚕️' },
    { id: 'cadastro-exame', label: 'Exame', icon: '🔬' },
    { id: 'criar-agendamento', label: 'Agendar', icon: '📅' },
    { id: 'listar-agendamentos', label: 'Agendamentos', icon: '📋' },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header className="admin-header">
      <div className="admin-header-content">
        <div className="admin-header-left">
          <Logo size="medium" onClick={() => setActiveView('dashboard')} />
          <nav className="admin-header-nav">
            {adminMenuItems.map((item) => (
              <button
                key={item.id}
                className={`admin-header-nav-btn ${activeView === item.id ? 'active' : ''}`}
                onClick={() => setActiveView(item.id)}
              >
                <span className="admin-header-nav-icon">{item.icon}</span>
                <span className="admin-header-nav-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="admin-header-right">
          <button
            className="admin-header-home-btn"
            onClick={() => setActiveView('home')}
            title="Voltar para Home"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </button>
          <div className="admin-header-user">
            <span className="admin-header-user-name">👤 {user?.name}</span>
            <button className="admin-header-logout" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

