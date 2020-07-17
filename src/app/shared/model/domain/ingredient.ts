import {Product} from "./product";

export interface Ingredient {
  id: number;
  weight: number;
  product: Product;
}
