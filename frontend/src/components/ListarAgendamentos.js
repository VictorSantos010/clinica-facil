import React, { useState, useEffect } from 'react';
import { agendamentosAPI } from '../services/api';
import './List.css';

const ListarAgendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadAgendamentos();
  }, []);

  const loadAgendamentos = async () => {
    try {
      setLoading(true);
      const response = await agendamentosAPI.listar();
      setAgendamentos(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao carregar agendamentos' });
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="list-container">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="list-container">
      <h2 className="list-title">Agendamentos</h2>
      <button onClick={loadAgendamentos} className="refresh-btn">
        🔄 Atualizar
      </button>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {agendamentos.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum agendamento cadastrado ainda.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {agendamentos.map((agendamento) => (
            <div key={agendamento.id} className="card">
              <div className="card-header">
                <h3>Agendamento #{agendamento.id}</h3>
              </div>
              <div className="card-body">
                <p><strong>Paciente:</strong> {agendamento.paciente?.nome || 'N/A'}</p>
                <p><strong>CPF:</strong> {agendamento.paciente?.cpf || 'N/A'}</p>
                <p><strong>Item:</strong> {agendamento.itemAgendado?.nome || 'N/A'}</p>
                <p><strong>Data/Hora:</strong> {formatDateTime(agendamento.dataHora)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListarAgendamentos;


