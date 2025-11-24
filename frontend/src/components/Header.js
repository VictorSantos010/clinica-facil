import React from 'react';
import './Header.css';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ activeView, setActiveView }) => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const isPublicArea = activeView === 'home' || activeView === 'login';

  const handleLogout = () => {
    logout();
    setActiveView('home');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container" onClick={() => setActiveView('home')}>
          <div className="logo-icon">🏥</div>
          <div className="logo-text">
            <span className="logo-main">Clínica</span>
            <span className="logo-sub">Fácil</span>
          </div>
        </div>
        <nav className="nav">
          {isPublicArea ? (
            // MENU PÚBLICO - Home e Login
            <>
              <button
                className={activeView === 'home' ? 'nav-btn active' : 'nav-btn'}
                onClick={() => setActiveView('home')}
              >
                Home
              </button>
              {!isAuthenticated ? (
                <button
                  className="nav-btn login-btn-header"
                  onClick={() => setActiveView('login')}
                >
                  🔐 Entrar
                </button>
              ) : (
                <>
                  {isAdmin() && (
                    <button
                      className="nav-btn admin-access-btn"
                      onClick={() => setActiveView('dashboard')}
                    >
                      Dashboard
                    </button>
                  )}
                  <div className="user-info">
                    <span className="user-name">👤 {user?.name}</span>
                    <button
                      className="nav-btn logout-btn"
                      onClick={handleLogout}
                    >
                      Sair
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            // MENU ADMINISTRATIVO - Apenas para área administrativa
            <>
              <button
                className="nav-btn back-home-btn"
                onClick={() => setActiveView('home')}
                title="Voltar para Home"
              >
                ← Home
              </button>
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
              <div className="user-info">
                <span className="user-name">👤 {user?.name}</span>
                <button
                  className="nav-btn logout-btn"
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;


