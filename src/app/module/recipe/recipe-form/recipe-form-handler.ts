import { Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../../../shared/model/domain/recipe';
import { TypedFormBuilder } from '../../../shared/form/typed-form/typed-form-builder.service';
import { RecipeForm, RecipeFormControls } from './-shared/recipe-form';
import { RecipeFormIngredientValue, RecipeFormValue } from './-shared/recipe-form-value';
import { values$ } from '../../../shared/form/typed-form/typed-utils';
import { TypedFormGroup } from '../../../shared/form/typed-form/typed-form';
import { Product } from '../../product/-model/product';

export type RecipeIngredient = Omit<RecipeFormIngredientValue, 'weight'>;

@Injectable()
export class RecipeFormHandler {

  form: TypedFormGroup<RecipeForm, RecipeFormControls>;

  ingredients: RecipeIngredient[] = [];
  hasIngredients$: Observable<boolean>;

  constructor(private fb: TypedFormBuilder) {
    this.form = this.fb.group<RecipeForm, RecipeFormControls>({
      name: this.fb.control<string>(null, Validators.required),
      description: this.fb.control<string>(),
      ingredients: this.fb.array<number>(),
      product: this.fb.control<Product>(),
    });

    this.hasIngredients$ = values$(this.form.controls.ingredients).pipe(map(ingredients => ingredients.length > 0));
  }

  setValue(recipe: Recipe): void {
    this.form.controls.name.setValue(recipe.name);
    this.form.controls.description.setValue(recipe.description);
    this.form.controls.ingredients.setValue([]);

    recipe.ingredients.forEach(ingredient => {
      this.addIngredient(ingredient.id, ingredient.product, ingredient.weight);
    });
  }

  getValue(): RecipeFormValue {
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
