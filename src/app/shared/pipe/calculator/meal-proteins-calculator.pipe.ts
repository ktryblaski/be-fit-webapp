import { Pipe, PipeTransform } from '@angular/core';
import {Meal} from "../../model/domain/meal";

@Pipe({
  name: 'mealProteinsCalculator'
})
export class MealProteinsCalculatorPipe implements PipeTransform {

  transform(meal: Meal): number {
    return Math.round(
      meal.ingredients.map(
        i => i.weight / 100. * i.product.macronutrients.proteins
      ).reduce((a, b) => a + b, 0)
    );

  }

}
