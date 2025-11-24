import React, { useState, useEffect } from 'react';
import { medicosAPI, agendaveisAPI } from '../services/api';
import MedicoCard from './MedicoCard';
import './Home.css';

const Home = () => {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarMedicos();
  }, []);

  const carregarMedicos = async () => {
    try {
      setLoading(true);
      const response = await medicosAPI.listar();
      const medicosList = response.data || [];
      
      // Buscar horários disponíveis para cada médico
      const medicosComHorarios = await Promise.all(
        medicosList.map(async (medico) => {
          try {
            const hoje = new Date().toISOString().split('T')[0];
            const horariosResponse = await agendaveisAPI.consultarHorarios(
              medico.id,
              hoje
            );
            const horariosDisponiveis = horariosResponse.data || [];
            
            return {
              ...medico,
              horariosDisponiveis: horariosDisponiveis.slice(0, 6), // Mostrar até 6 horários
            };
          } catch (error) {
            return {
              ...medico,
              horariosDisponiveis: [],
            };
          }
        })
      );
      
      setMedicos(medicosComHorarios);
    } catch (error) {
      console.error('Erro ao carregar médicos:', error);
      setMedicos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page-content">
      {/* Seção Hero/Apresentação */}
      <section className="hero-section">
        <div className="hero-banner">
          <img 
            src="/images/banners/WhatsApp Image 2025-11-24 at 13.51.41.jpeg" 
            alt="Clínica Fácil - Seu atendimento mais simples"
            className="hero-banner-image"
            onError={(e) => {
              // Se a imagem não existir, ocultar o elemento
              e.target.style.display = 'none';
            }}
          />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Bem-vindo à Clínica Fácil</h1>
          <p className="hero-subtitle">
            Seu atendimento mais simples e acessível. Oferecemos cuidados de saúde 
            de qualidade com profissionais experientes e comprometidos com o seu bem-estar.
          </p>
          <p className="hero-description">
            Na Clínica Fácil, priorizamos o conforto e a comodidade dos nossos pacientes. 
            Com horários flexíveis e um ambiente acolhedor, estamos aqui para cuidar de você 
            e da sua família.
          </p>
        </div>
      </section>

      {/* Seção de Serviços */}
      <section className="servicos-section" id="servicos">
        <div className="container">
          <h2 className="section-title">Nossos Serviços</h2>
          <p className="section-subtitle">Oferecemos uma ampla gama de serviços médicos para cuidar de você</p>
          
          <div className="servicos-grid">
            <div className="servico-card">
              <div className="servico-icon">👨‍⚕️</div>
              <h3 className="servico-title">Consultas Médicas</h3>
              <p className="servico-description">
                Atendimento com profissionais qualificados em diversas especialidades médicas.
              </p>
            </div>
            
            <div className="servico-card">
              <div className="servico-icon">🔬</div>
              <h3 className="servico-title">Exames Laboratoriais</h3>
              <p className="servico-description">
                Realização de exames com equipamentos modernos e resultados rápidos.
              </p>
            </div>
            
            <div className="servico-card">
              <div className="servico-icon">💉</div>
              <h3 className="servico-title">Vacinação</h3>
              <p className="servico-description">
                Campanhas de vacinação e imunização para toda a família.
              </p>
            </div>
            
            <div className="servico-card">
              <div className="servico-icon">📋</div>
              <h3 className="servico-title">Check-up Preventivo</h3>
              <p className="servico-description">
                Avaliação completa da sua saúde com exames preventivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Médicos com Mapa */}
      <section className="medicos-section">
        <div className="container-medicos">
          <div className="medicos-header">
            <h2 className="section-title">Nossos Médicos</h2>
            <p className="section-subtitle">Agende sua consulta com nossos especialistas</p>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Carregando médicos...</p>
            </div>
          ) : medicos.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum médico disponível no momento.</p>
            </div>
          ) : (
            <div className="medicos-layout">
              <div className="medicos-grid-modern">
                {medicos.map((medico) => (
                  <MedicoCard key={medico.id} medico={medico} />
                ))}
              </div>
              <div className="mapa-container">
                <div className="mapa-wrapper">
                  <h3 className="mapa-title">📍 Nossa Localização</h3>
                  <div className="mapa-placeholder">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.375!2d-36.4927!3d-8.2844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMTcnMDMuOCJTIDM2wrAyOSczMy44Ilc!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0, borderRadius: '16px' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Localização da Clínica Fácil"
                    />
                  </div>
                  <div className="mapa-info">
                    <div className="mapa-endereco">
                      <strong>📍 Endereço:</strong>
                      <p>Rua das Flores, 123<br />
                      Centro - Caruaru/PE<br />
                      CEP: 55000-000</p>
                    </div>
                    <div className="mapa-contato">
                      <strong>📞 Contato:</strong>
                      <p>(81) 99999-9999<br />
                      contato@clinicafacil.com.br</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
