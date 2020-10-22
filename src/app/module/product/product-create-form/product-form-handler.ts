import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductFormValue } from './-shared/product-form-value';
import { TypedFormControl } from '../../../shared/form/typed/typed-form-control';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductFormHandler {

  form: FormGroup;

  name: TypedFormControl<string>;
  carbohydrates: TypedFormControl<number>;
  proteins: TypedFormControl<number>;
  fats: TypedFormControl<number>;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      carbohydrates: new FormControl(0, Validators.required),
      proteins: new FormControl(0, Validators.required),
      fats: new FormControl(0, Validators.required)
    });

    this.name = TypedFormControl.from(this.form.get('name'));
    this.carbohydrates = TypedFormControl.from(this.form.get('carbohydrates'));
    this.proteins = TypedFormControl.from(this.form.get('proteins'));
    this.fats = TypedFormControl.from(this.form.get('fats'));
  }

  getValue(): ProductFormValue {
    return {
      name: this.name.value,
      carbohydrates: this.carbohydrates.value,
      proteins: this.proteins.value,
      fats: this.fats.value
    };
  }

}
