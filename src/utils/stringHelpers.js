/**
 * Compara dos cadenas de texto ignorando espacios, mayúsculas, acentos y diéresis.
 * @param {string} str1
 * @param {string} str2
 * @returns {boolean}
 */
export function compareStrings(str1, str2) {
  const normalize = (str) =>
    str
      .normalize('NFD') // separa acentos y diéresis
      .replace(/[\u0300-\u036f]/g, '') // elimina acentos y diéresis
      .replace(/\s+/g, '') // elimina espacios
      .toLowerCase(); // ignora mayúsculas

  return normalize(str1) === normalize(str2);
}

/**
 * Convierte una cadena de texto a snake_case.
 * @param {*} str
 * @returns
 */
export function toSnakeCase (str) {
  return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_')
}

export function toCamelCase (str) {
  const normalized = str && str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const pascalCase = normalized && normalized.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join('')
  return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1)
}
