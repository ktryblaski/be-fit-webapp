import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../../../recipe/-model/recipe';

@Injectable()
export class CopyExistingMealFormHandler {

  form: FormGroup;
  recipe: FormControl;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      recipe: this.fb.control(null, Validators.required),
    });

    this.recipe = this.form.controls.recipe as FormControl;
  }

  getValue(): Recipe {
    return this.recipe.value;
  }
}
