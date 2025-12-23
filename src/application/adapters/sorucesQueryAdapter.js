import { PropertySearchQueryDto } from '@/application/dtos/PropertySearchQueryDto.js'

/**
 * Convierte los datos de una propiedad de búsqueda en un objeto `PropertySearchQueryDto`
 * (Es el formato utilizado para los inputs del formulario de búsqueda avanzada).
 *
 * @function
 * @param {Object} propData - Datos de la propiedad de búsqueda obtenidos de la API o del formulario.
 * @param {string} [propData.property=''] - Término de la propiedad de búsqueda.
 * @param {string} [propData.type=''] - Operador lógico o tipo de comparación (por ejemplo, `eq`, `in`).
 * @param {string} [propData.text=''] - Valor asociado a la propiedad de búsqueda.
 * @param {string} [propData.joiner=''] - Conector lógico (por ejemplo, `and`, `or`).
 * @returns {PropertySearchQueryDto} - Una instancia de `PropertySearchQueryDto` con los datos de la propiedad de búsqueda.
 *
 * @example
 * const searchQueryDto = searchPropertyToSearchQueryDto({
 *   property: 'title',
 *   type: 'eq',
 *   text: 'example',
 *   joiner: 'and'
 * });
 * console.log(searchQueryDto);
 */
export function searchPropertyToSearchQueryDto(propData) {
  return new PropertySearchQueryDto({
    term: propData.property || '',
    operand: propData.type || '',
    value: propData.text || '',
    logicConnector: propData.joiner || ''
  });
}
