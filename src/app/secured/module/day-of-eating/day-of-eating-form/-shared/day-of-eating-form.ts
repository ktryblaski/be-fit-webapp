import { TypedFormArray, TypedFormControl, TypedFormGroup } from '../../../../../shared/form/typed-form/typed-form';
import { Product } from '../../../product/-model/product';

export type MealFormGroup = TypedFormGroup<DayOfEatingFormMeal, DayOfEatingFormMealControls>;
export type MealsFormArray = TypedFormArray<DayOfEatingFormMeal, MealFormGroup>;

export interface DayOfEatingForm {
  meals: DayOfEatingFormMeal[];
}

export interface DayOfEatingFormMeal {
  name: string;
  description: string;
  ingredients: number[];
  product: Product;
}

export interface DayOfEatingFormControls {
  meals: MealsFormArray;
}

export interface DayOfEatingFormMealControls {
  name: TypedFormControl<string>;
  description: TypedFormControl<string>;
  ingredients: TypedFormArray<number>;
  product: TypedFormControl<Product>;
}
