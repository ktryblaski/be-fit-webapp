import { Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MealTemplate } from '../../../shared/model/domain/meal-template';
import { TypedFormBuilder } from '../../../shared/form/typed-form/typed-form-builder.service';
import { MealTemplateForm, MealTemplateFormControls } from './-shared/meal-template-form';
import { MealTemplateFormIngredientValue, MealTemplateFormValue } from './-shared/meal-template-form-value';
import { values$ } from '../../../shared/form/typed-form/typed-utils';
import { TypedFormGroup } from '../../../shared/form/typed-form/typed-form';
import { Product } from '../../product/-model/product';

export type MealTemplateIngredient = Omit<MealTemplateFormIngredientValue, 'weight'>;

@Injectable()
export class MealTemplateFormHandler {

  form: TypedFormGroup<MealTemplateForm, MealTemplateFormControls>;

  ingredients: MealTemplateIngredient[] = [];
  hasIngredients$: Observable<boolean>;

  constructor(private fb: TypedFormBuilder) {
    this.form = this.fb.group<MealTemplateForm, MealTemplateFormControls>({
      name: this.fb.control<string>(null, Validators.required),
      description: this.fb.control<string>(),
      ingredients: this.fb.array<number>(),
      product: this.fb.control<Product>(),
    });

    this.hasIngredients$ = values$(this.form.controls.ingredients).pipe(map(ingredients => ingredients.length > 0));
  }

  setValue(mealTemplate: MealTemplate): void {
    this.form.controls.name.setValue(mealTemplate.name);
    this.form.controls.description.setValue(mealTemplate.description);
    this.form.controls.ingredients.setValue([]);

    mealTemplate.ingredients.forEach(ingredient => {
      this.addIngredient(ingredient.id, ingredient.product, ingredient.weight);
    });
  }

  getValue(): MealTemplateFormValue {
    return {
      name: this.form.controls.name.value,
      description: this.form.controls.description.value,
      ingredients: this.form.controls.ingredients.value.map((weight, idx) => ({
        id: this.ingredients[idx].id,
        weight,
        product: this.ingredients[idx].product,
      })),
    };
  }

  addNewIngredient(product: Product): void {
    this.addIngredient(null, product, 100);
  }

  removeIngredient(idx: number): void {
    this.ingredients = this.ingredients.filter((i, index) => idx !== index);
    this.form.controls.ingredients.removeAt(idx);
  }

  clearProduct(): void {
    this.form.controls.product.reset();
  }

  private addIngredient(id: number | null, product: Product, weight: number): void {
    this.ingredients = [...this.ingredients, { id, product }];
    this.form.controls.ingredients.push(this.fb.control<number>(weight));
  }

}
