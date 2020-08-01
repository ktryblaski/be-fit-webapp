import { Pipe, PipeTransform } from '@angular/core';
import {DietMeal} from "../../model/domain/diet";

@Pipe({
  name: 'mealsWeightCalculator'
})
export class MealsWeightCalculatorPipe implements PipeTransform {

  transform(meals: DietMeal[]): number {
    const mealsWeight = meals.map(m => m.meal.ingredients.reduce((a, b) => a + b.weight, 0));
    return mealsWeight.reduce((a, b) => a + b, 0);
  }

}
