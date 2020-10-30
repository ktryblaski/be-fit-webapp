import { Pipe, PipeTransform } from '@angular/core';
import { mealsWeight } from '../../util/calculator/meals-calculator';
import { Meal } from '../../model/domain/meal';

@Pipe({
  name: 'mealsWeightCalculator',
})
export class MealsWeightCalculatorPipe implements PipeTransform {
  transform(meals: Meal[]): number {
    return Math.round(mealsWeight(meals));
  }
}
