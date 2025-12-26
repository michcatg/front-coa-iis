import { getStrapiBase } from '@/api/strapiService.js'
import { MediaImageDto } from '@/application/dtos/MediaImageDto.js'

/**
 * Convierte los datos de la API de Strapi en un objeto `MediaImageDto`.
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
export function toMediaImageDto(apiData) {
  return new MediaImageDto({
    id: apiData.documentId,
    url: `${getStrapiBase().replace(/api\/?$/, '').replace(/\/$/, '')}${apiData.url}`,
    mime: apiData.mime,
    alternativeText: apiData.alternativeText || '',
    caption: apiData.caption || '',
    width: apiData.width || 0,
    height: apiData.height || 0
  });
}

import { OmekasMediaDto } from '@/application/dtos/OmekasMediaDto.js';
export function omekasDataToItemMediaDto(apiData) {
  return new OmekasMediaDto({
    id: apiData["o:id"],
    url: apiData["o:original_url"],
    mime: apiData["o:media_type"],
    size: apiData["o:size"],
    title: apiData["o:title"] || '',
    alternativeText: apiData["o:alt_text"] || '',
    isPublic: apiData["o:is_public"] || false,
    thumbnailUrls: {
      square: apiData["o:thumbnail_urls"]["square"] || '',
      medium: apiData["o:thumbnail_urls"]["medium"] || '',
      large: apiData["o:thumbnail_urls"]["large"] || ''
    }
  });
}
