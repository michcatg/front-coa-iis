/*
  * Representa un DTO (Data Transfer Object) para los datos de una imagen multimedia,
  * Este objeto se utiliza para estructurar los datos necesarios para su manipulación y presentación.
  *
  * @class
  * @param {Object} params - Parámetros para inicializar el DTO.
  * @param {string|number} params.id - ID de la imagen.
  * @param {string} params.url - URL de la imagen.
  * @param {string} params.mime - Tipo MIME de la imagen.
  * @param {string} params.alternativeText - Texto alternativo de la imagen.
  * @param {string} params.caption - Leyenda de la imagen.
  * @param {number} params.width - Ancho de la imagen.
  * @param {number} params.height - Alto de la imagen.
  *
  * @example
  * const mediaImage = new MediaImageDto({
  *   id: 1,
  *   url: 'http://example.com/image.jpg',
  *   mime: 'image/jpeg',
  *   alternativeText: 'Descripción de la imagen',
  *   caption: 'Esta es una imagen de ejemplo',
  *   width: 800,
  *   height: 600
  * });
  * console.log(mediaImage);
  * // Resultado:
  * // {
  * //   id: 1,
  * //   url: 'http://example.com/image.jpg',
  * //   mime: 'image/jpeg',
  * //   alternativeText: 'Descripción de la imagen',
  * //   caption: 'Esta es una imagen de ejemplo',
  * //   width: 800,
  * //   height: 600
  * // }
  */
export class MediaImageDto {
  constructor({ id, url, mime, alternativeText, caption, width, height }) {
    this.id = id;
    this.url = url;
    this.mime = mime;
    this.alternativeText = alternativeText;
    this.caption = caption;
    this.width = width;
    this.height = height;
  }
}
