import { Product } from '../../../../shared/model/domain/product';

export interface DayOfEatingFormValue {
  meals: DayOfEatingFormMealValue[];
}

export interface DayOfEatingFormMealValue {
  name: string;
  description: string;
  ingredients: DayOfEatingFormIngredientValue[];
}

export interface DayOfEatingFormIngredientValue {
  product: Product;
  weight: number;
}
