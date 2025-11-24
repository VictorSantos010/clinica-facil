import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium', onClick }) => {
  const sizeClasses = {
    small: 'logo-small',
    medium: 'logo-medium',
    large: 'logo-large',
  };

  return (
    <div 
      className={`logo-container ${sizeClasses[size]}`}
      onClick={onClick}
    >
      <div className="logo-icon-wrapper">
        <svg 
          className="logo-icon" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d8eff" />
              <stop offset="100%" stopColor="#1e6fd8" />
            </linearGradient>
          </defs>
          {/* Cruz médica estilizada */}
          <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
          <path 
            d="M50 20 L50 80 M20 50 L80 50" 
            stroke="white" 
            strokeWidth="8" 
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="15" fill="white" opacity="0.3" />
        </svg>
      </div>
      <div className="logo-text">
        <span className="logo-main">Clínica</span>
        <span className="logo-sub">Fácil</span>
      </div>
    </div>
  );
};

export default Logo;

