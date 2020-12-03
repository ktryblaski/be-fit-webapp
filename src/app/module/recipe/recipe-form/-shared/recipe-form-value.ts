import { Product } from '../../../product/-model/product';

export interface RecipeFormValue {
  name: string;
  description: string;
  ingredients: RecipeFormIngredientValue[];
}

export interface RecipeFormIngredientValue {
  id: number | null;
  weight: number;
  product: Product;
}
