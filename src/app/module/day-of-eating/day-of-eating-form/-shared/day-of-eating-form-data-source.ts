import { Recipe } from '../../../recipe/-model/recipe';
import { Product } from '../../../product/-model/product';

export interface DayOfEatingFormDataSource {
  products: Product[];
  recipes: Recipe[];
}
