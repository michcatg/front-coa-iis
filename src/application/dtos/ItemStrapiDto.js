/*
  * Representa un DTO (Data Transfer Object) para los datos de un ítem proveniente de Strapi,
  * Este objeto se utiliza para estructurar los datos necesarios para su manipulación y asociación con ítems de omekas, representados en otros DTOs de items con información más completa.
  *
  * @class
  * @param {Object} params - Parámetros para inicializar el DTO.
  * @param {string|number} params.id - ID del ítem.
  * @param {string} params.source - Fuente o URL del ítem.
  *
  * @example
  * const itemStrapi = new ItemStrapiDto({
  *   id: 1,
  *   source: 'http://example.com/item.jpg'
  * });
  * console.log(itemStrapi);
  * // Resultado:
  * // {
  * //   id: 1,
  * //   source: 'http://example.com/item.jpg'
  * // }
  */
export class ItemStrapiDto { 
  constructor({ id, source }) {
    this.id = id;
    this.source = source;
  }
}
