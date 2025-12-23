/**
 * Representa un DTO (Data Transfer Object) para los datos mínimos de una categoría,
 * e identificar si está seleccionada o no.
 *
 * @class
 * @param {Object} params - Parámetros para inicializar el DTO.
 * @param {string|number} params.id - ID de la categoría.
 * @param {string} params.name - Nombre de la categoría.
 * @param {string} params.isSelected - Indica si la categoría está seleccionada.
 *
 * @example
 * const categorySelected = new CategorySelectedDto({
 *   id: 1,
 *   name: 'Ciencia',
 *   isSelected: true
 * });
 * console.log(categorySelected);
 * // Resultado:
 * // {
 * //   id: 1,
 * //   name: 'Ciencia',
 * //   isSelected: true
 * // }
 */
export class CategorySelectedDto {
  constructor({ id, name, isSelected = false }) {
    this.id = id;
    this.name = name;
    this.isSelected = isSelected;
  }
}
