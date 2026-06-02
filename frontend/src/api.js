import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
})

export const pacientesApi = {
  getAll: () => api.get('/pacientes'),
  getOne: (id) => api.get(`/pacientes/${id}`),
  create: (data) => api.post('/pacientes', data),
  update: (id, data) => api.put(`/pacientes/${id}`, data),
  delete: (id) => api.delete(`/pacientes/${id}`),
}

export const medicosApi = {
  getAll: () => api.get('/medicos'),
  getOne: (id) => api.get(`/medicos/${id}`),
  create: (data) => api.post('/medicos', data),
  update: (id, data) => api.put(`/medicos/${id}`, data),
  delete: (id) => api.delete(`/medicos/${id}`),
}

export const consultasApi = {
  getAll: () => api.get('/consultas'),
  getOne: (id) => api.get(`/consultas/${id}`),
  create: (data) => api.post('/consultas', data),
  update: (id, data) => api.put(`/consultas/${id}`, data),
  delete: (id) => api.delete(`/consultas/${id}`),
}

export default api
