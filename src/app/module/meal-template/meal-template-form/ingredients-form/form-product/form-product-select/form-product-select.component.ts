import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MealTemplateFormHandler } from '../../../meal-template-form-handler';
import { Product } from '../../../../../product/-model/product';

@Component({
  selector: 'app-form-product-select',
  templateUrl: './form-product-select.component.html',
  styleUrls: ['./form-product-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormProductSelectComponent {
  @Input() products: Product[];

  constructor(public formHandler: MealTemplateFormHandler) {}

  displayFn(product: Product): string {
    return product?.name || '';
  }
}
