import React, { useState, useEffect } from 'react';
import { agendamentosAPI, pacientesAPI, agendaveisAPI } from '../services/api';
import './Form.css';

const CriarAgendamento = () => {
  const [formData, setFormData] = useState({
    idPaciente: '',
    idAgendavel: '',
    dataHora: '',
  });
  const [pacientes, setPacientes] = useState([]);
  const [agendaveis, setAgendaveis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [pacientesRes, agendaveisRes] = await Promise.all([
          pacientesAPI.listar(),
          agendaveisAPI.listar(),
        ]);
        setPacientes(pacientesRes.data);
        setAgendaveis(agendaveisRes.data);
      } catch (error) {
        setMessage({ type: 'error', text: 'Erro ao carregar dados' });
      } finally {
        setLoadingData(false);
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const data = {
        idPaciente: parseInt(formData.idPaciente),
        idAgendavel: parseInt(formData.idAgendavel),
        dataHora: formData.dataHora,
      };
      const response = await agendamentosAPI.criar(data);
      setMessage({ type: 'success', text: 'Agendamento criado com sucesso!' });
      setFormData({ idPaciente: '', idAgendavel: '', dataHora: '' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao criar agendamento. Verifique os dados e horário disponível.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="form-container">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Criar Agendamento</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="idPaciente">Paciente *</label>
          <select
            id="idPaciente"
            name="idPaciente"
            value={formData.idPaciente}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um paciente</option>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nome} - CPF: {paciente.cpf}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="idAgendavel">Item Agendável * (Médico ou Exame)</label>
          <select
            id="idAgendavel"
            name="idAgendavel"
            value={formData.idAgendavel}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um item</option>
            {agendaveis.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nome} ({item.horarioInicio} - {item.horarioFim})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dataHora">Data e Hora * (Formato: YYYY-MM-DDTHH:mm)</label>
          <input
            type="datetime-local"
            id="dataHora"
            name="dataHora"
            value={formData.dataHora}
            onChange={handleChange}
            required
            step="1800"
          />
          <small style={{ color: '#666', marginTop: '0.25rem' }}>
            Exemplo: 2025-11-20T10:30
          </small>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Agendamento'}
        </button>
      </form>
    </div>
  );
};

export default CriarAgendamento;


