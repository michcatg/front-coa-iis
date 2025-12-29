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

export async function getOmekaItem(id) {
  return http.get(`${getOmekaBase()}/items/${id}`)
}

export async function getOmekasResourceTemplate(id) {
  return http.get(`${getOmekaBase()}/resource_templates/${id}`)
}

/**
 * Obtiene los elementos recientes de Omekas.
 *
 * @async
 * @function
 * @param {Object|null} [queryOptions=null] - Opciones de consulta para filtrar los resultados.
 * @param {number} [limit=5] - Número máximo de elementos a obtener.
 * @returns {Promise<Object>} - Una promesa que resuelve con los datos de los elementos recientes.
 *
 * @example
 * const items = await getRecentOmekaItems({ fulltext_search: 'example' }, 10);
 * console.log(items);
 */
export async function getRecentOmekasItems(queryOptions=null,limit = 5) {
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
 * Procesa las opciones de consulta y las transforma en los parámetros esperados por Omekas.
 *
 * @function
 * @param {Object} queryOptions - Opciones de consulta para la búsqueda.
 * @param {Array<number|string>} [queryOptions.ids] - IDs de los elementos a buscar.
 * @param {string} [queryOptions.fulltext_search] - Texto completo para buscar en los elementos.
 * @param {Array<Object>} [queryOptions.property] - Propiedades específicas para filtrar los resultados.
 * @returns {Object} - Un objeto con los parámetros transformados para Omeka.
 *
 * @example
 * const params = processOmekasQueryOptions({
 *   ids: [1, 2, 3],
 *   fulltext_search: 'example',
 *   property: [{ joiner: 'and', property: 2, type: 'in', text: 'example' }],
 * });
 * console.log(params);
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

/**
 * Obtiene las propiedades disponibles en Omekas.
 *
 * @async
 * @function
 * @returns {Promise<Object>} - Una promesa que resuelve con las propiedades disponibles en Omeka.
 *
 * @example
 * const properties = await getOmekasProperties();
 * console.log(properties);
 */
export async function getOmekasProperties() {
  return http.get(`${getOmekaBase()}/properties`)
}

export async function getOmekasMediaFromSource(source) {
  return http.get(source)
}
