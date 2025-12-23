/**
 * Este DTO permite definir todos los parámetros de búsqueda que se pueden realizar en la vista de exploración de ítems.
 * Estos parámetros son propios de cómo recibe los datos la ruta de exploración de ítems.
 * Incluye:
 * - fullText: Búsqueda de texto completo.
 * - property: Array de objetos que representan las búsquedas por propiedad, cada uno con:
 *   - term: El término o propiedad a buscar.
 *   - operand: El operador de búsqueda (e.g., 'eq', 'ne', 'ex', etc.).
 *   - value: El valor a buscar.
 *   - logicConnector: Conector lógico para combinar múltiples búsquedas (e.g., 'AND', 'OR').
 * - categories: Array de categorías para filtrar los resultados.
 */
export class ExploreSearchParamsDto {
  constructor({ fullText = '', property = [], categories = [] } = {}) {
    this.fullText = fullText;
    this.property = property;
    this.categories = categories;
  }
}
