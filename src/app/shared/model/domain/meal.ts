import { Ingredient, IngredientDTO } from './ingredient';

// TODO
export enum MealType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
  SUPPER = 'SUPPER',
  BEFORE_WORKOUT = 'BEFORE_WORKOUT',
  AFTER_WORKOUT = 'AFTER_WORKOUT',
}

export interface Meal {
  id?: number;
  name: string;
  description: string;
  ingredients: Ingredient[];
}

export interface MealView {
  id: number;
  name: string;
  description: string;
  weight: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
}

export interface MealDTO {
  id?: number;
  name: string;
  description: string;
  ingredients: IngredientDTO[];
}
