import {Component, Input} from '@angular/core';
import {MealFormHandler} from '../meal-form-handler';
import {Product} from '../../../../shared/model/domain/product';
import {FormArray} from '@angular/forms';

@Component({
  selector: 'app-meal-ingredients',
  templateUrl: './meal-ingredients.component.html',
  styleUrls: ['./meal-ingredients.component.scss']
})
export class MealIngredientsComponent {

  @Input() formHandler: MealFormHandler;

  get ingredients(): FormArray {
    return this.formHandler.form.get('ingredients') as FormArray;
  }

  handleAddProduct(product: Product): void {
    this.formHandler.form.get('product').reset();
    this.formHandler.addNewIngredient(product);
  }

  handleRemoveProduct(productId: number): void {
    this.formHandler.removeIngredient(productId);
  }

}
