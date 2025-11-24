import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './CalendarioModal.css';

const CalendarioModal = ({ isOpen, onClose, medicoNome }) => {
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!aceitaTermos) {
      alert('Por favor, aceite os termos de uso e política de privacidade.');
      return;
    }

    setLoading(true);
    
    // Simular envio (aqui você integraria com a API)
    setTimeout(() => {
      setLoading(false);
      setEnviado(true);
      setTimeout(() => {
        onClose();
        setEmail('');
        setTelefone('');
        setAceitaTermos(false);
        setEnviado(false);
      }, 2000);
    }, 1000);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="calendario-modal-backdrop" onClick={handleBackdropClick}>
      <div className="calendario-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="calendario-modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="calendario-modal-content">
          <h2 className="calendario-modal-title">
            Solicite a este especialista para ativar o calendário
          </h2>

          <div className="calendario-modal-info">
            <p>
              Este especialista não permite agendamento online neste endereço.
            </p>
            <p>
              Deixe seus dados de contato e informaremos se, no futuro, o calendário estiver ativo.
            </p>
            <p>
              É possível que compartilhemos seus dados de contato com o especialista para que ele possa entrar em contato com você.
            </p>
          </div>

          {enviado ? (
            <div className="calendario-modal-success">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3d8eff" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p>Solicitação enviada com sucesso!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="calendario-modal-form">
              <p className="campos-obrigatorios">* campos obrigatórios</p>

              <div className="form-group-calendario">
                <label htmlFor="email-calendario">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email-calendario"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email aqui"
                  required
                />
              </div>

              <div className="form-group-calendario">
                <label htmlFor="telefone-calendario">
                  Telefone (opcional)
                  <span className="info-icon" title="Digite apenas números, sem espaços ou caracteres especiais">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </span>
                </label>
                <input
                  type="tel"
                  id="telefone-calendario"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Digite seu número de telefone. Exemplo: 11999999999"
                />
              </div>

              <div className="form-group-checkbox">
                <input
                  type="checkbox"
                  id="aceita-termos"
                  checked={aceitaTermos}
                  onChange={(e) => setAceitaTermos(e.target.checked)}
                  required
                />
                <label htmlFor="aceita-termos">
                  Você aceita os{' '}
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      // Aqui você pode abrir um modal ou página com os termos
                      alert('Termos de uso serão exibidos aqui');
                    }} 
                    className="link-termos"
                  >
                    termos de uso
                  </button>
                  , bem como declara ciência do conteúdo da{' '}
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      // Aqui você pode abrir um modal ou página com a política
                      alert('Política de privacidade será exibida aqui');
                    }} 
                    className="link-termos"
                  >
                    política de privacidade
                  </button>
                  .
                </label>
              </div>

              <button 
                type="submit" 
                className="btn-enviar-calendario"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default CalendarioModal;

