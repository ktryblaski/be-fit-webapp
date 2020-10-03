import {Product} from './product';

export interface Ingredient {
  id?: number;
  weight: number;
  product: Product;
}

export interface IngredientDTO {
  productId: number;
  weight: number;
}
