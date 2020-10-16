import { Component, Input } from '@angular/core';
import { MealTemplateFormHandler } from '../meal-template-form-handler';
import { Product } from '../../../../shared/model/domain/product';

@Component({
  selector: 'app-meal-template-form-ingredients',
  templateUrl: './meal-template-form-ingredients.component.html',
  styleUrls: ['./meal-template-form-ingredients.component.scss']
})
export class MealTemplateFormIngredientsComponent {

  @Input() products: Product[];

  constructor(public formHandler: MealTemplateFormHandler) { }

  handleAddProduct(product: Product): void {
    this.formHandler.clearProduct();
    this.formHandler.addNewIngredient(product);
  }

  handleIngredient(idx: number): void {
    this.formHandler.removeIngredient(idx);
  }

}
