import { Product } from './product';

export interface Ingredient {
  id?: number;
  weight: number;
  product: Product;
}

export interface IngredientDTO {
  id: number | null;
  productId: number;
  weight: number;
}
