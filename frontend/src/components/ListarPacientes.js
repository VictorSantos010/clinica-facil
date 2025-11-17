import React, { useState, useEffect } from 'react';
import { pacientesAPI } from '../services/api';
import BackButton from './BackButton';
import './List.css';

const ListarPacientes = ({ setActiveView }) => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadPacientes();
  }, []);

  const loadPacientes = async () => {
    try {
      setLoading(true);
      setMessage({ type: '', text: '' });
      const response = await pacientesAPI.listar();
      console.log('Resposta da API:', response);
      console.log('Dados dos pacientes:', response.data);
      
      if (response.data && Array.isArray(response.data)) {
        setPacientes(response.data);
        if (response.data.length === 0) {
          setMessage({ type: 'info', text: 'Nenhum paciente encontrado no banco de dados.' });
        }
      } else {
        console.error('Resposta inválida:', response);
        setMessage({ type: 'error', text: 'Formato de resposta inválido da API.' });
      }
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
      console.error('Detalhes do erro:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';
      setMessage({ 
        type: 'error', 
        text: `Erro ao carregar pacientes: ${errorMessage}. Verifique se o backend está rodando na porta 8080.` 
      });
      setPacientes([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="list-container">
        <p>Carregando pacientes...</p>
      </div>
    );
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <BackButton onClick={() => setActiveView('dashboard')} label="Voltar ao Dashboard" />
      </div>
      <h2 className="list-title">Pacientes Cadastrados</h2>
      <p className="list-subtitle">Lista de todos os pacientes do sistema</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button onClick={loadPacientes} className="refresh-btn" disabled={loading}>
          {loading ? '🔄 Carregando...' : '🔄 Atualizar Lista'}
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {!loading && pacientes.length > 0 && (
        <div style={{ marginBottom: '1rem', textAlign: 'center', color: 'white', fontSize: '0.9rem', fontWeight: '600' }}>
          Total de pacientes encontrados: {pacientes.length}
        </div>
      )}

      {pacientes.length === 0 && !loading ? (
        <div className="empty-state">
          <p>Nenhum paciente cadastrado ainda.</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#999' }}>
            💡 Dica: Se você cadastrou o paciente Victor, verifique:
            <br />• Se o backend está rodando (porta 8080)
            <br />• Se o banco de dados H2 está persistindo os dados
            <br />• Abra o console do navegador (F12) para ver mais detalhes
          </p>
        </div>
      ) : (
        <div className="cards-grid paciente-cards">
          {pacientes.map((paciente) => {
            console.log('Renderizando paciente:', paciente);
            
            // Formatar CPF (XXX.XXX.XXX-XX)
            const formatarCPF = (cpf) => {
              if (!cpf) return 'Não informado';
              const cpfLimpo = cpf.replace(/\D/g, '');
              if (cpfLimpo.length === 11) {
                return `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3, 6)}.${cpfLimpo.slice(6, 9)}-${cpfLimpo.slice(9)}`;
              }
              return cpf;
            };

            // Formatar telefone
            const formatarTelefone = (telefone) => {
              if (!telefone) return null;
              const telLimpo = telefone.replace(/\D/g, '');
              if (telLimpo.length === 11) {
                return `(${telLimpo.slice(0, 2)}) ${telLimpo.slice(2, 7)}-${telLimpo.slice(7)}`;
              } else if (telLimpo.length === 10) {
                return `(${telLimpo.slice(0, 2)}) ${telLimpo.slice(2, 6)}-${telLimpo.slice(6)}`;
              }
              return telefone;
            };

            return (
              <div key={paciente.id} className="card paciente-card">
                <div className="paciente-card-header">
                  <div className="paciente-avatar">
                    <span className="paciente-avatar-icon">👤</span>
                  </div>
                  <div className="paciente-header-info">
                    <h3 className="paciente-nome">{paciente.nome || 'Nome não informado'}</h3>
                    <span className="paciente-id">ID #{paciente.id}</span>
                  </div>
                </div>
                
                <div className="paciente-card-body">
                  <div className="paciente-info-item">
                    <div className="paciente-info-icon">🆔</div>
                    <div className="paciente-info-content">
                      <span className="paciente-info-label">CPF</span>
                      <span className="paciente-info-value">{formatarCPF(paciente.cpf)}</span>
                    </div>
                  </div>

                  {paciente.email && (
                    <div className="paciente-info-item">
                      <div className="paciente-info-icon">📧</div>
                      <div className="paciente-info-content">
                        <span className="paciente-info-label">Email</span>
                        <span className="paciente-info-value">{paciente.email}</span>
                      </div>
                    </div>
                  )}

                  {paciente.telefone && (
                    <div className="paciente-info-item">
                      <div className="paciente-info-icon">📱</div>
                      <div className="paciente-info-content">
                        <span className="paciente-info-label">Telefone</span>
                        <span className="paciente-info-value">{formatarTelefone(paciente.telefone)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ListarPacientes;

