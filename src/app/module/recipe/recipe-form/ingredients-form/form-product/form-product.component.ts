import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { RecipeFormHandler } from '../../recipe-form-handler';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { values$ } from '../../../../../shared/form/typed-form/typed-utils';
import { Product } from '../../../../product/-model/product';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormProductComponent implements OnInit, OnChanges {
  @Input() products: Product[];
  @Output() addProduct = new EventEmitter<Product>();

  private readonly productsChange = new BehaviorSubject<Product[]>([]);

  products$: Observable<Product[]> = this.productsChange.pipe(distinctUntilChanged());

  constructor(public formHandler: RecipeFormHandler) {}

  ngOnInit(): void {
    this.products$ = combineLatest([
      this.productsChange.pipe(distinctUntilChanged()),
      values$(this.formHandler.form.controls.ingredients),
    ]).pipe(
      map(([products, ingredients]) => {
        const selectedProductIds = ingredients.map((ingredient, idx) => this.formHandler.ingredients[idx].product.id);
        return products.filter(product => selectedProductIds.indexOf(product.id) === -1);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.productsChange.next(this.products);
  }

  handleAddProduct(): void {
    this.addProduct.emit(this.formHandler.form.controls.product.value);
  }
}