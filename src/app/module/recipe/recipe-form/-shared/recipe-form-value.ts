export interface RecipeFormValue {
  name: string;
  description: string;
  ingredients: RecipeFormIngredientValue[];
}

export interface RecipeFormIngredientValue {
  id: number | null;
  weight: number;
  product: RecipeFormProductValue;
}

export interface RecipeFormProductValue {
  id: number;
  name: string;
  favourite: boolean;
  proteins: number;
  fats: number;
  carbohydrates: number;
}
