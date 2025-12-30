/**
 * Genera un string de filtros para categorías en formato compatible con Strapi.
 *
 * @function
 * @param {Array<number|string>} categoryIds - Un array de IDs de categorías que se usarán para generar los filtros.
 * @returns {string} - Un string con los filtros formateados para Strapi.
 *
 * @example
 * // Ejemplo de uso:
 * const filters = getFilterCategories([1, 2, 3]);
 * console.log(filters);
 * // Resultado: "filters[$or][0][categoria][documentId][$eq]=1&filters[$or][1][categoria][documentId][$eq]=2&filters[$or][2][categoria][documentId][$eq]=3"
 */
export function getFilterCategories(categoryIds) {
  return categoryIds
    .map((id, idx) => `filters[$or][${idx}][categoria][documentId][$eq]=${id}`)
    .join('&')
}

export function getFieldsStringQueryFromArray(fieldsArray){
  let string = ''
  fieldsArray.forEach((value, key) => {
    console.log('eb ek fireach ', value, key)
    string = `${string}${(key!=0)? '&' : ''}fields[${key}]=${value}`
  })
  return string
}

export function getLimitQuery( limit ) {
  return ''
}

export function getPageQuery ( page ) {
  return ''
}

export function getQueryStringWithOptions(options) {
  return `${getFieldsStringQueryFromArray(options.fields)}
    ${getLimitQuery(options.limit)}
    ${getPageQuery(options.page)}`
}
