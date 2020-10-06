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
  readonly product: TypedFormControl<Product | string>;
  readonly ingredients: TypedFormArray<any>; // TODO any

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
    this.product = TypedFormControl.from(this.form.get('product'));
    this.ingredients = TypedFormArray.from(this.form.get('ingredients'));

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
      .map(ingredient => this.createIngredientGroup(ingredient.product, ingredient.weight))
      .forEach(ingredient => this.ingredients.push(ingredient));
  }

  addNewIngredient(product: Product): void {
    this.ingredients.push(
      this.createIngredientGroup(product, 100)
    );
  }

  removeIngredient(productId: number): void {
    for (let i = 0 ; i < this.ingredients.length ; ++i) {
      if ((this.ingredients.at(i).get('product').value as Product).id === productId) {
        this.ingredients.removeAt(i);
        break;
      }
    }
  }

  clearProduct(): void {
    this.product.reset();
  }

  private createIngredientGroup(product: Product, weight: number): FormGroup {
    return new FormGroup({
      product: new FormControl(product, Validators.required),
      weight: new FormControl(weight, Validators.required)
    });
  }

}
