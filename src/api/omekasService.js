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

function processOmekasQueryOptions(queryOptions) {
  const params = {}
  if (queryOptions.ids) {
    params.id = queryOptions.ids.join(',')
  }
  if (queryOptions.fullQuery?.fulltext_search) {
    params.fulltext_search = queryOptions.fullQuery.fulltext_search
  }
  if (queryOptions.fullQuery?.property) {
    params.property = queryOptions.fullQuery.property
  }
  return params
}

export async function getOmekasProperties() {
  return http.get(`${getOmekaBase()}/properties`)
}
