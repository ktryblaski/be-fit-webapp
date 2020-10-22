import { Pipe, PipeTransform } from '@angular/core';
import { mealsCalories } from '../../util/calculator/meals-calculator';
import { Meal } from '../../model/domain/meal';

@Pipe({
  name: 'mealsCaloriesCalculator'
})
export class MealsCaloriesCalculatorPipe implements PipeTransform {

  transform(meals: Meal[]): number {
    return Math.round(
      mealsCalories(meals)
    );
  }

}
