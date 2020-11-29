import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MealFormHandler } from '../../../meal-form-handler';
import { merge, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../../../../product/-model/product';

@Component({
  selector: 'app-meal-ingredients-select-ui',
  templateUrl: './meal-ingredients-select-ui.component.html',
  styleUrls: ['./meal-ingredients-select-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealIngredientsSelectUiComponent implements OnInit, OnChanges {

  @Input() products: Product[];
  @Input() formHandler: MealFormHandler;
  @Output() addProduct = new EventEmitter<Product>();

  private readonly productsChange = new Subject<void>();

  products$: Observable<Product[]>;

  ngOnInit(): void {
    this.products$ = merge(this.formHandler.form.get('product').valueChanges, this.productsChange.pipe()).pipe(
      map(() => this.filter(this.products, this.formHandler.form.get('product').value))
    );
  }

  ngOnChanges(): void {
    this.productsChange.next();
  }

  displayFn(product: Product): string {
    return product?.name || '';
  }

  private filter(products: Product[], value: any): Product[] {
    if (!value || typeof value !== 'string') {
      return products;
    }

    return products.filter(p => p.name.indexOf(value) > -1);
  }
}
