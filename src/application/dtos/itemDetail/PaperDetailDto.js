/**
 * Representa un DTO (Data Transfer Object) para los datos de detalle de un item de tipo "Artículo de revista",
 * Este objeto se utiliza para estructurar los datos
 * necesarios para su presentación individual detallada
 *
 * @class
 */
export class PaperDetailDto {
  constructor({ id, source, thumbnailSource, title, abstract, authors, subject, dateIssued, volume, issue, bibliographicCitation }) {
    this.id = id;
    this.source = source;
    this.thumbnailSource = thumbnailSource;
    this.title = title;
    this.abstract = abstract;
    this.authors = authors; // Array of author names or AuthorItemDto objects
    this.subject = subject;
    this.dateIssued = dateIssued;
    this.volume = volume;
    this.issue = issue;
    this.bibliographicCitation = bibliographicCitation;
  }
}
