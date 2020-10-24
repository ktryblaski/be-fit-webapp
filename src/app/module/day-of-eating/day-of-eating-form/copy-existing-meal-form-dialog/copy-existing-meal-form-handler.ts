import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MealTemplate } from '../../../../shared/model/domain/meal-template';
import { TypedFormControl } from '../../../../shared/form/typed/typed-form-control';

@Injectable()
export class CopyExistingMealFormHandler {
  form: FormGroup;

  mealTemplate: TypedFormControl<MealTemplate>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      mealTemplate: this.fb.control(null, Validators.required),
    });

    this.mealTemplate = TypedFormControl.from(this.form.get('mealTemplate'));
  }

  getValue(): MealTemplate {
    return this.mealTemplate.value;
  }
}
