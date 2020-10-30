import { Pipe, PipeTransform } from '@angular/core';
import { mealsFats } from '../../util/calculator/meals-calculator';
import { Meal } from '../../model/domain/meal';

@Pipe({
  name: 'mealsFatsCalculator',
})
export class MealsFatsCalculatorPipe implements PipeTransform {
  transform(meals: Meal[]): number {
    return Math.round(mealsFats(meals));
  }
}
