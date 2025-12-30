import http from './httpClient'
import { STRAPI_URL } from './config'
import { strapiAuthService } from './strapiAuth'
import { getFilterCategories, getFieldsStringQueryFromArray } from './strapiHelpers'

/**
 * Obtiene la URL base para las solicitudes a Strapi.
 *
 * @function
 * @returns {string} - La URL base configurada para Strapi.
 */
export function getStrapiBase(){
  return STRAPI_URL
}

/**
 * Obtiene los autores de un recurso digital por su fuente.
 *
 * @async
 * @function
 * @param {string} source - Fuente del recurso digital.
 * @returns {Promise<Object>} - Una promesa que resuelve con los datos mínimos de los autores.
 *
 * @example
 * const authors = await getAuthorsForItemSource('example-source');
 * console.log(authors);
 */
export async function getAuthorsForItemSource(source) {
  const authConfig = strapiAuthService.getAuthConfig()
  //return http.get(`${getStrapiBase()}/recursos-digitales?filters[source][$eq]=${source}&populate[autores][populate][nombre_propio][fields][0]=nombres&populate[autores][populate][nombre_propio][fields][1]=apellidos&fields[]&populate[autores][fields][0]=grado_academico`, authConfig)
  return http.get(`${getStrapiBase()}/recursos-digitales?filters[source][$eq]=${source}&populate[autores][fields][0]=nombres&populate[autores][fields][1]=primer_apellido&populate[autores][fields][2]=segundo_apellido&populate[autores][fields][3]=grado_academico`, authConfig)
}

/**
 * Obtiene la semblanza de un autor por su ID.
 *
 * @async
 * @function
 * @param {string|number} documentId - ID del autor.
 * @returns {Promise<Object>} - Una promesa que resuelve con la semblanza del autor.
 *
 * @example
 * const semblanza = await getSemblanzaAuthor(123);
 * console.log(semblanza);
 */
export async function getSemblanzaAuthor(documentId){
  const authConfig = strapiAuthService.getAuthConfig()
  //return http.get(`${getStrapiBase()}/academicos/${documentId}?fields[0]=perfil&fields[1]=entidad_academica&populate[nombre_propio][populate][fotografia][fields][0]=url&populate[nombre_propio][populate][fotografia][fields][1]=mime&populate[nombre_propio][populate][fotografia][fields][2]=width&populate[nombre_propio][populate][fotografia][fields][3]=height&populate[nombre_propio][populate][fotografia][fields][4]=alternativeText&populate[nombre_propio][populate][fotografia][fields][5]=caption&populate[nombre_propio][fields][]`, authConfig)
  return http.get(`${getStrapiBase()}/autores/${documentId}?fields[0]=perfil&populate[fotografia][fields][0]=url&populate[fotografia][fields][1]=mime&populate[fotografia][fields][2]=width&populate[fotografia][fields][3]=height&populate[fotografia][fields][4]=alternativeText&populate[fotografia][fields][5]=caption&populate[entidad_academica][fields][0]=nombre`, authConfig)
}

/**
 * Obtiene las categorías de los ítems.
 *
 * @async
 * @function
 * @returns {Promise<Object>} - Una promesa que resuelve con las categorías.
 *
 * @example
 * const categories = await getCategories();
 * console.log(categories);
 */
export async function getCategories(){
  const authConfig = strapiAuthService.getAuthConfig()
  return http.get(`${getStrapiBase()}/categorias`, authConfig)
}

/**
 * Obtiene los sources de los ítems que están catalogados bajo las categorías especificadas.
 *
 * @async
 * @function
 * @param {Array<string|number>} [categoryIds=null] - Document IDs de las categorías.
 * @returns {Promise<Object>} - Una promesa que resuelve con los sources de los ítems.
 *
 * @example
 * const sources = await getItemSourcesByCategories([1, 2, 3]);
 * console.log(sources);
 */
export async function getItemSourcesByCategories(categoryIds = null){
  const authConfig = strapiAuthService.getAuthConfig()
  const filterQuery = categoryIds && categoryIds.length > 0 ? getFilterCategories(categoryIds) : ''
  const url = `${getStrapiBase()}/recursos-digitales?${filterQuery}${filterQuery ? '&' : ''}fields[0]=source`
  return http.get(url, authConfig)
}

/**
 * Obtiene los templates de recursos digitales catalogados bajo las categorías especificadas.
 *
 * @async
 * @function
 * @param {Array<string|number>} [categoryIds=null] - Document IDs de las categorías.
 * @returns {Promise<Object>} - Una promesa que resuelve con los templates de recursos digitales.
 *
 * @example
 * const templates = await getResourceTemplatesSourceByCategories([1, 2, 3]);
 * console.log(templates);
 */
export async function getResourceTemplatesSourceByCategories(categoryIds = null){
  const authConfig = strapiAuthService.getAuthConfig()
  const filterQuery = categoryIds && categoryIds.length > 0 ? getFilterCategories(categoryIds) : ''
  const url = `${getStrapiBase()}/template-recurso-digitals?${filterQuery}${filterQuery ? '&' : ''}fields[0]=source&populate[categorias][fields][0]=documentId`
  return http.get(url, authConfig)
}


export async function getAuthorsGeneral( options = {} ) {
  const authConfig = strapiAuthService.getAuthConfig()
  console.log (options)
  let fields = getFieldsStringQueryFromArray(options.fields)
  console.log('fields: ', fields)
  const url = `${getStrapiBase()}/autores?${fields}`
  return http.get(url, authConfig)
}
