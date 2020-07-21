import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../model/domain/ingredient";

@Pipe({
  name: 'mealCarbohydratesCalculator'
})
export class MealCarbohydratesCalculatorPipe implements PipeTransform {

  transform(ingredients: Ingredient[]): number {
    return Math.round(
      ingredients.map(
        i => i.weight / 100.0 * i.product.macronutrients.carbohydrates
      ).reduce((a, b) => a + b, 0)
    );
  }

}
