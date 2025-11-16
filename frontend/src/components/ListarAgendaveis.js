import React, { useState, useEffect } from 'react';
import { agendaveisAPI } from '../services/api';
import './List.css';

const ListarAgendaveis = () => {
  const [agendaveis, setAgendaveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadAgendaveis();
  }, []);

  const loadAgendaveis = async () => {
    try {
      setLoading(true);
      const response = await agendaveisAPI.listar();
      setAgendaveis(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao carregar itens agendáveis' });
    } finally {
      setLoading(false);
    }
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
      <h2 className="list-title">Itens Agendáveis</h2>
      <p className="list-subtitle">Médicos e Exames disponíveis para agendamento</p>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {agendaveis.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum item agendável cadastrado ainda.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {agendaveis.map((item) => (
            <div key={item.id} className="card">
              <div className="card-header">
                <h3>{item.nome}</h3>
                <span className="card-id">ID: {item.id}</span>
              </div>
              <div className="card-body">
                <p><strong>Horário:</strong> {item.horarioInicio} - {item.horarioFim}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListarAgendaveis;


