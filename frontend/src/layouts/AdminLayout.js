import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';
import LoginModal from '../components/LoginModal';
import { useAuth } from '../contexts/AuthContext';
import './AdminLayout.css';

const AdminLayout = ({ children, activeView, setActiveView }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(!isAuthenticated || !isAdmin());

  // Atualizar estado do modal quando autenticação mudar
  useEffect(() => {
    if (isAuthenticated && isAdmin()) {
      setShowLoginModal(false);
    } else {
      setShowLoginModal(true);
    }
  }, [isAuthenticated, isAdmin]);

  // Redirecionar para dashboard após login bem-sucedido
  useEffect(() => {
    if (isAuthenticated && isAdmin() && !showLoginModal) {
      // Se está autenticado como admin e não está em uma rota específica, ir para dashboard
      const adminRoutes = ['dashboard', 'cadastro-paciente', 'cadastro-medico', 'cadastro-exame', 
                          'listar-agendaveis', 'consultar-horarios', 'criar-agendamento', 
                          'listar-agendamentos', 'listar-pacientes', 'listar-medicos'];
      if (!adminRoutes.includes(activeView)) {
        setActiveView('dashboard');
      }
    }
  }, [isAuthenticated, isAdmin, showLoginModal, activeView, setActiveView]);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    // Redirecionar para dashboard após login
    setTimeout(() => {
      setActiveView('dashboard');
    }, 100);
  };

  return (
    <div className="admin-layout">
      <AdminHeader activeView={activeView} setActiveView={setActiveView} />
      <main className="admin-layout-main">
        {children}
      </main>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          if (!isAuthenticated || !isAdmin()) {
            window.location.href = '/';
          } else {
            setShowLoginModal(false);
          }
        }}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default AdminLayout;

