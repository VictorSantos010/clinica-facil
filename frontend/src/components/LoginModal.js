import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = login(email, password);
      
      if (result.success) {
        if (onLoginSuccess) {
          onLoginSuccess(result.user);
        }
        onClose();
        setEmail('');
        setPassword('');
      } else {
        setError(result.message || 'Erro ao fazer login');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-backdrop" onClick={handleBackdropClick}>
      <div className="login-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="login-modal-content">
          <div className="login-modal-header">
            <div className="login-modal-logo">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="modalLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3d8eff" />
                    <stop offset="100%" stopColor="#1e6fd8" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#modalLogoGradient)" />
                <path 
                  d="M50 20 L50 80 M20 50 L80 50" 
                  stroke="white" 
                  strokeWidth="8" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="login-modal-title">Acesso Administrativo</h2>
            <p className="login-modal-subtitle">Faça login para acessar o painel administrativo</p>
          </div>

          <form onSubmit={handleSubmit} className="login-modal-form">
            <div className="login-modal-form-group">
              <label htmlFor="modal-email">Email</label>
              <input
                type="email"
                id="modal-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@clinica.com"
                required
                autoComplete="email"
                autoFocus
              />
            </div>

            <div className="login-modal-form-group">
              <label htmlFor="modal-password">Senha</label>
              <input
                type="password"
                id="modal-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="login-modal-error">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="login-modal-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="login-modal-spinner" width="20" height="20" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                      <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416;0 31.416" repeatCount="indefinite" />
                      <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416;-31.416" repeatCount="indefinite" />
                    </circle>
                  </svg>
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <div className="login-modal-info">
            <p className="login-modal-info-title">Credenciais de teste:</p>
            <div className="login-modal-credentials">
              <div className="login-modal-credential-item">
                <strong>Admin:</strong> admin@clinica.com / admin123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
