import { Injectable } from '@angular/core';
import { DayOfEating } from '../../../shared/model/domain/day-of-eating';
import { Meal } from '../../../shared/model/domain/meal';
import { Ingredient } from '../../../shared/model/domain/ingredient';
import { DayOfEatingFormIngredientValue, DayOfEatingFormMealValue, DayOfEatingFormValue } from './-shared/day-of-eating-form-value';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MealTemplate } from '../../../shared/model/domain/meal-template';
import { clone } from '../../../shared/util/commons';
import { values$ } from '../../../shared/form/typed-form/typed-utils';
import { TypedFormBuilder } from '../../../shared/form/typed-form/typed-form-builder.service';
import { TypedFormArray, TypedFormGroup } from '../../../shared/form/typed-form/typed-form';
import { Validators } from '@angular/forms';
import { DayOfEatingForm, DayOfEatingFormControls, DayOfEatingFormMeal, DayOfEatingFormMealControls } from './-shared/day-of-eating-form';
import { Product } from '../../product/-model/product';

export type MealIngredient = Omit<DayOfEatingFormIngredientValue, 'weight'>;
export type DayOfEatingMeal = Omit<DayOfEatingFormMealValue, 'name' | 'description' | 'ingredients'> & {
  ingredients: MealIngredient[]
};

export type DayOfEatingFormGroup = TypedFormGroup<DayOfEatingForm, DayOfEatingFormControls>;

@Injectable()
export class DayOfEatingFormHandler {
  form: DayOfEatingFormGroup;
  meals: DayOfEatingMeal[];

  hasMeals$: Observable<boolean>;

  constructor(private fb: TypedFormBuilder) {
    this.form = this.fb.group<DayOfEatingForm, DayOfEatingFormControls>({
      meals: this.fb.array([], Validators.required),
    });

    this.hasMeals$ = values$(this.form.controls.meals).pipe(map(meals => meals.length > 0));
  }

  setValue(dayOfEating: DayOfEating): void {
    this.meals = this.temp(dayOfEating.meals);
    this.clearAndCreateForm();
    this.patchForm(this.mapToFormValue(dayOfEating));
  }

  temp(meals: Meal[]): DayOfEatingMeal[] {
    return meals.map(m => ({
      id: m.id,
      ingredients: m.ingredients.map(i => ({
        id: i.id,
        product: i.product
      }))
    }));
  }

  getValue(): DayOfEatingFormValue {
    return {
      meals: null,
    };
  }

  addMeal(meal: Meal): void {
    const values = [...this.form.controls.meals.value, this.mapMealToFormValue(meal)];

    this.meals = [...this.meals.map(m => clone(m)), this.generateMeal(meal)];
    this.clearAndCreateForm();
    this.patchForm({ meals: values });
  }

  addMealFromTemplate(mealTemplate: MealTemplate): void {
    const values = [...this.form.controls.meals.value, this.mapMealToFormValue(mealTemplate)];

    this.meals = [...this.meals.map(meal => clone(meal)), this.generateMeal(mealTemplate)];
    this.clearAndCreateForm();
    this.patchForm({ meals: values });
  }

  removeMeal(idx: number): void {
    const values = this.form.controls.meals.value.filter((value, index) => index !== idx);
    this.meals = this.meals.filter((meal, index) => index !== idx).map(meal => clone(meal));
    this.clearAndCreateForm();
    this.patchForm({ meals: values });
  }

  moveUpMeal(idx: number): void {
    if (idx === 0) {
      return;
    }

    const meals = this.meals.map(m => clone(m));
    const meal = meals[idx];
    const values = [...this.form.controls.meals.value];
    const value = values[idx];

    meals.splice(idx, 1);
    values.splice(idx, 1);

    meals.splice(idx - 1, 0, meal);
    values.splice(idx - 1, 0, value);

    this.meals = meals;
    this.clearAndCreateForm();
    this.patchForm({ meals: values });
  }

  moveDownMeal(idx: number): void {
    if (idx === this.meals.length - 1) {
      return;
    }

    const meals = this.meals.map(m => clone(m));
    const meal = meals[idx];
    const values = [...this.form.controls.meals.value];
    const value = values[idx];

    meals.splice(idx, 1);
    values.splice(idx, 1);

    meals.splice(idx + 1, 0, meal);
    values.splice(idx + 1, 0, value);

    this.meals = meals;
    this.clearAndCreateForm();
    this.patchForm({ meals: values });
  }

  addNewIngredient(mealIdx: number, product: Product): void {
    this.addIngredient(mealIdx, null, product, 100);
  }

  private addIngredient(mealIdx: number, id: number | null, product: Product, weight: number): void {
    const meal = this.meals[mealIdx];

    meal.ingredients = [...meal.ingredients, { id, product }];
    this.form.controls.meals.at(mealIdx).controls.ingredients.push(
      this.fb.control<number>(weight)
    );
  }

  removeIngredient(mealIdx: number, idx: number): void {
    this.meals[mealIdx].ingredients.splice(idx, 1);
    this.form.controls.meals.at(mealIdx).controls.ingredients.removeAt(idx);
  }


  // getIngredientsArrayControls(mealIdx: number): FormControl[] {
  //   return this.getIngredientsControl(mealIdx).controls as FormControl[];
  // }

  private clearAndCreateForm(): void {
    this.form.controls.meals.clear();
    this.meals.map(meal => this.generateMealControl(meal)).forEach(mealForm => this.form.controls.meals.push(mealForm));
  }

  private patchForm(formValue: DayOfEatingForm): void {
    this.form.controls.meals.controls.forEach((mealControl, index) => mealControl.patchValue(formValue.meals[index]));
  }

  private generateMealControl(meal: DayOfEatingMeal): TypedFormGroup<DayOfEatingFormMeal, DayOfEatingFormMealControls> {
    return this.fb.group<DayOfEatingFormMeal, DayOfEatingFormMealControls>({
      name: this.fb.control<string>(null, Validators.required),
      description: this.fb.control<string>(null),
      ingredients: this.generateIngredientsControl(meal.ingredients),
      product: this.fb.control<Product>(),
    });
  }

  private generateIngredientsControl(ingredients: MealIngredient[]): TypedFormArray<number> {
    return this.fb.array<number>(
      ingredients.map(() => this.fb.control<number>(null, Validators.required)),
      Validators.required
    );
  }

  private generateMeal(meal: Meal): DayOfEatingMeal {
    return {
      id: meal.id,
      ingredients: this.generateIngredients(meal.ingredients),
    };
  }

  private generateIngredients(ingredients: Ingredient[]): MealIngredient[] {
    return ingredients.map(ingredient => this.generateIngredient(ingredient));
  }

  private generateIngredient(ingredient: Ingredient): MealIngredient {
    return {
      id: ingredient.id,
      product: ingredient.product,
    };
  }

  private mapToFormValue(dayOfEating: DayOfEating): DayOfEatingForm {
    return {
      meals: dayOfEating.meals.map(meal => this.mapMealToFormValue(meal)),
    };
  }

  private mapMealToFormValue(meal: Meal): DayOfEatingFormMeal {
    return {
      name: meal.name,
      description: meal.description,
      ingredients: meal.ingredients.map(i => i.weight),
      product: null
    };
  }
}
