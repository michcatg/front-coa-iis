import { Autor } from '@/domain/entities/Autor'
import { AutorProfileDto } from '@/application/dtos/AutorProfileDto'
import { AutorItemDto } from '@/application/dtos/AutorItemDto'

export function toAutorEntity(apiData) {
  return new Autor({
    id: apiData.id,
    nombres: apiData.nombres,
    primerApellido: apiData.primer_apellido || apiData.primerApellido,
    segundoApellido: apiData.segundo_apellido || apiData.segundoApellido,
  });
}

export function toAutorItemDto(apiData) {
  return new AutorItemDto({
    id: apiData.documentId || apiData.id,
    gradoAcademico: apiData.grado_academico || apiData.gradoAcademico,
    nombres: apiData.nombres,
    primerApellido: apiData.primer_apellido || apiData.primerApellido,
    segundoApellido: apiData.segundo_apellido || apiData.segundoApellido,
  });
}

// TODO: Falta lo del media (fotografia)
export function toAutorProfileDto(apiData) {
  return new AutorProfileDto({
    id: apiData.id,
    nombres: apiData.nombres,
    primerApellido: apiData.primer_apellido || apiData.primerApellido,
    segundoApellido: apiData.segundo_apellido || apiData.segundoApellido,
    gradoAcademico: apiData.grado_academico || apiData.gradoAcademico,
    semblanza: apiData.semblanza,
  });  
}

/******DTO TO ENTITY******/
export function autorItemDtoToEntity(dto) {
  return new Autor({
    id: dto.id,
    nombres: dto.nombres,
    primerApellido: dto.primerApellido,
    segundoApellido: dto.segundoApellido,
  });
}
