import http from './httpClient'
import { STRAPI_URL } from './config'
import { strapiAuthService } from './strapiAuth'

export function getStrapiBase(){
  return STRAPI_URL
}

/**
 * Obtiene los autores de un recurso digital por su fuente
 * @param {string} source - Fuente del recurso digital
 * @returns {Promise} Respuesta con los datos mínimos de los autores
*/
export async function getAuthorsForItemSource(source) {
  const authConfig = strapiAuthService.getAuthConfig()
  //return http.get(`${getStrapiBase()}/recursos-digitales?filters[source][$eq]=${source}&populate[autores][populate][nombre_propio][fields][0]=nombres&populate[autores][populate][nombre_propio][fields][1]=apellidos&fields[]&populate[autores][fields][0]=grado_academico`, authConfig)
  return http.get(`${getStrapiBase()}/recursos-digitales?filters[source][$eq]=${source}&populate[autores][fields][0]=nombres&populate[autores][fields][1]=primer_apellido&populate[autores][fields][2]=segundo_apellido&populate[autores][fields][3]=grado_academico`, authConfig)
}

/**
 * Obtiene la semblanza de un autor por su ID de documento
 * @param {number} documentId - ID del documento del autor
 * @returns {Promise} Respuesta con los datos mínimos de la semblanza del autor
*/
export async function getSemblanzaAuthor(documentId){
  const authConfig = strapiAuthService.getAuthConfig()
  //return http.get(`${getStrapiBase()}/academicos/${documentId}?fields[0]=perfil&fields[1]=entidad_academica&populate[nombre_propio][populate][fotografia][fields][0]=url&populate[nombre_propio][populate][fotografia][fields][1]=mime&populate[nombre_propio][populate][fotografia][fields][2]=width&populate[nombre_propio][populate][fotografia][fields][3]=height&populate[nombre_propio][populate][fotografia][fields][4]=alternativeText&populate[nombre_propio][populate][fotografia][fields][5]=caption&populate[nombre_propio][fields][]`, authConfig)
  return http.get(`${getStrapiBase()}/autores/${documentId}?fields[0]=perfil&populate[fotografia][fields][0]=url&populate[fotografia][fields][1]=mime&populate[fotografia][fields][2]=width&populate[fotografia][fields][3]=height&populate[fotografia][fields][4]=alternativeText&populate[fotografia][fields][5]=caption&populate[entidad_academica][fields][0]=nombre`, authConfig)
}

/**
 * Obtiene las categorías de los ítems
 * @returns {Promise} Respuesta con las categorías
*/
export async function getCategories(){
  const authConfig = strapiAuthService.getAuthConfig()
  return http.get(`${getStrapiBase()}/categorias`, authConfig)
}
