export class AutorProfileDto {
  constructor({ id, nombres, primerApellido, segundoApellido, gradoAcademico, semblanza, institute, image }) {
    this.id = id;
    this.nombres = nombres;
    this.primerApellido = primerApellido;
    this.segundoApellido = segundoApellido;
    this.gradoAcademico = gradoAcademico;
    this.semblanza = semblanza;
    this.institute = institute;
    this.image = image;
  }
}
