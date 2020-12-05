import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecipeFormHandler } from '../../../recipe-form-handler';
import { ProductLite } from '../../../../../product/-model/product-lite';

@Component({
  selector: 'app-form-product-select',
  templateUrl: './form-product-select.component.html',
  styleUrls: ['./form-product-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormProductSelectComponent {

  @Input() products: ProductLite[];

  constructor(public formHandler: RecipeFormHandler) { }

  displayFn(product: ProductLite): string {
    return product?.name || '';
  }
}
