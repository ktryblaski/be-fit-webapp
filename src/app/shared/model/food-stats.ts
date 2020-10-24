import { Macronutrients } from './domain/macronutrients';
import {
  macronutrientsCaloriesForWeight,
  macronutrientsCarbohydratesForWeight,
  macronutrientsFatsForWeight,
  macronutrientsProteinsForWeight,
} from '../util/calculator/macronutrients-calculator';

export interface FoodStats {
  proteins: number;
  fats: number;
  carbohydrates: number;
  weight: number;
  calories: number;
}

export function emptyFoodStats(): FoodStats {
  return {
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    weight: 0,
    calories: 0,
  };
}

export function roundFoodStats(foodStats: FoodStats): FoodStats {
  return {
    proteins: Math.round(foodStats.proteins),
    fats: Math.round(foodStats.fats),
    carbohydrates: Math.round(foodStats.carbohydrates),
    weight: Math.round(foodStats.weight),
    calories: Math.round(foodStats.calories),
  };
}

export function addFoodStats(a: FoodStats, b: FoodStats): FoodStats {
  return {
    proteins: a.proteins + b.proteins,
    fats: a.fats + b.fats,
    carbohydrates: a.carbohydrates + b.carbohydrates,
    weight: a.weight + b.weight,
    calories: a.calories + b.calories,
  };
}

export function foodStatsForMacronutrients(macronutrients: Macronutrients, weight: number): FoodStats {
  return {
    proteins: macronutrientsProteinsForWeight(macronutrients, weight),
    fats: macronutrientsFatsForWeight(macronutrients, weight),
    carbohydrates: macronutrientsCarbohydratesForWeight(macronutrients, weight),
    weight: 0, // TODO
    calories: macronutrientsCaloriesForWeight(macronutrients, weight),
  };
}
