import { Pipe, PipeTransform } from '@angular/core';
import {Meal} from "../../model/domain/meal";

@Pipe({
  name: 'mealWeightCalculator'
})
export class MealWeightCalculatorPipe implements PipeTransform {

  transform(meal: Meal): number {
    return meal.ingredients.reduce((a, b) => a + b.weight, 0);
  }

}
