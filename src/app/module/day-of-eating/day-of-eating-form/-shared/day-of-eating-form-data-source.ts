import { MealTemplate } from '../../../../shared/model/domain/meal-template';
import { Product } from '../../../product/-model/product';

export interface DayOfEatingFormDataSource {
  products: Product[];
  mealTemplates: MealTemplate[];
}
