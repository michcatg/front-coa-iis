import { OmekasPropertyDto } from '../dtos/OmekasPropertyDto.js'

export function toOmekasPropertyDto(apiData) {
  return new OmekasPropertyDto({
    id: apiData['o:id'],
    name: apiData['o:label'],
    term: apiData['o:term'],
  });
}
