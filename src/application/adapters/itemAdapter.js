import { ItemResumeDto } from "@/application/dtos/ItemResumeDto";
import { ItemStrapiDto } from "@/application/dtos/ItemStrapiDto";
import { BookDetailDto } from '@/application/dtos/itemDetail/BookDetailDto';
import { PaperDetailDto } from '@/application/dtos/itemDetail/PaperDetailDto';

/**
 * Convierte los datos de la API de Omekas en un objeto `ItemResumeDto`.
 *
 * @function
 * @param {Object} apiData - Datos del ítem obtenidos de la API.
 * @param {string} apiData["@id"] - Identificador único del ítem.
 * @param {Object} [apiData["thumbnail_display_urls"]] - URLs de las miniaturas del ítem.
 * @param {string} [apiData["thumbnail_display_urls"]["medium"]] - URL de la miniatura en tamaño medio.
 * @param {Array<Object>} apiData["dcterms:title"] - Título del ítem.
 * @param {string} apiData["dcterms:title"][0]["@value"] - Valor del título.
 * @param {Array<Object>} [apiData["dcterms:created"]] - Fecha de creación del ítem.
 * @param {string} [apiData["dcterms:created"][0]["@value"]] - Valor de la fecha de creación.
 * @param {Array<Object>} [apiData["dcterms:description"]] - Descripción del ítem.
 * @param {string} [apiData["dcterms:description"][0]["@value"]] - Valor de la descripción.
 * @param {Array<Object>} [apiData["dcterms:abstract"]] - Resumen del ítem.
 * @param {string} [apiData["dcterms:abstract"][0]["@value"]] - Valor del resumen.
 * @param {Array<Object>} [apiData["dcterms:creator"]] - Autores del ítem.
 * @param {string} [apiData["dcterms:creator"][0]["@value"]] - Nombre del autor.
 * @returns {ItemResumeDto} - Una instancia de `ItemResumeDto` con los datos del ítem.
 *
 * @example
 * const itemResume = toItemResumeDto(apiData);
 * console.log(itemResume);
 */
export function toItemResumeDto(apiData) {
  return new ItemResumeDto({
    id: apiData["o:id"],
    source: apiData["@id"],
    thumbnailSource: apiData["thumbnail_display_urls"] ? apiData["thumbnail_display_urls"]["medium"] : undefined,
    title: apiData['dcterms:title'][0]['@value'],
    createdAt: apiData['dcterms:created'] ? new Date(apiData['dcterms:created'][0]['@value']).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }) : '',
    description: apiData['dcterms:description'] ?
      apiData['dcterms:description'][0]['@value'] : apiData['dcterms:abstract'] ?
      apiData['dcterms:abstract'][0]['@value'] : '',
    authors: apiData['dcterms:creator'] ? apiData['dcterms:creator'].map(creator => creator['@value']) : [],
  });
}

/**
 * Convierte los datos de la API de Strapi en un objeto `ItemStrapiDto`.
 *
 * @function
 * @param {Object} apiData - Datos del ítem obtenidos de la API.
 * @param {string|number} apiData.documentId - Identificador único del ítem en Strapi.
 * @param {string} apiData.source - Fuente del ítem.
 * @returns {ItemStrapiDto} - Una instancia de `ItemStrapiDto` con los datos del ítem.
 *
 * @example
 * const itemStrapi = toItemStrapiDto(apiData);
 * console.log(itemStrapi);
 */
export function toItemStrapiDto(apiData) {
  return new ItemStrapiDto({
    id: apiData.documentId,
    source: apiData.source,
  });
}


import { OmekasItemDetailDto } from '@/application/dtos/OmekasItemDetailDto.js';
import { omekasDataToOmekasPropertyValueDto } from '@/application/adapters/omekasPropertyValueAdapter.js';
export function omekasDataToItemDetailDto(apiData) {
  const propertiesValues = Object.keys(apiData)
    .filter(key => key.startsWith('dcterms:') || key.startsWith('bibo:'))
    .map(key => {
      return apiData[key].map(valueData => omekasDataToOmekasPropertyValueDto(valueData));
    });

  return new OmekasItemDetailDto({
    id: apiData["o:id"],
    source: apiData["@id"],
    thumbnailSource: apiData["thumbnail_display_urls"] ? apiData["thumbnail_display_urls"]["medium"] : undefined,
    mediaSources: apiData["o:media"] ? apiData["o:media"].map(media => media["@id"]) : [],
    propertiesValues: propertiesValues,
  });
}

export function omekasResourceTemplateItemIdToInt(apiData) {
  return apiData["o:resource_template"]?.["o:id"] || null;
}
