import React, { useState } from 'react';
import { medicosAPI } from '../services/api';
import BackButton from './BackButton';
import './Form.css';

const CadastroMedico = ({ setActiveView }) => {
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

  // Dimensões ideais para foto circular na home (120x120px exibido, mas precisa ser maior para qualidade)
  const DIMENSAO_MINIMA = 200;
  const DIMENSAO_IDEAL = 400;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCrmChange = (e) => {
    // Remove tudo que não é número
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
        
        // Calcular dimensões mantendo aspecto quadrado
        let width = img.width;
        let height = img.height;
        const aspectRatio = width / height;
        
        // Calcular dimensões para crop quadrado (centralizado)
        let sourceWidth = width;
        let sourceHeight = height;
        let sourceX = 0;
        let sourceY = 0;
        
        if (aspectRatio > 1) {
          // Imagem mais larga - cortar largura (centralizar)
          sourceWidth = height;
          sourceX = (width - height) / 2;
        } else if (aspectRatio < 1) {
          // Imagem mais alta - cortar altura (centralizar)
          sourceHeight = width;
          sourceY = (height - width) / 2;
        }
        
        // Calcular tamanho final (garantir mínimo, limitar máximo)
        let tamanhoFinal = Math.min(sourceWidth, sourceHeight);
        if (tamanhoFinal < DIMENSAO_MINIMA) {
          tamanhoFinal = DIMENSAO_MINIMA;
        } else if (tamanhoFinal > DIMENSAO_IDEAL) {
          tamanhoFinal = DIMENSAO_IDEAL;
        }
        
        canvas.width = tamanhoFinal;
        canvas.height = tamanhoFinal;
        
        // Desenhar imagem redimensionada e cortada (quadrada)
        ctx.drawImage(
          img,
          sourceX, sourceY, sourceWidth, sourceHeight,
          0, 0, tamanhoFinal, tamanhoFinal
        );
        
        // Converter para base64
        const base64String = canvas.toDataURL('image/jpeg', 0.9);
        
        // Salvar dimensões
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
    
    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Por favor, selecione um arquivo de imagem válido (PNG, JPG, GIF).' });
      return;
    }
    
    // Validar tamanho (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB em bytes
    if (file.size > maxSize) {
      setMessage({ type: 'error', text: 'A imagem deve ter no máximo 5MB. Por favor, escolha uma imagem menor.' });
      return;
    }
    
    // Redimensionar e validar dimensões
    redimensionarImagem(file, (base64String, dimensoes) => {
      setFotoDimensoes(dimensoes);
      setFotoPreview(base64String);
      setFormData({
        ...formData,
        fotoUrl: base64String,
      });
      
      // Mensagem de sucesso com informações
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
      // Validações básicas com mensagens claras
      if (!formData.nome || formData.nome.trim() === '') {
        setMessage({ type: 'error', text: '❌ O nome do médico é obrigatório. Por favor, preencha este campo.' });
        setLoading(false);
        return;
      }

      if (!formData.crm || formData.crm.trim() === '') {
        setMessage({ type: 'error', text: '❌ O CRM é obrigatório. Digite apenas os números do CRM.' });
        setLoading(false);
        return;
      }

      if (formData.crm.length < 4) {
        setMessage({ type: 'error', text: '❌ O CRM deve ter pelo menos 4 dígitos.' });
        setLoading(false);
        return;
      }

      if (!formData.especialidade || formData.especialidade.trim() === '') {
        setMessage({ type: 'error', text: '❌ A especialidade é obrigatória. Ex: Cardiologia, Ortopedia, etc.' });
        setLoading(false);
        return;
      }

      if (!formData.horarioInicio || !formData.horarioFim) {
        setMessage({ type: 'error', text: '❌ Os horários de início e fim são obrigatórios.' });
        setLoading(false);
        return;
      }

      // Validar se horário fim é depois do início
      const inicio = formData.horarioInicio.split(':').map(Number);
      const fim = formData.horarioFim.split(':').map(Number);
      const inicioMinutos = inicio[0] * 60 + inicio[1];
      const fimMinutos = fim[0] * 60 + fim[1];
      
      if (fimMinutos <= inicioMinutos) {
        setMessage({ type: 'error', text: '❌ O horário de fim deve ser depois do horário de início.' });
        setLoading(false);
        return;
      }

      // Formatar CRM adicionando prefixo se necessário
      const crmFormatado = formData.crm.startsWith('CRM') 
        ? formData.crm 
        : `CRM${formData.crm}`;
      
      // Preparar dados para envio
      // Formatar horários no formato HH:mm:ss
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

      // Adicionar foto apenas se houver (opcional)
      if (formData.fotoUrl && formData.fotoUrl.trim() !== '') {
        data.fotoUrl = formData.fotoUrl;
      }

      const response = await medicosAPI.criar(data);
      setMessage({ 
        type: 'success', 
        text: `Médico ${response.data.nome} cadastrado com sucesso! ID: ${response.data.id}` 
      });
      
      // Limpar formulário
      setFormData({ 
        nome: '', 
        crm: '', 
        especialidade: '', 
        horarioInicio: '08:00', 
        horarioFim: '18:00', 
        fotoUrl: '' 
      });
      setFotoPreview(null);
      setFotoDimensoes(null);
    } catch (error) {
      console.error('Erro ao cadastrar médico:', error);
      
      // Tratar diferentes tipos de erro
      let errorMessage = 'Erro ao cadastrar médico. Verifique os dados.';
      
      if (error.response) {
        // Erro do servidor
        if (error.response.data) {
          if (error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.data.errors) {
            // Erros de validação
            const validationErrors = error.response.data.errors
              .map(err => `${err.field}: ${err.defaultMessage}`)
              .join(', ');
            errorMessage = `Erros de validação: ${validationErrors}`;
          } else if (typeof error.response.data === 'string') {
            errorMessage = error.response.data;
          }
        } else if (error.response.status === 400) {
          errorMessage = 'Dados inválidos. Verifique se todos os campos obrigatórios estão preenchidos corretamente.';
        } else if (error.response.status === 409) {
          errorMessage = 'Já existe um médico cadastrado com este CRM.';
        }
      } else if (error.request) {
        errorMessage = 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.';
      }
      
      setMessage({
        type: 'error',
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <BackButton onClick={() => setActiveView('dashboard')} label="Voltar ao Dashboard" />
      </div>
      <h2 className="form-title">Cadastrar Médico</h2>
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
            placeholder="Dr. Nome Completo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="crm">CRM *</label>
          <div className="crm-input-wrapper">
            <span className="crm-prefix">CRM</span>
            <input
              type="text"
              id="crm"
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
          <label htmlFor="especialidade">Especialidade *</label>
          <input
            type="text"
            id="especialidade"
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
            onClick={() => document.getElementById('fileInput').click()}
          >
            <input
              type="file"
              id="fileInput"
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
          {fotoDimensoes && fotoDimensoes.final.width < DIMENSAO_MINIMA && (
            <p className="photo-warning">
              ⚠ A foto será redimensionada, mas recomenda-se usar uma imagem de pelo menos {DIMENSAO_MINIMA}x{DIMENSAO_MINIMA}px para melhor qualidade.
            </p>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="horarioInicio">Horário Início *</label>
            <input
              type="time"
              id="horarioInicio"
              name="horarioInicio"
              value={formData.horarioInicio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="horarioFim">Horário Fim *</label>
            <input
              type="time"
              id="horarioFim"
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

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar Médico'}
        </button>
      </form>
    </div>
  );
};

export default CadastroMedico;


