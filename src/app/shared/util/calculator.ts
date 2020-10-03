import {Macronutrients} from '../model/domain/macronutrients';
import {Ingredient} from '../model/domain/ingredient';
import {Meal} from '../model/domain/meal';

// macronutrients
export function macronutrientsKCAL(macronutrients: Macronutrients): number {
  return (macronutrients?.carbohydrates ?? 0) * 4 + (macronutrients?.proteins ?? 0) * 4 + (macronutrients?.fats ?? 0) * 9;
}
export function macronutrientsKCALForWeight(macronutrients: Macronutrients, weight?: number): number {
  return ((weight ?? 100) / 100) * macronutrientsKCAL(macronutrients);
}
export function macronutrientsCarbohydratesForWeight(macronutrients: Macronutrients, weight?: number): number {
  return ((weight ?? 100) / 100) * (macronutrients?.carbohydrates ?? 0);
}
export function macronutrientsProteinsForWeight(macronutrients: Macronutrients, weight?: number): number {
  return ((weight ?? 100) / 100) * (macronutrients?.proteins ?? 0);
}
export function macronutrientsFatsForWeight(macronutrients: Macronutrients, weight?: number): number {
  return ((weight ?? 100) / 100) * (macronutrients?.fats ?? 0);
}

// ingredients
export function ingredientsKCAL(ingredients: Ingredient[]): number {
  return ingredients.reduce((a, b) => a + macronutrientsKCALForWeight(b.product.macronutrients, b.weight), 0);
}
export function ingredientsCarbohydrates(ingredients: Ingredient[]): number {
  return ingredients.reduce((a, b) => a + macronutrientsCarbohydratesForWeight(b.product.macronutrients, b.weight), 0);
}
export function ingredientsProteins(ingredients: Ingredient[]): number {
  return ingredients.reduce((a, b) => a + macronutrientsProteinsForWeight(b.product.macronutrients, b.weight), 0);
}
export function ingredientsFats(ingredients: Ingredient[]): number {
  return ingredients.reduce((a, b) => a + macronutrientsFatsForWeight(b.product.macronutrients, b.weight), 0);
}
export function ingredientsWeight(ingredients: Ingredient[]) {
  return ingredients.reduce((a, b) => a + Number(b.weight), 0);
}

// meals
export function mealsKCAL(meals: Meal[]): number {
  return meals.reduce((a, b) => a + ingredientsKCAL(b.ingredients), 0);
}
export function mealsCarbohydrates(meals: Meal[]): number {
  return meals.reduce((a, b) => a + ingredientsCarbohydrates(b.ingredients), 0);
}
export function mealsProteins(meals: Meal[]): number {
  return meals.reduce((a, b) => a + ingredientsProteins(b.ingredients), 0);
}
export function mealsFats(meals: Meal[]): number {
  return meals.reduce((a, b) => a + ingredientsFats(b.ingredients), 0);
}
export function mealsWeight(meals: Meal[]) {
  return meals.reduce((a, b) => a + ingredientsWeight(b.ingredients), 0);
}
