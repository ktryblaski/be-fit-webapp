import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/model/domain/product';
import { MealTemplateFormHandler } from '../../../meal-template-form-handler';

@Component({
  selector: 'app-form-product-select',
  templateUrl: './form-product-select.component.html',
  styleUrls: ['./form-product-select.component.scss'],
})
export class FormProductSelectComponent {
  @Input() products: Product[];

  constructor(public formHandler: MealTemplateFormHandler) {}

  displayFn(product: Product): string {
    return product?.name || '';
  }
}
