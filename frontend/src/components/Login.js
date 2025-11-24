import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = ({ setActiveView, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = login(email, password);
      
      if (result.success) {
        // Redirecionar baseado no papel do usuário
        if (result.user.role === 'admin') {
          setActiveView('dashboard');
        } else {
          setActiveView('home');
        }
        
        if (onLoginSuccess) {
          onLoginSuccess(result.user);
        }
      } else {
        setError(result.message || 'Erro ao fazer login');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🏥</div>
          <h2 className="login-title">Clínica Fácil</h2>
          <p className="login-subtitle">Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group-login">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group-login">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-info">
          <p className="login-info-title">Credenciais de teste:</p>
          <div className="login-credentials">
            <div className="credential-item">
              <strong>Admin:</strong> admin@clinica.com / admin123
            </div>
            <div className="credential-item">
              <strong>Usuário:</strong> usuario@clinica.com / user123
            </div>
          </div>
        </div>

        <button 
          className="login-back-btn"
          onClick={() => setActiveView('home')}
        >
          ← Voltar para Home
        </button>
      </div>
    </div>
  );
};

export default Login;

