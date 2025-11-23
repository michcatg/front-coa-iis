import http from './httpClient'
import { OMEKAS_URL } from './config'

/**
 * Obtiene la URL base para las solicitudes a Omekas.
 *
 * @function
 * @returns {string} - La URL base configurada para Omekas.
 */
export function getOmekaBase() {
  return OMEKAS_URL
}


export async function getRecentOmekasItems(limit = 5) {
  return http.get(`${getOmekaBase()}/items`, {
    params: { sort_by: 'added', sort_order: 'desc', per_page: limit }
  })
}
