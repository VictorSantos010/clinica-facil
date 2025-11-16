import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Pacientes
export const pacientesAPI = {
  criar: (paciente) => api.post('/pacientes', paciente),
  listar: () => api.get('/pacientes'),
  buscarPorId: (id) => api.get(`/pacientes/${id}`),
};

// Médicos
export const medicosAPI = {
  criar: (medico) => api.post('/medicos', medico),
  listar: () => api.get('/medicos'),
  buscarPorId: (id) => api.get(`/medicos/${id}`),
};

// Exames
export const examesAPI = {
  criar: (exame) => api.post('/exames', exame),
  listar: () => api.get('/exames'),
  buscarPorId: (id) => api.get(`/exames/${id}`),
};

// Agendáveis
export const agendaveisAPI = {
  listar: () => api.get('/agendaveis'),
  consultarHorarios: (id, dia) => api.get(`/agendaveis/${id}/agenda`, { params: { dia } }),
};

// Agendamentos
export const agendamentosAPI = {
  criar: (agendamento) => api.post('/agendamentos', agendamento),
  listar: () => api.get('/agendamentos'),
};

export default api;


