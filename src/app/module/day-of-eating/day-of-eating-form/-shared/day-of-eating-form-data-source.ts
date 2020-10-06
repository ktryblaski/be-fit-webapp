import { Product } from '../../../../shared/model/domain/product';
import { MealTemplate } from '../../../../shared/model/domain/meal-template';

export interface DayOfEatingFormDataSource {
  products: Product[];
  mealTemplates: MealTemplate[];
}
