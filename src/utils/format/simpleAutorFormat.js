export function formatSimpleAuthors(author) {
  if (!author) return null;
  return {
    id: author.documentId,
    gradoAcademico: author.grado_academico,
    name: author.nombre_propio.nombres,
    apellidos: author.nombre_propio.apellidos
  };
}
