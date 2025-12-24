import { OmekasPropertyValueDto } from '@/application/dtos/OmekasPropertyValueDto.js';
export function omekasDataToOmekasPropertyValueDto(apiData) {
    return new OmekasPropertyValueDto({
        value: apiData['@value'],
        type: apiData['type'],
        propertyId: apiData['property_id'],
        propertyLabel: apiData['property_label'],
    });
}
