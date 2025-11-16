import React, { useState } from 'react';
import { pacientesAPI } from '../services/api';
import './Form.css';

const CadastroPaciente = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
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
      const response = await pacientesAPI.criar(formData);
      setMessage({ type: 'success', text: `Paciente ${response.data.nome} cadastrado com sucesso! ID: ${response.data.id}` });
      setFormData({ nome: '', cpf: '', email: '', telefone: '' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao cadastrar paciente. Verifique os dados.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Cadastrar Paciente</h2>
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
            placeholder="Digite o nome completo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF * (11 dígitos, apenas números)</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
            pattern="[0-9]{11}"
            maxLength="11"
            placeholder="12345678901"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="paciente@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="11987654321"
          />
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar Paciente'}
        </button>
      </form>
    </div>
  );
};

export default CadastroPaciente;


