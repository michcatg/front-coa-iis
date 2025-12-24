/**
 * Representa un DTO (Data Transfer Object) para los datos de detalle de un item de Omekas,
 * Este objeto se utiliza para estructurar los datos
 * necesarios para su presentación individual detallada
 *
 * @class
 */
export class OmekasItemDetailDto {
  constructor({ id, source, thumbnailSource, propertiesValues }) {
    this.id = id;
    this.source = source;
    this.thumbnailSource = thumbnailSource;
    this.propertiesValues = propertiesValues; // Array de OmekasPropertyValueDto
  }
}
