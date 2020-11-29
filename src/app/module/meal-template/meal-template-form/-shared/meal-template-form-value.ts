import { Product } from '../../../product/-model/product';

export interface MealTemplateFormValue {
  name: string;
  description: string;
  ingredients: MealTemplateFormIngredientValue[];
}

export interface MealTemplateFormIngredientValue {
  id: number | null;
  weight: number;
  product: Product;
}
