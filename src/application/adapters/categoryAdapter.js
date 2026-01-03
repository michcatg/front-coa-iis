import { CategoryResumeDto } from "@/application/dtos/CategoryResumeDto";
import { CategorySelectedDto } from "@/application/dtos/CategorySelectedDto";
import { MediaImageDto } from '@/application/dtos/MediaImageDto';
import { toMediaImageDto } from "./mediaAdapter";

/**
 * Convierte los datos de la API de Strapi en un objeto `CategoryResumeDto`.
 *
 * @function
 * @param {Object} apiData - Datos de la categoría obtenidos de la API.
 * @param {string|number} apiData.documentId - ID de la categoría (puede ser `documentId` o `id`).
 * @param {string} apiData.nombre - Nombre de la categoría.
 * @param {string} apiData.slug - Slug de la categoría.
 * @returns {CategoryResumeDto} - Una instancia de `CategoryResumeDto` con los datos de la categoría.
 *
 * @example
 * const categoryResumeDto = toCategoryResumeDto(apiData);
 * console.log(categoryResumeDto);
 */
export function toCategoryResumeDto(apiData) {
  return new CategoryResumeDto({
    id: apiData.documentId || apiData.id,
    name: apiData.nombre,
    slug: apiData.slug,
    // TODO: Manejar el thumbnailSource
    thumbnailSource: apiData.imagen ?
      toMediaImageDto(apiData.imagen) :
      new MediaImageDto({ id: null, url: null, mime: null, width: null, height: null, alternativeText: null, caption: null }),
  });
}

/**
 * Convierte los datos de la API de Strapi en un objeto `CategorySelectedDto`.
 *
 * @function
 * @param {Object} apiData - Datos de la categoría obtenidos de la API.
 * @param {string|number} apiData.documentId - ID de la categoría (puede ser `documentId` o `id`).
 * @param {string} apiData.nombre - Nombre de la categoría.
 * @param {boolean} apiData.isSelected - Indica si la categoría está seleccionada.
 * @returns {CategorySelectedDto} - Una instancia de `CategorySelectedDto` con los datos de la categoría.
 *
 * @example
 * const categorySelectedDto = toCategorySelectedDto(apiData);
 * console.log(categorySelectedDto);
 */
export function toCategorySelectedDto(apiData) {
  return new CategorySelectedDto({
    id: apiData.documentId || apiData.id,
    name: apiData.nombre,
    isSelected: apiData.isSelected,
  });
}
