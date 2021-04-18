import { Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../-model/recipe';
import { TypedFormBuilder } from '../../../shared/form/typed-form/typed-form-builder.service';
import { RecipeForm, RecipeFormControls } from './-shared/recipe-form';
import { RecipeFormIngredientValue, RecipeFormValue } from './-shared/recipe-form-value';
import { values$ } from '../../../shared/form/typed-form/typed-utils';
import { TypedFormGroup } from '../../../shared/form/typed-form/typed-form';
import { ProductLite } from '../../product/-model/product-lite';

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
      weights: this.fb.array<number>(),
      product: this.fb.control<ProductLite>()
    });

    this.hasIngredients$ = values$(this.form.controls.weights).pipe(map(ingredients => ingredients.length > 0));
  }

  setValue(recipe: Recipe): void {
    this.form.controls.name.setValue(recipe.name);
    this.form.controls.description.setValue(recipe.description);
    this.form.controls.weights.setValue([]);

    recipe.ingredients.forEach(ingredient => {
      this.addIngredient({
        id: ingredient.id,
        weight: ingredient.weight,
        product: {
          id: ingredient.product.id,
          name: ingredient.product.name,
          proteins: ingredient.product.macronutrients.proteins,
          fats: ingredient.product.macronutrients.fats,
          carbohydrates: ingredient.product.macronutrients.carbohydrates,
          favourite: ingredient.product.favourite
        }
      });
    });
  }

  getValue(): RecipeFormValue {
    return {
      name: this.form.controls.name.value,
      description: this.form.controls.description.value,
      ingredients: this.form.controls.weights.value.map((weight, idx) => ({
        weight,
        ...this.ingredients[idx]
      })),
    };
  }

  addNewIngredient(product: ProductLite): void {
    this.addIngredient({
      id: null,
      weight: 100,
      product: {
        id: product.id,
        name: product.name,
        proteins: product.proteins,
        fats: product.fats,
        carbohydrates: product.carbohydrates,
        favourite: product.favourite
      }
    });
  }

  removeIngredient(idx: number): void {
    this.ingredients = this.ingredients.filter((i, index) => idx !== index);
    this.form.controls.weights.removeAt(idx);
  }

  clearProduct(): void {
    this.form.controls.product.reset();
  }

  private addIngredient(ingredient: RecipeFormIngredientValue): void {
    this.ingredients = [...this.ingredients, { ...ingredient }];

    const control = this.fb.control<number>(ingredient.weight);
    this.form.controls.weights.push(control);
  }

}
