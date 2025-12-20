import { CategoryResumeDto } from "@/application/dtos/CategoryResumeDto";

export function toCategoryResumeDto(apiData) {
  return new CategoryResumeDto({
    id: apiData.documentId || apiData.id,
    name: apiData.nombre,
    slug: apiData.slug,
    // TODO: Manejar el thumbnailSource
    thumbnailSource: "https://bulma.io/assets/images/placeholders/1280x960.png",
  });
}
