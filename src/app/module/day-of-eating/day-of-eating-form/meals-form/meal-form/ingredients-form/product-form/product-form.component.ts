import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { values$ } from '../../../../../../../shared/form/typed-form/typed-utils';
import { DayOfEatingFormHandler } from '../../../../day-of-eating-form-handler';
import { MealFormGroup } from '../../../../-shared/day-of-eating-form';
import { Product } from '../../../../../../product/-model/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnInit, OnChanges {

  @Input() products: Product[];
  @Input() mealControl: MealFormGroup;
  @Input() mealIdx: number;
  @Output() addProduct = new EventEmitter<Product>();

  private readonly productsChange = new BehaviorSubject<Product[]>([]);

  products$: Observable<Product[]> = this.productsChange.pipe(distinctUntilChanged());

  constructor(private formHandler: DayOfEatingFormHandler) { }

  ngOnInit(): void {
    this.products$ = combineLatest([
      this.productsChange.pipe(distinctUntilChanged()),
      values$(this.mealControl.controls.ingredients)
    ]).pipe(
      map(([products, ingredients]) => {
        const selectedProductIds = ingredients.map((ingredient, idx) => this.formHandler.meals[this.mealIdx].ingredients[idx].product.id);
        return products.filter(product => selectedProductIds.indexOf(product.id) === -1);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.products) {
      this.productsChange.next(this.products);
    }
  }

  handleAddProduct(): void {
    this.addProduct.emit(this.mealControl.controls.product.value);
  }
}
