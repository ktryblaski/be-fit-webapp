import { Ingredient, IngredientDTO } from './ingredient';

export interface MealTemplate {
  id: number | null;
  name: string;
  description: string;
  active: boolean;
  ingredients: Ingredient[];
}

export interface MealTemplateCU {
  id: number | null;
  name: string;
  description: string;
  active?: boolean;
  ingredients: IngredientDTO[];
}
