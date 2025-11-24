import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar se há usuário salvo no localStorage ao carregar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro ao recuperar dados do usuário:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (email, password) => {
    // Sistema de autenticação simples (sem backend por enquanto)
    // Em produção, isso deve fazer uma chamada à API
    
    // Usuários pré-cadastrados para demonstração
    const users = {
      'admin@clinica.com': { 
        email: 'admin@clinica.com', 
        password: 'admin123', 
        role: 'admin', 
        name: 'Administrador' 
      },
      'usuario@clinica.com': { 
        email: 'usuario@clinica.com', 
        password: 'user123', 
        role: 'user', 
        name: 'Usuário' 
      },
    };

    const userData = users[email];
    
    if (userData && userData.password === password) {
      const loggedUser = {
        email: userData.email,
        role: userData.role,
        name: userData.name,
      };
      
      setUser(loggedUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      return { success: true, user: loggedUser };
    } else {
      return { success: false, message: 'Email ou senha incorretos' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  const isUser = () => {
    return user && user.role === 'user';
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    isAdmin,
    isUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

