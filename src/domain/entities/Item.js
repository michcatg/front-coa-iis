export class Item { 
  constructor({ id, source, thumbnailSource, title, createdAt, description, authors }) {
    this.id = id;
    this.source = source;
    this.thumbnailSource = thumbnailSource;
    this.title = title;
    this.createdAt = createdAt;
    this.description = description;
  }
}
