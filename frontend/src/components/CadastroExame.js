import React, { useState } from 'react';
import { examesAPI } from '../services/api';
import './Form.css';

const CadastroExame = () => {
  const [formData, setFormData] = useState({
    nome: '',
    nomeExame: '',
    sala: '',
    equipamento: '',
    horarioInicio: '08:00',
    horarioFim: '17:00',
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
      const response = await examesAPI.criar(data);
      setMessage({ type: 'success', text: `Exame ${response.data.nome} cadastrado com sucesso! ID: ${response.data.id}` });
      setFormData({ nome: '', nomeExame: '', sala: '', equipamento: '', horarioInicio: '08:00', horarioFim: '17:00' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao cadastrar exame. Verifique os dados.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Cadastrar Serviço de Exame</h2>
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
            placeholder="Raio-X Tórax"
          />
        </div>

        <div className="form-group">
          <label htmlFor="nomeExame">Nome do Exame *</label>
          <input
            type="text"
            id="nomeExame"
            name="nomeExame"
            value={formData.nomeExame}
            onChange={handleChange}
            required
            placeholder="Radiografia de Tórax"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sala">Sala *</label>
          <input
            type="text"
            id="sala"
            name="sala"
            value={formData.sala}
            onChange={handleChange}
            required
            placeholder="Sala 101"
          />
        </div>

        <div className="form-group">
          <label htmlFor="equipamento">Equipamento</label>
          <input
            type="text"
            id="equipamento"
            name="equipamento"
            value={formData.equipamento}
            onChange={handleChange}
            placeholder="Aparelho de Raio-X Digital"
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
          {loading ? 'Cadastrando...' : 'Cadastrar Exame'}
        </button>
      </form>
    </div>
  );
};

export default CadastroExame;


