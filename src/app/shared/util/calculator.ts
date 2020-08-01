import {Macronutrients} from "../model/domain/macronutrients";
import {Ingredient} from "../model/domain/ingredient";

export function calculateMacronutrientsKCAL(macronutrients: Macronutrients): number {
  return (macronutrients?.carbohydrates ?? 0) * 4 + (macronutrients?.proteins ?? 0) * 4 + (macronutrients?.fats ?? 0) * 9
}

export function calculateMacronutrientsKCALForWeight(macronutrients: Macronutrients, weight?: number): number {
  return ((weight ?? 100) / 100) * calculateMacronutrientsKCAL(macronutrients);
}

export function calculateCarbohydratesForWeight(macronutrients: Macronutrients, weight?: number): number {
  return ((weight ?? 100) / 100) * (macronutrients?.carbohydrates ?? 0);
}

export function calculateProteinsForWeight(macronutrients: Macronutrients, weight?: number): number {
  return ((weight ?? 100) / 100) * (macronutrients?.proteins ?? 0);
}

export function calculateFatsForWeight(macronutrients: Macronutrients, weight?: number): number {
  return ((weight ?? 100) / 100) * (macronutrients?.fats ?? 0);
}




export function macronutrientsKCAL(macronutrients: Macronutrients): number {
  return (macronutrients?.carbohydrates ?? 0) * 4 + (macronutrients?.proteins ?? 0) * 4 + (macronutrients?.fats ?? 0) * 9
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

export function ingredientsKCAL(ingredients: Ingredient[]): number {
  return ingredients.reduce((a, b) => a + macronutrientsKCALForWeight(b.product.macronutrients, b.weight), 0)
}

export function ingredientsCarbohydrates(ingredients: Ingredient[]): number {
  return ingredients.reduce((a, b) => a + macronutrientsCarbohydratesForWeight(b.product.macronutrients, b.weight), 0)
}

export function ingredientsProteins(ingredients: Ingredient[]): number {
  return ingredients.reduce((a, b) => a + macronutrientsProteinsForWeight(b.product.macronutrients, b.weight), 0)
}

export function ingredientsFats(ingredients: Ingredient[]): number {
  return ingredients.reduce((a, b) => a + macronutrientsFatsForWeight(b.product.macronutrients, b.weight), 0)
}

