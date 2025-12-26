/**
 * Representa un DTO (Data Transfer Object) para los datos de detalle de un media de Omekas,
 * Este objeto se utiliza para estructurar los datos
 * necesarios para su presentación individual
 *
 * @class
 */
export class OmekasMediaDto {
  constructor({ id, url, mime, size, title, alternativeText, isPublic, thumbnailUrls }) {
    this.id = id;
    this.url = url;
    this.mime = mime;
    this.size = size;
    this.title = title;
    this.alternativeText = alternativeText;
    this.isPublic = isPublic;
    this.thumbnailUrls = thumbnailUrls; // { square: string, medium: string, large: string }
  }
}
