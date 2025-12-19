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
