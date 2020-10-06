import { Meal } from './meal';

export interface DayOfEating {
  id: number | null;
  dayDate: number;
  meals: Meal[];
}

export interface DayOfEatingLite {
  id: number;
  dayDate: number;
  mealsNumber: number;
}

