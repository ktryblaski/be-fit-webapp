import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TypedFormArray } from '../../../shared/form/typed/typed-form-array';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DayOfEatingFormMealValue, DayOfEatingFormValue } from './-shared/day-of-eating-form-value';
import { DayOfEating } from '../../../shared/model/domain/day-of-eating';
import { Meal } from '../../../shared/model/domain/meal';
import { Product } from '../../../shared/model/domain/product';

@Injectable()
export class DayOfEatingFormHandler {

  form: FormGroup;

  readonly meals: TypedFormArray<any>;

  hasMeals$: Observable<boolean>;

  constructor() {
    this.form = new FormGroup({
      meals: new FormArray([], Validators.required)
    });

    this.meals = TypedFormArray.from(this.form.get('meals'));

    this.hasMeals$ = this.meals.values.pipe(
      map((meals: DayOfEatingFormMealValue[]) => meals.length !== 0)
    );
  }

  get mealsControls(): FormGroup[] {
    return this.meals.controls as FormGroup[];
  }

  getValue(): DayOfEatingFormValue {
    return {
      meals: this.meals.value
    };
  }

  setValue(dayOfEating: DayOfEating): void {
    dayOfEating.meals.map(meal => this.createMealControl(meal)).forEach(meal => this.meals.push(meal));
  }

  addNewMeal(): void {
    this.meals.push(this.createNewMealControl());
  }

  addNewIngredient(mealIdx: number, product: Product): void {
    const mealControl = this.meals.at(mealIdx) as FormGroup;
    const ingredientsControl = mealControl.get('ingredients') as FormArray;

    ingredientsControl.push(this.createIngredientControl(product, 100));
  }

  removeIngredient(mealIdx: number, productIdx: number): void {
    const mealControl = this.meals.at(mealIdx) as FormGroup;
    const ingredientsControl = mealControl.get('ingredients') as FormArray;

    ingredientsControl.removeAt(productIdx);
  }

  clearProduct(mealIdx: number): void {
    const mealControl = this.meals.at(mealIdx) as FormGroup;
    const productControl = mealControl.get('product') as FormControl;

    productControl.reset();
  }

  private createNewMealControl(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      ingredients: new FormArray([], Validators.required),
      product: new FormControl(null),
    });
  }

  private createMealControl(meal: Meal): FormGroup {
    const mealFormGroup = this.createNewMealControl();

    mealFormGroup.get('name').setValue(meal.name);
    mealFormGroup.get('description').setValue(meal.description);

    const ingredients = mealFormGroup.get('ingredients') as FormArray;
    meal.ingredients
      .map(ingredient => this.createIngredientControl(ingredient.product, ingredient.weight))
      .forEach(ingredient => ingredients.push(ingredient));

    return mealFormGroup;
  }

  private createIngredientControl(product: Product, weight: number): FormGroup {
    return new FormGroup({
      product: new FormControl(product, Validators.required),
      weight: new FormControl(weight, Validators.required)
    });
  }

}
