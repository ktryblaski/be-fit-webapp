import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MealTemplate } from '../../../../shared/model/domain/meal-template';

@Injectable()
export class CopyExistingMealFormHandler {

  form: FormGroup;
  mealTemplate: FormControl;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      mealTemplate: this.fb.control(null, Validators.required),
    });

    this.mealTemplate = this.form.controls.mealTemplate as FormControl;
  }

  getValue(): MealTemplate {
    return this.mealTemplate.value;
  }
}
