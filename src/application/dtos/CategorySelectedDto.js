export class CategorySelectedDto { 
  constructor({ id, name, isSelected=false }) {
    this.id = id;
    this.name = name;
    this.isSelected = isSelected;
  }
}
