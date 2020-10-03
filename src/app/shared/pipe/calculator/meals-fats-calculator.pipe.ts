import { Pipe, PipeTransform } from '@angular/core';
import {DietMeal} from '../../model/domain/diet';
import {mealsFats} from '../../util/calculator';

@Pipe({
  name: 'mealsFatsCalculator'
})
export class MealsFatsCalculatorPipe implements PipeTransform {

  transform(meals: DietMeal[]): number {
    return Math.round(
      mealsFats(meals.map(m => m.meal))
    );
  }

}
