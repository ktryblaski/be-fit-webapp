import { Pipe, PipeTransform } from '@angular/core';
import { DietMeal } from '../../model/domain/diet';
import { mealsCalories } from '../../util/calculator/meals-calculator';

@Pipe({
  name: 'mealsCaloriesCalculator'
})
export class MealsCaloriesCalculatorPipe implements PipeTransform {

  transform(meals: DietMeal[]): number {
    return Math.round(
      mealsCalories(meals.map(m => m.meal))
    );
  }

}
