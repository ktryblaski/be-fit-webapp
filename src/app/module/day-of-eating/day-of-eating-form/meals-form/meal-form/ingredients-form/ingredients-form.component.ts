import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MealFormGroup } from '../../../-shared/day-of-eating-form';
import { Product } from '../../../../../../shared/model/domain/product';
import { DayOfEatingFormHandler } from '../../../day-of-eating-form-handler';

@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styleUrls: ['./ingredients-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsFormComponent {
  @Input() mealControl: MealFormGroup;
  @Input() mealIdx: number;
  @Input() products: Product[];

  constructor(public formHandler: DayOfEatingFormHandler) {}

  handleAddProduct(product: Product): void {
    this.mealControl.controls.product.reset();
    this.formHandler.addNewIngredient(this.mealIdx, product);
  }

  handleRemoveIngredient(idx: number): void {
    this.formHandler.removeIngredient(this.mealIdx, idx);
  }
}
