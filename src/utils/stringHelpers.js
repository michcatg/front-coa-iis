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
