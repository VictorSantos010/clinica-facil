import React, { useState, useEffect } from 'react';
import { medicosAPI } from '../services/api';
import BackButton from './BackButton';
import './List.css';

const ListarMedicos = ({ setActiveView }) => {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadMedicos();
  }, []);

  const loadMedicos = async () => {
    try {
      setLoading(true);
      const response = await medicosAPI.listar();
      setMedicos(response.data);
      setMessage({ type: '', text: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao carregar médicos. Verifique se o backend está rodando.' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="list-container">
        <p>Carregando médicos...</p>
      </div>
    );
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <BackButton onClick={() => setActiveView('dashboard')} label="Voltar ao Dashboard" />
      </div>
      <h2 className="list-title">Médicos Cadastrados</h2>
      <p className="list-subtitle">Lista de todos os médicos do sistema</p>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {medicos.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum médico cadastrado ainda.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {medicos.map((medico) => (
            <div key={medico.id} className="card">
              <div className="card-header">
                <h3>{medico.nome}</h3>
                <span className="card-id">ID: {medico.id}</span>
              </div>
              <div className="card-body">
                <p><strong>CRM:</strong> {medico.crm}</p>
                <p><strong>Especialidade:</strong> {medico.especialidade}</p>
                <p><strong>Horário de Trabalho:</strong> {medico.horarioInicio?.substring(0, 5) || medico.horarioInicio} - {medico.horarioFim?.substring(0, 5) || medico.horarioFim}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListarMedicos;

