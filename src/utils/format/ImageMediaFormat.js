export function formatImageMedia(media) {
  if (!media) return null;
  return {
    id: media.documentId,
    url: media.url,
    mime: media.mime,
    alternativeText: media.alternativeText || '',
    caption: media.caption || '',
    width: media.width || 0,
    height: media.height || 0
  };
}
