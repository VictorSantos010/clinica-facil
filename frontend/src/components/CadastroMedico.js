import React, { useState } from 'react';
import { medicosAPI } from '../services/api';
import BackButton from './BackButton';
import './Form.css';

const CadastroMedico = ({ setActiveView }) => {
  const [formData, setFormData] = useState({
    nome: '',
    crm: '',
    especialidade: '',
    horarioInicio: '08:00',
    horarioFim: '18:00',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

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
        ...formData,
        horarioInicio: `${formData.horarioInicio}:00`,
        horarioFim: `${formData.horarioFim}:00`,
      };
      const response = await medicosAPI.criar(data);
      setMessage({ type: 'success', text: `Médico ${response.data.nome} cadastrado com sucesso! ID: ${response.data.id}` });
      setFormData({ nome: '', crm: '', especialidade: '', horarioInicio: '08:00', horarioFim: '18:00' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao cadastrar médico. Verifique os dados.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <BackButton onClick={() => setActiveView('dashboard')} label="Voltar ao Dashboard" />
      </div>
      <h2 className="form-title">Cadastrar Médico</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="nome">Nome *</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Dr. Nome Completo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="crm">CRM *</label>
          <input
            type="text"
            id="crm"
            name="crm"
            value={formData.crm}
            onChange={handleChange}
            required
            placeholder="CRM123456"
          />
        </div>

        <div className="form-group">
          <label htmlFor="especialidade">Especialidade *</label>
          <input
            type="text"
            id="especialidade"
            name="especialidade"
            value={formData.especialidade}
            onChange={handleChange}
            required
            placeholder="Cardiologia"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="horarioInicio">Horário Início *</label>
            <input
              type="time"
              id="horarioInicio"
              name="horarioInicio"
              value={formData.horarioInicio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="horarioFim">Horário Fim *</label>
            <input
              type="time"
              id="horarioFim"
              name="horarioFim"
              value={formData.horarioFim}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar Médico'}
        </button>
      </form>
    </div>
  );
};

export default CadastroMedico;


