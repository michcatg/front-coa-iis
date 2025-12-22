export class ResourceTemplateStrapiDto { 
  constructor({ id, source, categories = [] }) {
    this.id = id;
    this.source = source;
    this.categories = categories;
  }
}
