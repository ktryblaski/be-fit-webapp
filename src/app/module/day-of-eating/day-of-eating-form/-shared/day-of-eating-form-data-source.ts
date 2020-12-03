import { Recipe } from '../../../../shared/model/domain/recipe';
import { Product } from '../../../product/-model/product';

export interface DayOfEatingFormDataSource {
  products: Product[];
  recipes: Recipe[];
}
