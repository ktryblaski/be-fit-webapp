import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ProductFormHandler } from './product-form-handler';
import { ProductFormValue } from './model/product-form-value';

@Component({
  selector: 'app-product-create-form',
  templateUrl: './product-create-form.component.html',
  styleUrls: ['./product-create-form.component.scss'],
  providers: [ProductFormHandler],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreateFormComponent {

  @Output() create = new EventEmitter<ProductFormValue>();
  @Output() cancel = new EventEmitter();

  constructor(public formHandler: ProductFormHandler) { }

  handleSubmit(): void {
    if (this.formHandler.form.invalid) {
      return;
    }

    this.create.emit(this.formHandler.getValue());
  }

  handleCancel(): void {
    this.cancel.emit();
  }

}
