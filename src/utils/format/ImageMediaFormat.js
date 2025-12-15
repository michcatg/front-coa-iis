import { getStrapiBase } from '@/api/strapiService.js'
export function formatImageMedia(media) {
  if (!media) return null;
  const baseUrl = getStrapiBase().replace(/api\/?$/, '').replace(/\/$/, '');
  return {
    id: media.documentId,
    url: `${baseUrl}${media.url}`,
    mime: media.mime,
    alternativeText: media.alternativeText || '',
    caption: media.caption || '',
    width: media.width || 0,
    height: media.height || 0
  };
}
