import { Pipe, PipeTransform } from '@angular/core';
import {Meal} from "../../model/domain/meal";

@Pipe({
  name: 'mealCarbohydratesCalculator'
})
export class MealCarbohydratesCalculatorPipe implements PipeTransform {

  transform(meal: Meal): number {
    return Math.round(
      meal.ingredients.map(
        i => i.weight / 100. * i.product.macronutrients.carbohydrates
      ).reduce((a, b) => a + b, 0)
    );

  }

}
