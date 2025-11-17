import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
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
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} />;
      case 'cadastro-paciente':
        return <CadastroPaciente setActiveView={setActiveView} />;
      case 'cadastro-medico':
        return <CadastroMedico setActiveView={setActiveView} />;
      case 'cadastro-exame':
        return <CadastroExame setActiveView={setActiveView} />;
      case 'listar-agendaveis':
        return <ListarAgendaveis setActiveView={setActiveView} />;
      case 'consultar-horarios':
        return <ConsultarHorarios setActiveView={setActiveView} />;
      case 'criar-agendamento':
        return <CriarAgendamento setActiveView={setActiveView} />;
      case 'listar-agendamentos':
        return <ListarAgendamentos setActiveView={setActiveView} />;
      case 'listar-pacientes':
        return <ListarPacientes setActiveView={setActiveView} />;
      case 'listar-medicos':
        return <ListarMedicos setActiveView={setActiveView} />;
      default:
        return <Dashboard setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="App">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;


