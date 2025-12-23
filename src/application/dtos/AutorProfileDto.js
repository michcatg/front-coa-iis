/**
 * **
 * Representa un DTO (Data Transfer Object) para los datos del perfil (semblanza) de un autor,
 * Este objeto se utiliza para estructurar los datos necesarios para su presentación dentro de la definición de semblanzas.
 *
 * @class
 * @param {Object} params - Parámetros para inicializar el DTO.
 * @param {string|number} params.id - ID del autor.
 * @param {string} params.nombres - Nombres del autor.
 * @param {string} params.primerApellido - Primer apellido del autor.
 * @param {string} params.segundoApellido - Segundo apellido del autor.
 * @param {string} params.gradoAcademico - Grado académico del autor.
 * @param {Array} params.semblanza - Semblanza del autor.
 * @param {string} params.institute - Institución académica del autor.
 * @param {Object} params.image - Información de la fotografía del autor.
 * @example
 * const autorProfile = new AutorProfileDto({
 *   id: 1,
 *   nombres: 'Juan',
 *   primerApellido: 'Pérez',
 *   segundoApellido: 'Gómez',
 *   gradoAcademico: 'Dr',
 *   semblanza: ['Investigador en IA', 'Profesor en la Universidad X'],
 *   institute: 'Universidad X',
 *   image: { url: 'http://example.com/image.jpg', alt: 'Foto de Juan Pérez' }
 * });
 * console.log(autorProfile);
 * // Resultado:
 * // {
 * //   id: 1,
 * //   nombres: 'Juan',
 * //   primerApellido: 'Pérez',
 * //   segundoApellido: 'Gómez',
 * //   gradoAcademico: 'Dr.',
 * //   semblanza: ['Investigador en IA', 'Profesor en la Universidad X'],
 * //   institute: 'Universidad X',
 * //   image: { url: 'http://example.com/image.jpg', alt: 'Foto de Juan Pérez' }
 * // }
 */
export class AutorProfileDto {
  constructor({ id, nombres, primerApellido, segundoApellido, gradoAcademico, semblanza, institute, image }) {
    this.id = id;
    this.nombres = nombres;
    this.primerApellido = primerApellido;
    this.segundoApellido = segundoApellido;
    this.gradoAcademico = gradoAcademico;
    this.semblanza = semblanza;
    this.institute = institute;
    this.image = image;
  }
}
