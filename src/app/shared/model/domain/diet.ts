import {Meal, MealType} from "./meal";

export enum DietType {
  CUTTING = "CUTTING",
  KEEPING = "KEEPING",
  BULKING = "BULKING"
}

export interface Diet {
  id?: number,
  name: string,
  description: string,
  startDate: number,
  endDate: number,
  type: DietType,
  meals: DietMeal[]
}

export interface DietView {
  id: number,
  name: string,
  startDate: number,
  endDate: number,
  type: DietType,
  carbohydrates: number,
  proteins: number,
  fats: number;
  meals: number;
}

export interface DietMeal {
  id?: number,
  mealType: MealType,
  meal: Meal
}

export interface DietDTO {
  id?: number,
  name: string,
  description: string,
  startDate: number,
  endDate: number,
  type: DietType,
  meals: DietMeal[]
}