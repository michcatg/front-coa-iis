import { ResourceTemplateStrapiDto } from "@/application/dtos/ResourceTemplateStrapiDto";
// TODO: Descomentar para la mejora del advanced search form que depende de los templates
/**
 * Convierte los datos de la API en un objeto `MediaImageDto`.
 *
 * @function
 * @param {Object} apiData - Datos de la imagen obtenidos de la API.
 * @param {string|number} apiData.documentId - Identificador único de la imagen.
 * @param {string} apiData.url - URL relativa de la imagen.
 * @param {string} apiData.mime - Tipo MIME de la imagen (por ejemplo, `image/jpeg`).
 * @param {string} [apiData.alternativeText] - Texto alternativo de la imagen.
 * @param {string} [apiData.caption] - Leyenda de la imagen.
 * @param {number} [apiData.width=0] - Ancho de la imagen en píxeles.
 * @param {number} [apiData.height=0] - Alto de la imagen en píxeles.
 * @returns {MediaImageDto} - Una instancia de `MediaImageDto` con los datos de la imagen.
 *
 * @example
 * const mediaImage = toMediaImageDto(apiData);
 * console.log(mediaImage);
 */
/*
export function toResourceTemplateStrapiDto(apiData) {
  return new ResourceTemplateStrapiDto({
    id: apiData.documentId,
    source: apiData.source,
    categories: apiData.categorias ? apiData.categorias.map(cat => cat.documentId) : [],
  });
}
*/
