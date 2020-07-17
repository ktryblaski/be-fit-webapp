export enum MealType {
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
  SUPPER = "SUPPER",
  BEFORE_WORKOUT = "BEFORE_WORKOUT",
  AFTER_WORKOUT = "AFTER_WORKOUT"
}

export interface MealView {
  id: number,
  name: string,
  description: string,
  type: MealType;
  weight: number,
  carbohydrates: number,
  proteins: number,
  fats: number;
}
