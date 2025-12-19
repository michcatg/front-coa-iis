// TODO: REMOVER UNA VEZ SE COMPRUEBE LOS ADAPTERS
import { formatImageMedia } from '@/utils/format/ImageMediaFormat';

// TODO: Eliinar esta función porque se usa el autorAdapter
export function formatSimpleAuthor(author) {
  if (!author) return null;
  return {
    id: author.documentId,
    gradoAcademico: author.grado_academico,
    nombres: author.nombres,
    apellidos: author.primer_apellido + (author.segundo_apellido ? ' ' + author.segundo_apellido : ''),
  };
}

// TODO: Eliminar esta función porque se usa el autorAdapter
export function formatSemblanzaAuthor(author) {
  if (!author) return null;
  return {
    institute: author.entidad_academica.nombre,
    semblanza: Array.isArray(author.perfil) ? author.perfil : [],
    image: formatImageMedia(author.fotografia),
  };
}
