import { Macronutrients } from '../../model/domain/macronutrients';

export function macronutrientsCalories(macronutrients: Macronutrients): number {
  return macronutrients.carbohydrates * 4 + macronutrients.proteins * 4 + macronutrients.fats * 9;
}
export function macronutrientsCaloriesForWeight(macronutrients: Macronutrients, weight: number = 100): number {
  return (weight / 100) * macronutrientsCalories(macronutrients);
}
export function macronutrientsProteinsForWeight(macronutrients: Macronutrients, weight: number = 100): number {
  return (weight / 100) * macronutrients.proteins;
}
export function macronutrientsFatsForWeight(macronutrients: Macronutrients, weight: number = 100): number {
  return (weight / 100) * macronutrients.fats;
}
export function macronutrientsCarbohydratesForWeight(macronutrients: Macronutrients, weight: number = 100): number {
  return (weight / 100) * macronutrients.carbohydrates;
}
