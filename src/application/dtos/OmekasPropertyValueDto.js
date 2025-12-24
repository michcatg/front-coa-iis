export class OmekasPropertyValueDto { 
  constructor({ type='literal', value, propertyId, propertyLabel }) {
    this.type = type;
    this.value = value;
    this.propertyId = propertyId;
    this.propertyLabel = propertyLabel;
  } 
}
