import {FormControl, FormGroup, Validators} from '@angular/forms';

export class ProductFormHandler {

  form: FormGroup;

  constructor() {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      carbohydrates: new FormControl(0, Validators.required),
      proteins: new FormControl(0, Validators.required),
      fats: new FormControl(0, Validators.required)
    });
  }

}
