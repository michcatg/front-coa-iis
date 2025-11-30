// src/api/httpClient.js
import axios from 'axios'

const httpClient = axios.create({
  timeout: 10000, // 10 segundos máximo por request
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor de requests (antes de enviar)
httpClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// Interceptor de responses (al recibir)
httpClient.interceptors.response.use(response => {
  return response
}, error => {
  console.error('Error en la API:', error)
  if (error.response?.status === 401) {
    localStorage.removeItem('authToken')
    // TODO: Manejo de tokens expirados
  }

  return Promise.reject(error)
})

export default httpClient
