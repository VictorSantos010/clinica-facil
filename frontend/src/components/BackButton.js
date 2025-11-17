import React from 'react';
import './BackButton.css';

const BackButton = ({ onClick, label = 'Voltar' }) => {
  return (
    <button className="back-button" onClick={onClick}>
      <span className="back-arrow">←</span>
      <span className="back-text">{label}</span>
    </button>
  );
};

export default BackButton;

