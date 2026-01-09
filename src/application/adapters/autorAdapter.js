import { Autor } from '@/domain/entities/Autor'
import { AutorProfileDto } from '@/application/dtos/AutorProfileDto'
import { AutorItemDto } from '@/application/dtos/AutorItemDto'
import { AutorGeneralesDto } from '@/application/dtos/AutorGeneralesDto'
import { MediaImageDto } from '@/application/dtos/MediaImageDto'
import { toMediaImageDto } from '@/application/adapters/mediaAdapter'

/*
export function toAutorEntity(apiData) {
  return new Autor({
    id: apiData.id,
    nombres: apiData.nombres,
    primerApellido: apiData.primer_apellido || apiData.primerApellido,
    segundoApellido: apiData.segundo_apellido || apiData.segundoApellido,
  });
}
*/
/**
 * Convierte los datos de la API de Strapi en un objeto `AutorItemDto`.
 *
 * @function
 * @param {Object} apiData - Datos del autor obtenidos de la API.
 * @param {string|number} apiData.documentId - ID del autor (puede ser `documentId` o `id`).
 * @param {string} apiData.grado_academico - Grado académico del autor.
 * @param {string} apiData.nombres - Nombres del autor.
 * @param {string} [apiData.primer_apellido] - Primer apellido del autor.
 * @param {string} [apiData.segundo_apellido] - Segundo apellido del autor.
 * @returns {AutorItemDto} - Una instancia de `AutorItemDto` con los datos del autor.
 *
 * @example
 * const autorItemDto = toAutorItemDto(apiData);
 * console.log(autorItemDto);
 */
export function toAutorItemDto(apiData) {
  return new AutorItemDto({
    id: apiData.documentId || apiData.id,
    gradoAcademico: apiData.grado_academico || apiData.gradoAcademico,
    nombres: apiData.nombres,
    primerApellido: apiData.primer_apellido || apiData.primerApellido,
    segundoApellido: apiData.segundo_apellido || apiData.segundoApellido,
  });
}


/**
 * Convierte los datos de la API de Strapi en un objeto `AutorProfileDto`.
 *
 * @function
 * @param {Object} apiData - Datos del autor obtenidos de la API.
 * @param {string|number} apiData.id - ID del autor.
 * @param {string} apiData.grado_academico - Grado académico del autor.
 * @param {string} apiData.nombres - Nombres del autor.
 * @param {string} [apiData.primer_apellido] - Primer apellido del autor.
 * @param {string} [apiData.segundo_apellido] - Segundo apellido del autor.
 * @param {Array} [apiData.perfil] - Semblanza del autor.
 * @param {Object} [apiData.entidad_academica] - Entidad académica del autor.
 * @param {string} [apiData.entidad_academica.nombre] - Nombre de la entidad académica.
 * @param {Object} [apiData.fotografia] - Información de la fotografía del autor.
 * @returns {AutorProfileDto} - Una instancia de `AutorProfileDto` con los datos del autor.
 *
 * @example
 * const autorProfileDto = toAutorProfileDto(apiData);
 * console.log(autorProfileDto);
 */
export function toAutorProfileDto(apiData) {
  return new AutorProfileDto({
    id: apiData.id,
    gradoAcademico: apiData.grado_academico,
    nombres: apiData.nombres,
    primerApellido: apiData.primer_apellido || apiData.primerApellido,
    segundoApellido: apiData.segundo_apellido || apiData.segundoApellido,
    gradoAcademico: apiData.grado_academico || apiData.gradoAcademico,
    semblanza: Array.isArray(apiData.perfil) ? apiData.perfil : [],
    institute: apiData.entidad_academica?.nombre,
    image: apiData.fotografia ? toMediaImageDto(apiData.fotografia) : new MediaImageDto({ id: null, url: '', mime: '' })
  });
}

/**
 * Convierte un objeto `AutorItemDto` en una entidad `Autor`.
 *
 * @function
 * @param {AutorItemDto} dto - Objeto `AutorItemDto` que contiene los datos del autor.
 * @returns {Autor} - Una instancia de la entidad `Autor` con los datos del autor.
 *
 * @example
 * const autorEntity = autorItemDtoToEntity(autorItemDto);
 * console.log(autorEntity);
 */
export function autorItemDtoToEntity(dto) {
  return new Autor({
    id: dto.id,
    nombres: dto.nombres,
    primerApellido: dto.primerApellido,
    segundoApellido: dto.segundoApellido,
  });
}

export function autorStrapitoAutorGeneralesDto (apiData) {
  return new AutorGeneralesDto({
    id: apiData.id,
    nombres: apiData.nombres,
    primerApellido: apiData.primer_apellido,
    segundoApellido: apiData.segundo_apellido,
    gradoAcademico: apiData.grado_academico,
    correoElectronico: apiData.correo_electronico,
  })
}
