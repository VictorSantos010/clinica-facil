import React from 'react';
import Logo from './Logo';
import './HomeHeader.css';

const HomeHeader = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="home-header">
      <div className="home-header-content">
        <div className="home-header-brand">
          <Logo size="medium" />
          <div className="home-header-slogan">
            <span>Seu atendimento mais simples</span>
          </div>
        </div>
        <nav className="home-header-nav">
          <button 
            className="home-header-link"
            onClick={() => scrollToSection('inicio')}
          >
            Início
          </button>
          <button 
            className="home-header-link"
            onClick={() => scrollToSection('servicos')}
          >
            Serviços
          </button>
          <button 
            className="home-header-link"
            onClick={() => scrollToSection('contato')}
          >
            Contato
          </button>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
