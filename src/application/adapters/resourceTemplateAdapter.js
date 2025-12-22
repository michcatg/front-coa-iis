import { ResourceTemplateStrapiDto } from "@/application/dtos/ResourceTemplateStrapiDto";
export function toResourceTemplateStrapiDto(apiData) {
  return new ResourceTemplateStrapiDto({
    id: apiData.documentId,
    source: apiData.source,
    categories: apiData.categorias ? apiData.categorias.map(cat => cat.documentId) : [],
  });
}
