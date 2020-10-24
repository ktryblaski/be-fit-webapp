import { Product } from '../../../../shared/model/domain/product';

export interface DayOfEatingFormValue {
  meals: DayOfEatingFormMealValue[];
}

export interface DayOfEatingFormMealValue {
  id: number | null;
  name: string;
  description: string;
  ingredients: DayOfEatingFormIngredientValue[];
}

export interface DayOfEatingFormIngredientValue {
  id: number | null;
  weight: number;
  product: Product;
}
