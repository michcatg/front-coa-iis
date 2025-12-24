/**
 * Representa un DTO (Data Transfer Object) para los datos de detalle de un item de tipo "Libro",
 * Este objeto se utiliza para estructurar los datos
 * necesarios para su presentación individual detallada
 *
 * @class
 */
export class BookDetailDto {
  constructor({ id, source, thumbnailSource, title, description, publisher, creator, spatialCoverage, temporalCoverage, dateCreated, identifier, language, subject, type, license, bibliographicCitation, rights }) {
    this.id = id;
    this.source = source;
    this.thumbnailSource = thumbnailSource;
    this.title = title;
    this.description = description;
    this.publisher = publisher;
    this.creator = creator;
    this.spatialCoverage = spatialCoverage;
    this.temporalCoverage = temporalCoverage;
    this.dateCreated = dateCreated;
    this.identifier = identifier;
    this.language = language;
    this.subject = subject;
    this.type = type;
    this.license = license;
    this.bibliographicCitation = bibliographicCitation;
    this.rights = rights;
  }
}
