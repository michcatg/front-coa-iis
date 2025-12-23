/**
 * Representa un DTO (Data Transfer Object) para los datos de resumen de un item,
 * Este objeto se utiliza para estructurar los datos
 * necesarios para su presentación dentro de un listado.
 *
 * @class
 * @param {Object} params - Parámetros para inicializar el DTO.
 * @param {string|number} params.id - ID del item.
 * @param {string} params.source - Fuente del item.
 * @param {string} params.thumbnailSource - Fuente de la miniatura del item.
 * @param {string} params.title - Título del item.
 * @param {Date} params.createdAt - Fecha de creación del item.
 * @param {string} params.description - Descripción del item.
 * @param {Array<string|AutorItemDto>} params.authors - Autores del item. El array puede estar conformado por nombres de autores o por un objeto AutorItemDto.
 *
 * @example
 * const item = new ItemResumeDto({
 *   id: 1,
 *   source: 'http://example.com',
 *   thumbnailSource: 'http://example.com/thumbnail.jpg',
 *   title: 'Ejemplo de Item',
 *   createdAt: new Date(),
 *   description: 'Descripción del item',
 *   authors: ['Juan Pérez', 'Ana Gómez']
 * });
 * console.log(item);
 * // Resultado:
 * // {
 * //   id: 1,
 * //   source: 'http://example.com',
 * //   thumbnailSource: 'http://example.com/thumbnail.jpg',
 * //   title: 'Ejemplo de Item',
 * //   createdAt: new Date(),
 * //   description: 'Descripción del item',
 * //   authors: ['Juan Pérez', 'Ana Gómez']
 * // }
 */
export class ItemResumeDto { 
  constructor({ id, source, thumbnailSource, title, createdAt, description, authors }) {
    this.id = id;
    this.source = source;
    this.thumbnailSource = thumbnailSource;
    this.title = title;
    this.createdAt = createdAt;
    this.description = description;
    this.authors = authors; // Array of author names
  }
}
