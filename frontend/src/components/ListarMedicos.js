import React, { useState, useEffect } from 'react';
import { medicosAPI } from '../services/api';
import BackButton from './BackButton';
import EditarMedicoModal from './EditarMedicoModal';
import './ListarMedicos.css';
import './ListarMedicos.css';

const ListarMedicos = ({ setActiveView }) => {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [medicoEditando, setMedicoEditando] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [medicoParaDeletar, setMedicoParaDeletar] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    loadMedicos();
  }, []);

  const loadMedicos = async () => {
    try {
      setLoading(true);
      const response = await medicosAPI.listar();
      setMedicos(response.data || []);
      setMessage({ type: '', text: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao carregar médicos. Verifique se o backend está rodando.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (medico) => {
    setMedicoEditando(medico);
    setShowEditModal(true);
  };

  const handleSalvarEdicao = async (medicoAtualizado) => {
    try {
      await medicosAPI.atualizar(medicoEditando.id, medicoAtualizado);
      setMessage({ type: 'success', text: 'Médico atualizado com sucesso!' });
      setShowEditModal(false);
      setMedicoEditando(null);
      loadMedicos();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Erro ao atualizar médico. Verifique os dados.' 
      });
    }
  };

  const handleDeletar = (medico) => {
    setMedicoParaDeletar(medico);
    setShowDeleteConfirm(true);
  };

  const confirmarDeletar = async () => {
    try {
      await medicosAPI.deletar(medicoParaDeletar.id);
      setMessage({ type: 'success', text: `Médico ${medicoParaDeletar.nome} deletado com sucesso!` });
      setShowDeleteConfirm(false);
      setMedicoParaDeletar(null);
      loadMedicos();
    } catch (error) {
      console.error('Erro ao deletar médico:', error);
      let errorMessage = 'Erro ao deletar médico.';
      
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'Médico não encontrado.';
        } else if (error.response.status === 409) {
          errorMessage = 'Não é possível deletar o médico pois existem agendamentos associados.';
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data) {
          errorMessage = typeof error.response.data === 'string' 
            ? error.response.data 
            : 'Erro ao deletar médico. Verifique se não há agendamentos associados.';
        }
      } else if (error.request) {
        errorMessage = 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.';
      }
      
      setMessage({ 
        type: 'error', 
        text: errorMessage
      });
      setShowDeleteConfirm(false);
      setMedicoParaDeletar(null);
    }
  };

  const formatarHorario = (horario) => {
    if (!horario) return 'N/A';
    if (typeof horario === 'string') {
      return horario.length >= 5 ? horario.substring(0, 5) : horario;
    }
    return String(horario);
  };

  if (loading) {
    return (
      <div className="listar-medicos-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando médicos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="listar-medicos-container">
      <div className="listar-medicos-header">
        <BackButton onClick={() => setActiveView('dashboard')} label="Voltar ao Dashboard" />
        <div className="header-actions">
          <h2 className="listar-medicos-title">Médicos Cadastrados</h2>
          <button 
            className="btn-refresh"
            onClick={loadMedicos}
            title="Atualizar lista"
          >
            🔄 Atualizar
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {medicos.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum médico cadastrado ainda.</p>
          <button 
            className="btn-cadastrar"
            onClick={() => setActiveView('cadastro-medico')}
          >
            Cadastrar Primeiro Médico
          </button>
        </div>
      ) : (
        <div className="medicos-grid-admin">
          {medicos.map((medico) => (
            <div key={medico.id} className="medico-card-admin">
              <div className="medico-card-admin-header">
                <div className="medico-foto-admin">
                  {medico.fotoUrl && medico.fotoUrl.trim() !== '' ? (
                    <img 
                      src={medico.fotoUrl} 
                      alt={medico.nome || 'Médico'}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.parentElement.querySelector('.medico-foto-fallback-admin');
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="medico-foto-fallback-admin"
                    style={{ display: (medico.fotoUrl && medico.fotoUrl.trim() !== '') ? 'none' : 'flex' }}
                  >
                    <span>{medico.nome?.charAt(0) || '👨‍⚕️'}</span>
                  </div>
                </div>
                <div className="medico-info-admin">
                  <h3 className="medico-nome-admin">{medico.nome || 'Nome não informado'}</h3>
                  <p className="medico-especialidade-admin">{medico.especialidade || 'Especialidade não informada'}</p>
                  <p className="medico-crm-admin">CRM: {medico.crm || 'N/A'}</p>
                </div>
              </div>

              <div className="medico-detalhes-admin">
                <div className="detalhe-item">
                  <span className="detalhe-label">Horário:</span>
                  <span className="detalhe-value">
                    {formatarHorario(medico.horarioInicio)} - {formatarHorario(medico.horarioFim)}
                  </span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">ID:</span>
                  <span className="detalhe-value">#{medico.id}</span>
                </div>
              </div>

              <div className="medico-acoes-admin">
                <button 
                  className="btn-editar"
                  onClick={() => handleEditar(medico)}
                  title="Editar médico"
                >
                  ✏️ Editar
                </button>
                <button 
                  className="btn-deletar"
                  onClick={() => handleDeletar(medico)}
                  title="Deletar médico"
                >
                  🗑️ Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Edição */}
      {showEditModal && medicoEditando && (
        <EditarMedicoModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setMedicoEditando(null);
          }}
          medico={medicoEditando}
          onSave={handleSalvarEdicao}
        />
      )}

      {/* Modal de Confirmação de Deleção */}
      {showDeleteConfirm && medicoParaDeletar && (
        <div className="delete-confirm-backdrop" onClick={() => setShowDeleteConfirm(false)}>
          <div className="delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmar Exclusão</h3>
            <p>Tem certeza que deseja deletar o médico <strong>{medicoParaDeletar.nome}</strong>?</p>
            <p className="warning-text">Esta ação não pode ser desfeita.</p>
            <div className="delete-confirm-buttons">
              <button className="btn-cancelar" onClick={() => setShowDeleteConfirm(false)}>
                Cancelar
              </button>
              <button className="btn-confirmar-deletar" onClick={confirmarDeletar}>
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarMedicos;
