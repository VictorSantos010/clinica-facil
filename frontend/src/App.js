import React, { useState, useEffect } from 'react';
import './App.css';
import { useAuth } from './contexts/AuthContext';

// Componentes públicos
import HomePage from './pages/HomePage';

// Componentes administrativos
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './components/Dashboard';
import CadastroPaciente from './components/CadastroPaciente';
import CadastroMedico from './components/CadastroMedico';
import CadastroExame from './components/CadastroExame';
import ListarAgendaveis from './components/ListarAgendaveis';
import ConsultarHorarios from './components/ConsultarHorarios';
import CriarAgendamento from './components/CriarAgendamento';
import ListarAgendamentos from './components/ListarAgendamentos';
import ListarPacientes from './components/ListarPacientes';
import ListarMedicos from './components/ListarMedicos';

function App() {
  // Inicializar activeView baseado na URL
  const getInitialView = () => {
    if (window.location.pathname === '/admin') {
      return 'dashboard';
    }
    return 'home';
  };

  const [activeView, setActiveView] = useState(getInitialView());
  const { isAuthenticated, isAdmin } = useAuth();

  // Rotas que requerem autenticação
  const adminRoutes = [
    'dashboard',
    'cadastro-paciente',
    'cadastro-medico',
    'cadastro-exame',
    'listar-agendaveis',
    'consultar-horarios',
    'criar-agendamento',
    'listar-agendamentos',
    'listar-pacientes',
    'listar-medicos',
  ];


  // Verificar se a rota atual requer autenticação
  const requiresAuth = adminRoutes.includes(activeView);

  // Se tentar acessar rota admin sem ser admin, redirecionar para home
  useEffect(() => {
    if (requiresAuth && isAuthenticated && !isAdmin()) {
      setActiveView('home');
    }
  }, [requiresAuth, isAuthenticated, isAdmin]);

  // Quando admin faz login, redirecionar para dashboard
  useEffect(() => {
    if (isAuthenticated && isAdmin()) {
      // Se não estiver em uma rota admin válida E não estiver na home, ir para dashboard
      if (!adminRoutes.includes(activeView) && activeView !== 'home') {
        setActiveView('dashboard');
      }
    }
  }, [isAuthenticated, isAdmin, activeView]);

  // Detectar se está tentando acessar área admin
  // Se activeView for 'home', sempre mostrar HomePage
  // Caso contrário, se a URL for /admin OU se activeView for uma rota admin, mostrar área admin
  const isAdminRoute = activeView !== 'home' && (window.location.pathname === '/admin' || requiresAuth);

  // Renderizar área pública (Home)
  if (!isAdminRoute) {
    return (
      <div className="App">
        <HomePage />
      </div>
    );
  }

  // Se não estiver autenticado e tentar acessar admin, mostrar apenas o modal
  if (!isAuthenticated || !isAdmin()) {
    return (
      <div className="App">
        <AdminLayout activeView={activeView} setActiveView={setActiveView}>
          <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'white', fontSize: '1.2rem' }}>Faça login para acessar o painel administrativo</p>
          </div>
        </AdminLayout>
      </div>
    );
  }

  // Renderizar área administrativa com layout protegido
  return (
    <div className="App">
      <AdminLayout activeView={activeView} setActiveView={setActiveView}>
        {activeView === 'dashboard' && <Dashboard setActiveView={setActiveView} />}
        {activeView === 'cadastro-paciente' && <CadastroPaciente setActiveView={setActiveView} />}
        {activeView === 'cadastro-medico' && <CadastroMedico setActiveView={setActiveView} />}
        {activeView === 'cadastro-exame' && <CadastroExame setActiveView={setActiveView} />}
        {activeView === 'listar-agendaveis' && <ListarAgendaveis setActiveView={setActiveView} />}
        {activeView === 'consultar-horarios' && <ConsultarHorarios setActiveView={setActiveView} />}
        {activeView === 'criar-agendamento' && <CriarAgendamento setActiveView={setActiveView} />}
        {activeView === 'listar-agendamentos' && <ListarAgendamentos setActiveView={setActiveView} />}
        {activeView === 'listar-pacientes' && <ListarPacientes setActiveView={setActiveView} />}
        {activeView === 'listar-medicos' && <ListarMedicos setActiveView={setActiveView} />}
      </AdminLayout>
    </div>
  );
}

export default App;


