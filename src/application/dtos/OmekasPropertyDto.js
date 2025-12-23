/**
 * Representa un DTO (Data Transfer Object) para los datos de una propiedad de Omekas,
 * Este objeto se utiliza para estructurar los datos necesarios para su manipulación y presentación.
 *
 * @class
 * @param {Object} params - Parámetros para inicializar el DTO.
 * @param {string|number} params.id - ID de la propiedad.
 * @param {string} params.name - Nombre de la propiedad.
 * @param {string} params.term - Término asociado a la propiedad.
 */
export class OmekasPropertyDto { 
  constructor({ id, name, term }) {
    this.id = id;
    this.name = name;
    this.term = term;
  }
}
