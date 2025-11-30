import http from './httpClient'
import { STRAPI_URL } from './config'
import { strapiAuthService } from './strapiAuth'

function getStrapiBase(){
  return STRAPI_URL
}

/**
 * Obtiene los autores de un recurso digital por su fuente
 * @param {string} source - Fuente del recurso digital
 * @returns {Promise} Respuesta con los datos mínimos de los autores
*/
export async function getAuthorsForItemSource(source) {
  const authConfig = strapiAuthService.getAuthConfig()
  return http.get(`${getStrapiBase()}/recursos-digitales?filters[source][$eq]=${source}&populate[autores][populate][nombre_propio][fields][0]=nombres&populate[autores][populate][nombre_propio][fields][1]=apellidos&fields[]&populate[autores][fields][0]=grado_academico`, authConfig)
}
