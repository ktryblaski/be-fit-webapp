import { Component, EventEmitter, Output } from '@angular/core';
import { ProductFormHandler } from './product-form-handler';
import { ProductFormValue } from './-shared/product-form-value';

@Component({
  selector: 'app-product-create-form',
  templateUrl: './product-create-form.component.html',
  styleUrls: ['./product-create-form.component.scss'],
  providers: [ProductFormHandler]
})
export class ProductCreateFormComponent {

  @Output() create = new EventEmitter<ProductFormValue>();

  constructor(public formHandler: ProductFormHandler) { }

  handleSubmit(): void {
    this.create.emit(this.formHandler.getValue());
  }

}
