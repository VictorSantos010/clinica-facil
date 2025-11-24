import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './EditarMedicoModal.css';

const EditarMedicoModal = ({ isOpen, onClose, medico, onSave }) => {
  const [formData, setFormData] = useState({
    nome: '',
    crm: '',
    especialidade: '',
    horarioInicio: '08:00',
    horarioFim: '18:00',
    fotoUrl: '',
  });
  const [fotoPreview, setFotoPreview] = useState(null);
  const [fotoDimensoes, setFotoDimensoes] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const DIMENSAO_MINIMA = 200;
  const DIMENSAO_IDEAL = 400;

  useEffect(() => {
    if (medico && isOpen) {
      setFormData({
        nome: medico.nome || '',
        crm: medico.crm?.replace('CRM', '') || '',
        especialidade: medico.especialidade || '',
        horarioInicio: medico.horarioInicio ? (medico.horarioInicio.length >= 5 ? medico.horarioInicio.substring(0, 5) : medico.horarioInicio) : '08:00',
        horarioFim: medico.horarioFim ? (medico.horarioFim.length >= 5 ? medico.horarioFim.substring(0, 5) : medico.horarioFim) : '18:00',
        fotoUrl: medico.fotoUrl || '',
      });
      setFotoPreview(medico.fotoUrl || null);
      setFotoDimensoes(null);
    }
  }, [medico, isOpen]);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCrmChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({
      ...formData,
      crm: value,
    });
  };

  const redimensionarImagem = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        let width = img.width;
        let height = img.height;
        const aspectRatio = width / height;
        
        let sourceWidth = width;
        let sourceHeight = height;
        let sourceX = 0;
        let sourceY = 0;
        
        if (aspectRatio > 1) {
          sourceWidth = height;
          sourceX = (width - height) / 2;
        } else if (aspectRatio < 1) {
          sourceHeight = width;
          sourceY = (height - width) / 2;
        }
        
        let tamanhoFinal = Math.min(sourceWidth, sourceHeight);
        if (tamanhoFinal < DIMENSAO_MINIMA) {
          tamanhoFinal = DIMENSAO_MINIMA;
        } else if (tamanhoFinal > DIMENSAO_IDEAL) {
          tamanhoFinal = DIMENSAO_IDEAL;
        }
        
        canvas.width = tamanhoFinal;
        canvas.height = tamanhoFinal;
        
        ctx.drawImage(
          img,
          sourceX, sourceY, sourceWidth, sourceHeight,
          0, 0, tamanhoFinal, tamanhoFinal
        );
        
        const base64String = canvas.toDataURL('image/jpeg', 0.9);
        
        const dimensoes = {
          original: { width: img.width, height: img.height },
          final: { width: tamanhoFinal, height: tamanhoFinal },
          aspectRatio: aspectRatio
        };
        
        callback(base64String, dimensoes);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Por favor, selecione um arquivo de imagem válido (PNG, JPG, GIF).' });
      return;
    }
    
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setMessage({ type: 'error', text: 'A imagem deve ter no máximo 5MB. Por favor, escolha uma imagem menor.' });
      return;
    }
    
    redimensionarImagem(file, (base64String, dimensoes) => {
      setFotoDimensoes(dimensoes);
      setFotoPreview(base64String);
      setFormData({
        ...formData,
        fotoUrl: base64String,
      });
      
      if (dimensoes.final.width >= DIMENSAO_MINIMA) {
        setMessage({ 
          type: 'success', 
          text: `Foto processada com sucesso! Dimensões: ${dimensoes.final.width}x${dimensoes.final.height}px (quadrada)` 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: `Foto muito pequena. Dimensões finais: ${dimensoes.final.width}x${dimensoes.final.height}px. Recomenda-se pelo menos ${DIMENSAO_MINIMA}x${DIMENSAO_MINIMA}px.` 
        });
      }
    });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemovePhoto = () => {
    setFotoPreview(null);
    setFotoDimensoes(null);
    setFormData({
      ...formData,
      fotoUrl: '',
    });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (!formData.nome || formData.nome.trim() === '') {
        setMessage({ type: 'error', text: 'O nome do médico é obrigatório.' });
        setLoading(false);
        return;
      }

      if (!formData.crm || formData.crm.trim() === '') {
        setMessage({ type: 'error', text: 'O CRM é obrigatório.' });
        setLoading(false);
        return;
      }

      if (!formData.especialidade || formData.especialidade.trim() === '') {
        setMessage({ type: 'error', text: 'A especialidade é obrigatória.' });
        setLoading(false);
        return;
      }

      const crmFormatado = formData.crm.startsWith('CRM') 
        ? formData.crm 
        : `CRM${formData.crm}`;
      
      const horarioInicioFormatado = formData.horarioInicio.includes(':') 
        ? (formData.horarioInicio.split(':').length === 2 ? `${formData.horarioInicio}:00` : formData.horarioInicio)
        : `${formData.horarioInicio}:00:00`;
      
      const horarioFimFormatado = formData.horarioFim.includes(':')
        ? (formData.horarioFim.split(':').length === 2 ? `${formData.horarioFim}:00` : formData.horarioFim)
        : `${formData.horarioFim}:00:00`;

      const data = {
        nome: formData.nome.trim(),
        crm: crmFormatado,
        especialidade: formData.especialidade.trim(),
        horarioInicio: horarioInicioFormatado,
        horarioFim: horarioFimFormatado,
      };

      if (formData.fotoUrl && formData.fotoUrl.trim() !== '') {
        data.fotoUrl = formData.fotoUrl;
      }

      await onSave(data);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao atualizar médico. Verifique os dados.',
      });
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

  const modalContent = (
    <div className="editar-medico-backdrop" onClick={handleBackdropClick}>
      <div className="editar-medico-container" onClick={(e) => e.stopPropagation()}>
        <button className="editar-medico-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="editar-medico-content">
          <h2 className="editar-medico-title">Editar Médico</h2>

          <form onSubmit={handleSubmit} className="editar-medico-form">
            <div className="form-group">
              <label htmlFor="edit-nome">Nome *</label>
              <input
                type="text"
                id="edit-nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Dr. Nome Completo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-crm">CRM *</label>
              <div className="crm-input-wrapper">
                <span className="crm-prefix">CRM</span>
                <input
                  type="text"
                  id="edit-crm"
                  name="crm"
                  value={formData.crm}
                  onChange={handleCrmChange}
                  required
                  placeholder="123456"
                  maxLength="20"
                  pattern="[0-9]+"
                  inputMode="numeric"
                />
              </div>
              <small className="form-hint">Digite apenas os números do CRM</small>
            </div>

            <div className="form-group">
              <label htmlFor="edit-especialidade">Especialidade *</label>
              <input
                type="text"
                id="edit-especialidade"
                name="especialidade"
                value={formData.especialidade}
                onChange={handleChange}
                required
                placeholder="Cardiologia"
              />
            </div>

            <div className="form-group">
              <label>Foto do Médico</label>
              <div className="photo-upload-info">
                <p className="photo-requirements">
                  <strong>Requisitos da foto:</strong> Quadrada (1:1), mínimo {DIMENSAO_MINIMA}x{DIMENSAO_MINIMA}px, 
                  ideal {DIMENSAO_IDEAL}x{DIMENSAO_IDEAL}px. A foto será automaticamente ajustada para formato circular.
                </p>
              </div>
              <div
                className={`photo-upload-area ${isDragging ? 'dragging' : ''} ${fotoPreview ? 'has-photo' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById('edit-fileInput').click()}
              >
                <input
                  type="file"
                  id="edit-fileInput"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  style={{ display: 'none' }}
                />
                {fotoPreview ? (
                  <div className="photo-preview-wrapper">
                    <div className="photo-preview-circular">
                      <img src={fotoPreview} alt="Preview" className="photo-preview-img" />
                    </div>
                    <div className="photo-preview-info">
                      {fotoDimensoes && (
                        <p className="photo-dimensions">
                          {fotoDimensoes.final.width}x{fotoDimensoes.final.height}px
                          {fotoDimensoes.final.width >= DIMENSAO_MINIMA ? (
                            <span className="dimension-ok">✓</span>
                          ) : (
                            <span className="dimension-warning">⚠</span>
                          )}
                        </p>
                      )}
                      <button
                        type="button"
                        className="remove-photo-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemovePhoto();
                        }}
                      >
                        ✕ Remover foto
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="photo-upload-content">
                    <div className="photo-upload-icon">📷</div>
                    <p className="photo-upload-text">
                      <span className="photo-upload-highlight">Clique para escolher</span> ou arraste uma foto aqui
                    </p>
                    <p className="photo-upload-hint">
                      PNG, JPG ou GIF até 5MB | Mínimo {DIMENSAO_MINIMA}x{DIMENSAO_MINIMA}px
                    </p>
                    <div className="photo-example">
                      <div className="photo-example-circle"></div>
                      <span>Formato circular na home</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-horarioInicio">Horário Início *</label>
                <input
                  type="time"
                  id="edit-horarioInicio"
                  name="horarioInicio"
                  value={formData.horarioInicio}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-horarioFim">Horário Fim *</label>
                <input
                  type="time"
                  id="edit-horarioFim"
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

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default EditarMedicoModal;

