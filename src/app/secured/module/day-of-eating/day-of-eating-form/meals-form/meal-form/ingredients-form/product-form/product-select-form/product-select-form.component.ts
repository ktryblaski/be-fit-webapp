import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MealFormGroup } from '../../../../../-shared/day-of-eating-form';
import { Product } from '../../../../../../../product/-model/product';

@Component({
  selector: 'app-product-select-form',
  templateUrl: './product-select-form.component.html',
  styleUrls: ['./product-select-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSelectFormComponent {
  @Input() mealControl: MealFormGroup;
  @Input() products: Product[];

  displayFn(product: Product): string {
    return product?.name || '';
  }
}
