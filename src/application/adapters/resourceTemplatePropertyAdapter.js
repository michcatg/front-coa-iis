import { ResourceTemplatePropertyDto } from "@/application/dtos/ResourceTemplatePropertyDto";
export function omekasResourceTemplatePropertyToResourceTemplatePropertyDto(apiData) {
  return new ResourceTemplatePropertyDto({
    id: apiData['o:property']['o:id'],
    label: apiData['o:alternate_label'],
  });
}
