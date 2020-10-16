import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../shared/model/domain/product';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MealTemplateFormIngredientValue, MealTemplateFormValue } from './-shared/meal-template-form-value';
import { MealTemplate } from '../../../shared/model/domain/meal-template';
import { TypedFormControl } from '../../../shared/form/typed/typed-form-control';
import { TypedFormArray } from '../../../shared/form/typed/typed-form-array';

@Injectable()
export class MealTemplateFormHandler {

  form: FormGroup;

  readonly name: TypedFormControl<string>;
  readonly description: TypedFormControl<string>;
  readonly ingredients: TypedFormArray<any>; // TODO any
  readonly product: TypedFormControl<Product | string>;

  hasIngredients$: Observable<boolean>;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      ingredients: new FormArray([], Validators.required),
      product: new FormControl(null),
    });

    this.name = TypedFormControl.from(this.form.get('name'));
    this.description = TypedFormControl.from(this.form.get('description'));
    this.ingredients = TypedFormArray.from(this.form.get('ingredients'));
    this.product = TypedFormControl.from(this.form.get('product'));

    this.hasIngredients$ = this.ingredients.values.pipe(
      map((ingredients: MealTemplateFormIngredientValue[]) => ingredients.length > 0)
    );
  }

  getValue(): MealTemplateFormValue {
    return {
      name: this.name.value,
      description: this.description.value,
      ingredients: this.ingredients.value
    };
  }

  setValue(mealTemplate: MealTemplate): void {
    this.name.setValue(mealTemplate.name);
    this.description.setValue(mealTemplate.description);
    this.ingredients.setValue([]);

    mealTemplate.ingredients
      .map(ingredient => ({id: ingredient.id, product: ingredient.product, weight: ingredient.weight}))
      .map(ingredient => new FormControl(ingredient))
      .forEach(ingredient => this.ingredients.push(ingredient));
  }

  addNewIngredient(product: Product): void {
    this.ingredients.push(
      new FormControl({id: null, product, weight: 100})
    );
  }

  removeIngredient(idx: number): void {
    this.ingredients.removeAt(idx);
  }

  clearProduct(): void {
    this.product.reset();
  }

}
