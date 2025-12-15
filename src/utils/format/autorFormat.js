import { formatImageMedia } from '@/utils/format/ImageMediaFormat';

export function formatSimpleAuthor(author) {
  if (!author) return null;
  return {
    id: author.documentId,
    gradoAcademico: author.grado_academico,
    nombres: author.nombre_propio.nombres,
    apellidos: author.nombre_propio.apellidos
  };
}

export function formatSemblanzaAuthor(author) {
  if (!author) return null;
  return {
    institute: author.entidad_academica,
    semblanza: Array.isArray(author.perfil[0].children)
      ? author.perfil[0].children.map(item => item.text) : [],
    image: formatImageMedia(author.nombre_propio.fotografia)
  };
}
