import { Validators } from '@angular/forms';
import { ProductFormValue } from './-shared/product-form-value';
import { Injectable } from '@angular/core';
import { TypedFormGroup } from '../../../shared/form/typed-form/typed-form';
import { TypedFormBuilder } from '../../../shared/form/typed-form/typed-form-builder.service';

@Injectable()
export class ProductFormHandler {
  form: TypedFormGroup<ProductFormValue>;

  constructor(private fb: TypedFormBuilder) {
    this.form = this.fb.group<ProductFormValue>({
      name: this.fb.control(null, Validators.required),
      proteins: this.fb.control(null, Validators.required),
      fats: this.fb.control(null, Validators.required),
      carbohydrates: this.fb.control(null, Validators.required),
    });
  }

  getValue(): ProductFormValue {
    return this.form.value;
  }
}
