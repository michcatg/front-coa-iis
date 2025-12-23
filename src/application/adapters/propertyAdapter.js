import { OmekasPropertyDto } from '../dtos/OmekasPropertyDto.js'

/**
 * Convierte los datos de la API de Omekas en un objeto `OmekasPropertyDto`.
 *
 * @function
 * @param {Object} apiData - Datos de la propiedad obtenidos de la API.
 * @param {string|number} apiData['o:id'] - Identificador único de la propiedad.
 * @param {string} apiData['o:label'] - Nombre de la propiedad.
 * @param {string} apiData['o:term'] - Término de la propiedad.
 * @returns {OmekasPropertyDto} - Una instancia de `OmekasPropertyDto` con los datos de la propiedad.
 *
 * @example
 * const omekasProperty = toOmekasPropertyDto(apiData);
 * console.log(omekasProperty);
 */
export function toOmekasPropertyDto(apiData) {
  return new OmekasPropertyDto({
    id: apiData['o:id'],
    name: apiData['o:label'],
    term: apiData['o:term'],
  });
}
