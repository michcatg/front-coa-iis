/**
 * Constantes que definen los operadores de búsqueda disponibles en OmekaS.
 * Este no corresponde a un resource type de OmekaS.
 * Cada operador incluye su valor, una descripción legible y el número de operandos que requiere.
 *
 * @constant {Array<Object>} searchOperators - Lista de operadores de búsqueda.
 * @property {string} value - Valor del operador utilizado en las consultas.
 * @property {string} text - Descripción legible del operador.
 * @property {number} operands - Número de operandos que el operador requiere (0 o 1).
 */
export const searchOperators = [
  { value: "eq", text: "es exactamente", operands: 1 },
  { value: "neq", text: "no es exactamente", operands: 1 },
  { value: "in", text: "contiene", operands: 1 },
  { value: "nin", text: "no contiene", operands: 1 },
  { value: "sw", text: "comienza con", operands: 1 },
  { value: "nsw", text: "no comienza con", operands: 1 },
  { value: "ew", text: "termina con", operands: 1 },
  { value: "new", text: "no termina con", operands: 1 },
  { value: "res", text: "es recurso con ID", operands: 1 },
  { value: "nres", text: "no es recurso con ID", operands: 1 },
  { value: "ex", text: "tiene algún valor", operands: 0 },
  { value: "nex", text: "no tiene valores", operands: 0 }
];
