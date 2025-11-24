import React, { useState } from 'react';
import './MedicoCard.css';
import CalendarioModal from './CalendarioModal';

const MedicoCard = ({ medico }) => {
  const [activeTab, setActiveTab] = useState('experiencia');
  const [showDetails, setShowDetails] = useState(false);
  const [showCalendarioModal, setShowCalendarioModal] = useState(false);

  const formatarHorario = (horario) => {
    if (typeof horario === 'string') {
      if (horario.length >= 5) {
        return horario.substring(0, 5);
      }
      return horario;
    }
    if (horario && horario.horario) {
      return formatarHorario(horario.horario);
    }
    return String(horario);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'experiencia':
        return (
          <div className="tab-content">
            <h4>Experiência Profissional</h4>
            <p>Médico com ampla experiência em {medico.especialidade || 'medicina'}, formado em instituições renomadas e com anos de prática clínica.</p>
            <ul>
              <li>Formação em Medicina pela Universidade Federal</li>
              <li>Especialização em {medico.especialidade || 'Medicina'}</li>
              <li>Atuação há mais de 10 anos na área</li>
            </ul>
          </div>
        );
      case 'planos':
        return (
          <div className="tab-content">
            <h4>Planos de Saúde Aceitos</h4>
            <div className="planos-list">
              <span className="plano-badge">Unimed</span>
              <span className="plano-badge">SulAmérica</span>
              <span className="plano-badge">Bradesco Saúde</span>
              <span className="plano-badge">Particular</span>
            </div>
          </div>
        );
      case 'consultorios':
        return (
          <div className="tab-content">
            <h4>Consultórios</h4>
            <div className="consultorio-info">
              <p><strong>Endereço:</strong> Rua das Flores, 123 - Centro</p>
              <p><strong>Cidade:</strong> Caruaru - PE</p>
              <p><strong>CEP:</strong> 55000-000</p>
              <button className="btn-mapa">Ver no mapa</button>
            </div>
          </div>
        );
      case 'servicos':
        return (
          <div className="tab-content">
            <h4>Serviços Oferecidos</h4>
            <ul className="servicos-list">
              <li>Consulta médica</li>
              <li>Avaliação clínica</li>
              <li>Exames complementares</li>
              <li>Atendimento de emergência</li>
            </ul>
          </div>
        );
      case 'opinioes':
        return (
          <div className="tab-content">
            <h4>Opiniões dos Pacientes (2)</h4>
            <div className="opinioes-list">
              <div className="opiniao-item">
                <div className="opiniao-header">
                  <span className="opiniao-estrelas">★★★★★</span>
                  <span className="opiniao-data">Há 1 mês</span>
                </div>
                <p className="opiniao-texto">"Excelente profissional, muito atencioso e competente. Recomendo!"</p>
                <span className="opiniao-autor">- Maria Silva</span>
              </div>
              <div className="opiniao-item">
                <div className="opiniao-header">
                  <span className="opiniao-estrelas">★★★★★</span>
                  <span className="opiniao-data">Há 2 meses</span>
                </div>
                <p className="opiniao-texto">"Ótimo atendimento, ambiente acolhedor e profissionalismo exemplar."</p>
                <span className="opiniao-autor">- João Santos</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="medico-card-detailed medico-card-modern">
      {/* Header do Card */}
      <div className="medico-card-header">
        <div className="medico-foto-container">
          {medico.fotoUrl && medico.fotoUrl.trim() !== '' ? (
            <img 
              src={medico.fotoUrl} 
              alt={medico.nome || 'Médico'}
              className="medico-foto"
              onError={(e) => {
                e.target.style.display = 'none';
                const fallback = e.target.parentElement.querySelector('.medico-foto-fallback');
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className="medico-foto-fallback"
            style={{ display: (medico.fotoUrl && medico.fotoUrl.trim() !== '') ? 'none' : 'flex' }}
          >
            <span>{medico.nome?.charAt(0) || '👨‍⚕️'}</span>
          </div>
        </div>

        <div className="medico-info-header">
          <div className="medico-nome-header">
            <h3 className="medico-nome-completo">
              {medico.nome || 'Dr. Nome do Médico'}
            </h3>
            <button 
              className="btn-mais-info"
              onClick={() => setShowDetails(!showDetails)}
            >
              mais
            </button>
          </div>
          
          <p className="medico-profissao">
            {medico.especialidade || 'Especialidade não informada'}
          </p>
          
          <p className="medico-localizacao">
            📍 Caruaru | 1 endereço
          </p>
          
          <div className="medico-planos">
            <span className="plano-aceito">✓ Aceita Unimed</span>
          </div>
          
          <p className="medico-crm-detailed">
            CRM: {medico.crm || 'N/A'} {medico.especialidade ? `RQE DE ${medico.especialidade.toUpperCase()}` : ''}
          </p>
        </div>
      </div>

      {/* Avaliação */}
      <div className="medico-avaliacao-section">
        <div className="avaliacao-estrelas">★★★★★</div>
        <span className="avaliacao-opinioes">2 opiniões</span>
      </div>

      {/* Botões de Ação */}
      <div className="medico-botoes-acao">
        <button className="btn-contato">
          Informações de contato
        </button>
        <button 
          className="btn-calendario"
          onClick={() => setShowCalendarioModal(true)}
        >
          Pedir calendário de consultas
        </button>
      </div>

      {/* Horários Disponíveis */}
      {medico.horariosDisponiveis && medico.horariosDisponiveis.length > 0 && (
        <div className="medico-horarios-section">
          <p className="horarios-titulo">Horários disponíveis hoje:</p>
          <div className="horarios-grid">
            {medico.horariosDisponiveis.slice(0, 6).map((horario, idx) => (
              <span key={idx} className="horario-item">
                {formatarHorario(horario)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tabs de Navegação */}
      {showDetails && (
        <div className="medico-tabs-section">
          <div className="tabs-navigation">
            <button 
              className={`tab-btn ${activeTab === 'experiencia' ? 'active' : ''}`}
              onClick={() => setActiveTab('experiencia')}
            >
              Experiência
            </button>
            <button 
              className={`tab-btn ${activeTab === 'planos' ? 'active' : ''}`}
              onClick={() => setActiveTab('planos')}
            >
              Planos de saúde
            </button>
            <button 
              className={`tab-btn ${activeTab === 'consultorios' ? 'active' : ''}`}
              onClick={() => setActiveTab('consultorios')}
            >
              Consultórios
            </button>
            <button 
              className={`tab-btn ${activeTab === 'servicos' ? 'active' : ''}`}
              onClick={() => setActiveTab('servicos')}
            >
              Serviços
            </button>
            <button 
              className={`tab-btn ${activeTab === 'opinioes' ? 'active' : ''}`}
              onClick={() => setActiveTab('opinioes')}
            >
              Opiniões (2)
            </button>
          </div>
          
          <div className="tabs-content-wrapper">
            {renderTabContent()}
          </div>
        </div>
      )}

      {/* Modal de Solicitação de Calendário */}
      <CalendarioModal
        isOpen={showCalendarioModal}
        onClose={() => setShowCalendarioModal(false)}
        medicoNome={medico.nome}
      />
    </div>
  );
};

export default MedicoCard;

