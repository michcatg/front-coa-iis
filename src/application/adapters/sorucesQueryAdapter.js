import { OmekasSearchQueryDto } from '@/application/dtos/OmekasSearchQueryDto.js'

export function searchToOmekasSearchQueryDto(apiData) {
  return new OmekasSearchQueryDto({
    term: apiData.property || '',
    operand: apiData.type || '',
    value: apiData.text || '',
    logicConnector: apiData.joiner || ''
  });
}
