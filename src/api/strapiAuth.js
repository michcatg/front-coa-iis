import { getStrapiBase } from '@/api/strapiService.js'
import { getStrapiApiKey } from './config'
// API Key por defecto desde las variables de entorno
const DEFAULT_API_KEY = getStrapiApiKey() || ''

/**
 * Genera un token Bearer a partir de una API key o token
 * @param {string} token - API key o token de autenticación
 * @returns {string} Token Bearer formateado
 */
export function getBearerToken(token) {
  return `Bearer ${token}`;
}

/**
 * Configura los headers con el token Bearer
 * @param {string} token - API key o token (opcional, usa el por defecto si no se proporciona)
 * @returns {object} Objeto de configuración con headers
 */
export function configureBearerToken(token = DEFAULT_API_KEY) {
  return {
    headers: {
      Authorization: getBearerToken(token),
      'Content-Type': 'application/json'
    }
  };
}

/**
 * Servicio de autenticación para Strapi
 */
export const strapiAuthService = {
  defaultApiKey: DEFAULT_API_KEY,
  /**
   * Configura el token de autenticación en el localStorage
   * @param {string} token - Token de autenticación
   */
  setAuthToken(token) {
    localStorage.setItem('strapiAuthToken', token)
  },

  /**
   * Obtiene el token de autenticación del localStorage
   * @returns {string|null} Token de autenticación o null
   */
  getAuthToken() {
    return localStorage.getItem('strapiAuthToken')
  },

  /**
   * Elimina el token de autenticación del localStorage
   */
  removeAuthToken() {
    localStorage.removeItem('strapiAuthToken')
  },

  /**
   * Obtiene el token a usar (del localStorage o API key por defecto)
   * @returns {string} Token de autenticación
   */
  getToken() {
    return this.getAuthToken() || this.defaultApiKey
  },

  /**
   * Genera la configuración de headers para las peticiones a Strapi
   * @param {string} customToken - Token personalizado (opcional)
   * @returns {object} Configuración de headers
   */
  getAuthConfig(customToken = null) {
    const token = customToken || this.getToken()
    return configureBearerToken(token)
  },

  /**
   * Login con email y password (para usuarios de Strapi)
   * @param {string} identifier - Email o username
   * @param {string} password - Contraseña
   * @returns {Promise<object>} Respuesta del login
   */
  async login(identifier, password) {
    try {
      const response = await fetch(`${getStrapiBase()}/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier,
          password
        })
      })

      if (!response.ok) {
        throw new Error(`Error al iniciar sesión.`)
      }

      const data = await response.json()
      
      // Guardar el JWT token del usuario
      if (data.jwt) {
        this.setAuthToken(data.jwt)
      }

      return data
    } catch (error) {
      //console.error('Error en login de Strapi:', error)
      throw error
    }
  },

  /**
   * Logout del usuario
   */
  logout() {
    this.removeAuthToken()
  },

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean} True si hay token de autenticaciÓn
   */
  isAuthenticated() {
    const token = this.getAuthToken()
    return !!token
  },

  /**
   * Obtiene la información del usuario actual
   * @returns {Promise<object>} Datos del usuario
   */
  async getCurrentUser() {
    const token = this.getAuthToken()
    if (!token) {
      throw new Error('No hay usuario autenticado')
    }

    try {
      const response = await fetch(`${getStrapiBase()}/users/me`, {
        headers: {
          Authorization: getBearerToken(token)
        }
      })

      if (!response.ok) {
        throw new Error(`Error al obtener usuario: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener usuario actual:', error)
      // Si hay error, limpiar token inválido
      this.removeAuthToken()
      throw error
    }
  }
}
