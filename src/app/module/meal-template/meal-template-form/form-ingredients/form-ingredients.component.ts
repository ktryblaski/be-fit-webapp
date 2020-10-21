import { Component, Input } from '@angular/core';
import { MealTemplateFormHandler } from '../meal-template-form-handler';
import { Product } from '../../../../shared/model/domain/product';

@Component({
  selector: 'app-form-ingredients',
  templateUrl: './form-ingredients.component.html',
  styleUrls: ['./form-ingredients.component.scss']
})
export class FormIngredientsComponent {

  @Input() products: Product[];

  constructor(public formHandler: MealTemplateFormHandler) { }

  handleAddProduct(product: Product): void {
    this.formHandler.clearProduct();
    this.formHandler.addNewIngredient(product);
  }

  handleRemoveIngredient(idx: number): void {
    this.formHandler.removeIngredient(idx);
  }

}
