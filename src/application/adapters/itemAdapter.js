import { ItemResumeDto } from "@/application/dtos/ItemResumeDto";
import { ItemStrapiDto } from "@/application/dtos/ItemStrapiDto";

export function toItemResumeDto(apiData) {
  return new ItemResumeDto({
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

export function toItemStrapiDto(apiData) {
  return new ItemStrapiDto({
    id: apiData.documentId,
    source: apiData.source,
  });
}
