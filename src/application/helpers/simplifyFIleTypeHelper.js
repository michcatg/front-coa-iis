export function getFileTypeWithMediaType(mediaType) {
  switch (mediaType) {
    case 'image/jpeg':
    case 'image/png':
    case 'image/gif':
    case 'image/webp':
    case 'image/svg+xml':
      return 'image';
    case 'application/pdf':
      return 'pdf';
    default:
      return null;
  }
}
