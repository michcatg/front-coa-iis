import { formatImageMedia } from '@/utils/format/ImageMediaFormat';

export function formatSimpleAuthor(author) {
  if (!author) return null;
  return {
    id: author.documentId,
    gradoAcademico: author.grado_academico,
    name: author.nombre_propio.nombres,
    apellidos: author.nombre_propio.apellidos
  };
}

export function formatSemblanzaAuthor(author) {
  if (!author) return null;
  return {
    institute: author.entidad_academica,
    semblanza: author.perfil,
    image: formatImageMedia(author.nombre_propio.fotografia)
  };
}
