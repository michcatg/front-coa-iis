import { v4 as uuidv4 } from 'uuid';
export class OmekasSearchQueryDto {
  constructor({  term, operand, value, logicConnector = 'AND', id = uuidv4() }) {
    this.term = term;
    this.operand = operand;
    this.value = value;
    this.logicConnector = logicConnector;
    this.id = id;
  }
}
