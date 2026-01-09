/**
 * Representa un DTO (Data Transfer Object) para los datos de resumen de una categoría,
 * Este objeto se utiliza para estructurar los datos necesarios para su presentación en lista corta.
 *
 * @class
 * @param {Object} params - Parámetros para inicializar el DTO.
 * @param {string|number} params.id - ID de la categoría.
 * @param {string} params.name - Nombre de la categoría.
 * @param {string} params.slug - Slug de la categoría.
 * @param {string} params.thumbnailSource - Fuente de la miniatura de la categoría.
 *
 * @example
 * const categoryResume = new CategoryResumeDto({
 *   id: 1,
 *   name: 'Ciencia',
 *   slug: 'ciencia',
 *   thumbnailSource: 'http://example.com/thumbnail.jpg'
 * });
 * console.log(categoryResume);
 * // Resultado:
 * // {
 * //   id: 1,
 * //   name: 'Ciencia',
 * //   slug: 'ciencia',
 * //   thumbnailSource: 'http://example.com/thumbnail.jpg'
 * // }
 */
export class CategoryResumeDto { 
  constructor({ id, name, slug, thumbnailSource, resourceTemplateSource }) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.thumbnailSource = thumbnailSource;
    this.resourceTemplateSource = resourceTemplateSource;
  }
}
