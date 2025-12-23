/**
 * Este DTO permite definir todos los parámetros de búsqueda que se pueden realizar a Omekas desde la vista de exploración de ítems.
 * Estos parámetros dependen completamente de cómo Omekas recibe los datos para sus búsquedas.
 * Incluye:
 * - fullText: Búsqueda de texto completo.
 * - property: Array de objetos que representan las búsquedas por propiedad, cada uno con:
 *   - joiner: Conector lógico para combinar múltiples búsquedas (e.g., 'AND', 'OR').
 *   - type: El operador de búsqueda (e.g., 'eq', 'ne', 'ex', etc.).
 *   - property: Id del término o propiedad a buscar en OmekaS.
 *   - text: El valor a buscar.
 * - ids: Array de IDs específicas de ítems a buscar. (Pueden ser resultado de categorías u otros filtros asociados con content types de strapi).
 */
export class OmekasQueryParamsDto {
  constructor({ fulltext_search = '', property = [], ids = [] } = {}) {
    this.fulltext_search = fulltext_search;
    this.property = property;
    this.ids = ids;
  }
}
