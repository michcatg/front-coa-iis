import { CategoryResumeDto } from "@/application/dtos/CategoryResumeDto";
import { CategorySelectedDto } from "@/application/dtos/CategorySelectedDto";

export function toCategoryResumeDto(apiData) {
  return new CategoryResumeDto({
    id: apiData.documentId || apiData.id,
    name: apiData.nombre,
    slug: apiData.slug,
    // TODO: Manejar el thumbnailSource
    thumbnailSource: "https://bulma.io/assets/images/placeholders/1280x960.png",
  });
}

export function toCategorySelectedDto(apiData) {
  return new CategorySelectedDto({
    id: apiData.documentId || apiData.id,
    name: apiData.nombre,
    isSelected: apiData.isSelected,
  });
}
