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

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} />;
      case 'cadastro-paciente':
        return <CadastroPaciente />;
      case 'cadastro-medico':
        return <CadastroMedico />;
      case 'cadastro-exame':
        return <CadastroExame />;
      case 'listar-agendaveis':
        return <ListarAgendaveis />;
      case 'consultar-horarios':
        return <ConsultarHorarios />;
      case 'criar-agendamento':
        return <CriarAgendamento />;
      case 'listar-agendamentos':
        return <ListarAgendamentos />;
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


