import React, { useState, useEffect } from 'react';
import { agendaveisAPI } from '../services/api';
import BackButton from './BackButton';
import './List.css';

const ConsultarHorarios = ({ setActiveView }) => {
  const [agendaveis, setAgendaveis] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [dia, setDia] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAgendaveis, setLoadingAgendaveis] = useState(true);

  useEffect(() => {
    const loadAgendaveis = async () => {
      try {
        const response = await agendaveisAPI.listar();
        setAgendaveis(response.data);
      } catch (error) {
        console.error('Erro ao carregar agendáveis:', error);
      } finally {
        setLoadingAgendaveis(false);
      }
    };
    loadAgendaveis();
  }, []);

  const handleConsultar = async () => {
    if (!selectedId || !dia) {
      alert('Selecione um item e uma data');
      return;
    }

    setLoading(true);
    try {
      const response = await agendaveisAPI.consultarHorarios(selectedId, dia);
      setHorarios(response.data);
    } catch (error) {
      alert('Erro ao consultar horários. Verifique se o ID existe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <BackButton onClick={() => setActiveView('dashboard')} label="Voltar ao Dashboard" />
      </div>
      <h2 className="list-title">Consultar Horários Disponíveis</h2>

      <div className="form-container" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
        <div className="form-group">
          <label htmlFor="agendavel">Item Agendável *</label>
          <select
            id="agendavel"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            disabled={loadingAgendaveis}
          >
            <option value="">Selecione um item</option>
            {agendaveis.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nome} (ID: {item.id})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dia">Data *</label>
          <input
            type="date"
            id="dia"
            value={dia}
            onChange={(e) => setDia(e.target.value)}
            required
          />
        </div>

        <button
          type="button"
          className="submit-btn"
          onClick={handleConsultar}
          disabled={loading || !selectedId || !dia}
        >
          {loading ? 'Consultando...' : 'Consultar Horários'}
        </button>
      </div>

      {horarios.length > 0 && (
        <div>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>
            Horários Disponíveis ({horarios.length})
          </h3>
          <div className="horarios-grid">
            {horarios.map((item, index) => (
              <div key={index} className="horario-item">
                {item.horario}
              </div>
            ))}
          </div>
        </div>
      )}

      {horarios.length === 0 && !loading && selectedId && dia && (
        <div className="empty-state">
          <p>Nenhum horário disponível para esta data.</p>
        </div>
      )}
    </div>
  );
};

export default ConsultarHorarios;


