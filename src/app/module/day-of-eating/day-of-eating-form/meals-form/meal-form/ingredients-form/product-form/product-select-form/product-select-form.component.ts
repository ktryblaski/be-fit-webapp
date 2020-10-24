import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '../../../../../../../../shared/model/domain/product';
import { MealFormGroup } from '../../../../../-shared/day-of-eating-form';

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
