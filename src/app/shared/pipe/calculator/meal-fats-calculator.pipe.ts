import { Pipe, PipeTransform } from '@angular/core';
import {Meal} from "../../model/domain/meal";

@Pipe({
  name: 'mealFatsCalculator'
})
export class MealFatsCalculatorPipe implements PipeTransform {

  transform(meal: Meal): number {
    return Math.round(
      meal.ingredients.map(
        i => i.weight / 100. * i.product.macronutrients.fats
      ).reduce((a, b) => a + b, 0)
    );
  }

}
