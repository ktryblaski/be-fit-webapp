import { Ingredient, IngredientDTO } from '../../../../shared/model/domain/ingredient';

export interface Recipe {
  id: number | null;
  name: string;
  description: string;
  active: boolean;
  ingredients: Ingredient[];
}

export interface RecipeCU {
  id: number | null;
  name: string;
  description: string;
  active?: boolean;
  ingredients: IngredientDTO[];
}
