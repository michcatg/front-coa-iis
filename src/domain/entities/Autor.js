export class Autor {
  constructor({ id, nombres, primerApellido, segundoApellido}) {
    this.id = id;
    this.nombres = nombres;
    this.primerApellido = primerApellido;
    this.segundoApellido = segundoApellido;
  }

  getNombreCompleto() {
    return `${this.nombres} ${this.primerApellido} ${this.segundoApellido || ''}`.trim();
  }
}
