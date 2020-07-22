import {Macronutrients} from "../model/domain/macronutrients";

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
