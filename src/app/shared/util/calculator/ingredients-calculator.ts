import { Ingredient } from '../../model/domain/ingredient';
import {
  macronutrientsCaloriesForWeight,
  macronutrientsCarbohydratesForWeight,
  macronutrientsFatsForWeight,
  macronutrientsProteinsForWeight
} from './macronutrients-calculator';

export function ingredientsCalories(ingredients: Ingredient[]): number {
  return ingredients.reduce((a, b) => a + macronutrientsCaloriesForWeight(b.product.macronutrients, b.weight), 0);
}
export function ingredientsProteins(ingredients: Ingredient[]): number {
  return ingredients.reduce((a, b) => a + macronutrientsProteinsForWeight(b.product.macronutrients, b.weight), 0);
}
export function ingredientsFats(ingredients: Ingredient[]): number {
  return ingredients.reduce((a, b) => a + macronutrientsFatsForWeight(b.product.macronutrients, b.weight), 0);
}
export function ingredientsCarbohydrates(ingredients: Ingredient[]): number {
  return ingredients.reduce((a, b) => a + macronutrientsCarbohydratesForWeight(b.product.macronutrients, b.weight), 0);
}
export function ingredientsWeight(ingredients: Ingredient[]) {
  return ingredients.reduce((a, b) => a + Number(b.weight), 0);
}
