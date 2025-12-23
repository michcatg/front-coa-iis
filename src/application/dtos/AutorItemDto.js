/**
 * **
 * Representa un DTO (Data Transfer Object) para los datos de resumen de un autor,
 * Este objeto se utiliza para estructurar los datos
 * necesarios para su presentación dentro de la definición de un Item.
 *
 * @class
 * @param {Object} params - Parámetros para inicializar el DTO.
 * @param {string|number} params.id - ID del autor.
 * @param {string} params.gradoAcademico - Grado académico del autor.
 * @param {string} params.nombres - Nombres del autor.
 * @param {string} params.primerApellido - Primer apellido del autor.
 * @param {string} params.segundoApellido - Segundo apellido del autor.
 *
 * @example
 * const autorItem = new AutorItemDto({
 *   id: 1,
 *   gradoAcademico: 'Dr',
 *   nombres: 'Juan',
 *   primerApellido: 'Pérez',
 *   segundoApellido: 'Gómez'
 * });
 * console.log(autorItem);
 * // Resultado:
 * // {
 * //   id: 1,
 * //   gradoAcademico: 'Dr',
 * //   nombres: 'Juan',
 * //   primerApellido: 'Pérez',
 * //   segundoApellido: 'Gómez'
 * // }
 */
export class AutorItemDto {
  constructor({ id, gradoAcademico, nombres, primerApellido, segundoApellido }) {
    this.id = id;
    this.gradoAcademico = gradoAcademico;
    this.nombres = nombres;
    this.primerApellido = primerApellido;
    this.segundoApellido = segundoApellido;
  }
}
