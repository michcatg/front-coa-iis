// API Key por defecto desde las variables de entorno
const DEFAULT_API_KEY = import.meta.env.VITE_STRAPI_API_KEY || ''

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
   * Obtiene el token de autenticación del localStorage
   * @returns {string|null} Token de autenticación o null
   */
  getAuthToken() {
    return localStorage.getItem('strapiAuthToken')
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
}
