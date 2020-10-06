import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../../../shared/model/domain/product';
import { MealTemplateFormHandler } from '../../meal-template-form-handler';
import { Ingredient } from '../../../../../shared/model/domain/ingredient';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-meal-template-form-product',
  templateUrl: './meal-template-form-product.component.html',
  styleUrls: ['./meal-template-form-product.component.scss']
})
export class MealTemplateFormProductComponent implements OnInit {

  @Input() products: Product[];
  @Output() addProduct: EventEmitter<Product> = new EventEmitter<Product>();

  products$: Observable<Product[]>;
  selected$: Observable<number[]>;

  constructor(public formHandler: MealTemplateFormHandler) { }

  ngOnInit(): void {
    this.selected$ = this.formHandler.ingredients.values.pipe(
      map((ingredients: Ingredient[]) => ingredients.map(i => i.product.id))
    );
  }

  handleAddProduct(): void {
    this.addProduct.emit(this.formHandler.product.value as Product);
  }

}
