import { Pipe, PipeTransform } from '@angular/core';
import { mealsProteins } from '../../util/calculator/meals-calculator';
import { Meal } from '../../model/domain/meal';

@Pipe({
  name: 'mealsProteinsCalculator',
})
export class MealsProteinsCalculatorPipe implements PipeTransform {
  transform(meals: Meal[]): number {
    return Math.round(mealsProteins(meals));
  }
}
