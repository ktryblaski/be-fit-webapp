import { Product } from '../../../secured/module/product/-model/product';

export interface Ingredient {
  id?: number;
  product: Product;
  weight: number;
}

export interface IngredientDTO {
  id: number | null;
  productId: number;
  weight: number;
}
