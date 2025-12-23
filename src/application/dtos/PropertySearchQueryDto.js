import { v4 as uuidv4 } from 'uuid';

/**
 * Representa un DTO (Data Transfer Object) para una propiedad de búsqueda avanzada.
 * Este objeto se utiliza para estructurar los datos de las propiedades en el formulario
 * de búsqueda avanzada y en las consultas relacionadas.
 *
 * @class
 * @param {Object} params - Parámetros para inicializar el DTO.
 * @param {string} params.term - Término de la propiedad de búsqueda (por ejemplo, el nombre de la propiedad).
 * @param {string} params.operand - Operador lógico o tipo de comparación (por ejemplo, `eq`, `in`).
 * @param {string} params.value - Valor asociado a la propiedad de búsqueda.
 * @param {string} [params.logicConnector='AND'] - Conector lógico entre propiedades (por ejemplo, `AND`, `OR`).
 * @param {string} [params.id=uuidv4()] - Identificador único para la propiedad de búsqueda.
 *
 * @example
 * const propertySearchQuery = new PropertySearchQueryDto({
 *   term: 'title',
 *   operand: 'eq',
 *   value: 'example',
 *   logicConnector: 'AND'
 * });
 * console.log(propertySearchQuery);
 * // Resultado:
 * // {
 * //   term: 'title',
 * //   operand: 'eq',
 * //   value: 'example',
 * //   logicConnector: 'AND',
 * //   id: 'some-unique-id'
 * // }
 */
export class PropertySearchQueryDto {
  constructor({  term, operand, value, logicConnector = 'AND', id = uuidv4() }) {
    this.term = term;
    this.operand = operand;
    this.value = value;
    this.logicConnector = logicConnector;
    this.id = id;
  }
}
