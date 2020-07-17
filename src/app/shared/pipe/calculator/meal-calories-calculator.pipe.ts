import { Pipe, PipeTransform } from '@angular/core';
import {Meal} from "../../model/domain/meal";

@Pipe({
  name: 'mealCaloriesCalculator'
})
export class MealCaloriesCalculatorPipe implements PipeTransform {

  transform(meal: Meal): number {
    return Math.round(
      meal.ingredients.map(i =>
        i.weight / 100.0 *
        (i.product.macronutrients.carbohydrates * 4 + i.product.macronutrients.proteins * 4 + i.product.macronutrients.fats * 9)
      ).reduce((a, b) => a + b)
    );
  }

}
