import { Pipe, PipeTransform } from '@angular/core';
import { mealsCarbohydrates } from '../../util/calculator/meals-calculator';
import { Meal } from '../../model/domain/meal';

@Pipe({
  name: 'mealsCarbohydratesCalculator',
})
export class MealsCarbohydratesCalculatorPipe implements PipeTransform {
  transform(meals: Meal[]): number {
    return Math.round(mealsCarbohydrates(meals));
  }
}
