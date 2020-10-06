import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../../../../shared/model/domain/product';
import { MealTemplateFormHandler } from '../../../meal-template-form-handler';

@Component({
  selector: 'app-meal-template-form-product-select',
  templateUrl: './meal-template-form-product-select.component.html',
  styleUrls: ['./meal-template-form-product-select.component.scss']
})
export class MealTemplateFormProductSelectComponent implements OnInit {

  @Input() products: Product[];

  constructor(public formHandler: MealTemplateFormHandler) { }

  ngOnInit(): void {

  }

  displayFn(product: Product): string {
    return product?.name || '';
  }

}
