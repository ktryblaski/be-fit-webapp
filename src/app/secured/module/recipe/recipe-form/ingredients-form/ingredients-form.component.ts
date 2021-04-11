import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecipeFormHandler } from '../recipe-form-handler';
import { Product } from '../../../product/-model/product';
import { ProductLite } from '../../../product/-model/product-lite';

@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styleUrls: ['./ingredients-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsFormComponent {

  @Input() products: ProductLite[];

  constructor(public formHandler: RecipeFormHandler) { }

  handleAddProduct(product: ProductLite): void {
    this.formHandler.clearProduct();
    this.formHandler.addNewIngredient(product);
  }

  handleRemoveIngredient(idx: number): void {
    this.formHandler.removeIngredient(idx);
  }
}
