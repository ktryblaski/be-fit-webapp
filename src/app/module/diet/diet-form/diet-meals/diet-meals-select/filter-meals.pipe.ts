import { Pipe, PipeTransform } from '@angular/core';
import { MealView } from '../../../../../shared/model/domain/meal';

@Pipe({
  name: 'filterMeals',
})
export class FilterMealsPipe implements PipeTransform {
  transform(meals: MealView[], selectedMeals: number[]): MealView[] {
    return meals.filter(meal => selectedMeals.indexOf(meal.id) === -1);
  }
}
