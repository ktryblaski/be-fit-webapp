import { Meal } from '../../model/domain/meal';
import {
  ingredientsCalories,
  ingredientsCarbohydrates,
  ingredientsFats,
  ingredientsProteins,
  ingredientsWeight,
} from './ingredients-calculator';

export function mealsCalories(meals: Meal[]): number {
  return meals.reduce((a, b) => a + ingredientsCalories(b.ingredients), 0);
}
export function mealsProteins(meals: Meal[]): number {
  return meals.reduce((a, b) => a + ingredientsProteins(b.ingredients), 0);
}
export function mealsFats(meals: Meal[]): number {
  return meals.reduce((a, b) => a + ingredientsFats(b.ingredients), 0);
}
export function mealsCarbohydrates(meals: Meal[]): number {
  return meals.reduce((a, b) => a + ingredientsCarbohydrates(b.ingredients), 0);
}
export function mealsWeight(meals: Meal[]) {
  return meals.reduce((a, b) => a + ingredientsWeight(b.ingredients), 0);
}
