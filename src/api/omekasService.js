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

export async function getRecentOmekaItems(queryOptions=null,limit = 5) {
  return http.get(`${getOmekaBase()}/items`, {
    params: {
      ...(queryOptions ? processOmekasQueryOptions(queryOptions) : {}),
      sort_by: 'added',
      sort_order: 'desc',
      per_page: limit
    }
  })
}

/**
 * Helper para procesar los query options y transformarlos en los parámetros que Omekas espera para la búsqueda
 * @param {*} queryOptions de tipo OmekasQueryParamsDto
 * @returns un objeto con los parámetros para la búsqueda en Omekas
 */
function processOmekasQueryOptions(queryOptions) {
  const params = {}
  if (queryOptions.ids && queryOptions.ids.length > 0) {
    params.id = queryOptions.ids.join(',')
  }
  if (queryOptions.fulltext_search) {
    params.fulltext_search = queryOptions.fulltext_search
  }
  if (queryOptions.property) {
    params.property = queryOptions.property
  }
  return params
}

export async function getOmekasProperties() {
  return http.get(`${getOmekaBase()}/properties`)
}
