import { getStrapiBase } from '@/api/strapiService.js'
import { MediaImageDto } from '@/application/dtos/MediaImageDto.js'

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
