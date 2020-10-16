import { Product } from '../../../../shared/model/domain/product';

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
