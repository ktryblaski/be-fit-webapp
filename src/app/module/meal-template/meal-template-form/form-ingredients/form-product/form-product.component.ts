import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Product } from '../../../../../shared/model/domain/product';
import { MealTemplateFormHandler } from '../../meal-template-form-handler';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit, OnChanges {

  @Input() products: Product[];
  @Output() addProduct = new EventEmitter<Product>();

  private readonly productsChange = new BehaviorSubject<Product[]>([]);

  products$: Observable<Product[]> = this.productsChange.pipe(distinctUntilChanged());

  constructor(public formHandler: MealTemplateFormHandler) { }

  ngOnInit(): void {
    this.products$ = combineLatest([
      this.productsChange.pipe(distinctUntilChanged()),
      this.formHandler.ingredients.values
    ]).pipe(
      map(([products, ingredients]) => {
        const selectedProductIds = ingredients.map(i => i.product.id);
        return products.filter(product => selectedProductIds.indexOf(product.id) === -1);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.productsChange.next(this.products);
  }

  handleAddProduct(): void {
    this.addProduct.emit(this.formHandler.product.value as Product);
  }

}
