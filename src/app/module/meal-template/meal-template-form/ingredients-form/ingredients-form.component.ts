import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../../../shared/model/domain/product';
import { MealTemplateFormHandler } from '../meal-template-form-handler';

@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styleUrls: ['./ingredients-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsFormComponent {
  @Input() products: Product[];

  constructor(public formHandler: MealTemplateFormHandler) {}

  handleAddProduct(product: Product): void {
    this.formHandler.clearProduct();
    this.formHandler.addNewIngredient(product);
  }

  handleRemoveIngredient(idx: number): void {
    this.formHandler.removeIngredient(idx);
  }
}
