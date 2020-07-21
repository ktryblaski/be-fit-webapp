import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../model/domain/ingredient";

@Pipe({
  name: 'mealFatsCalculator'
})
export class MealFatsCalculatorPipe implements PipeTransform {

  transform(ingredients: Ingredient[]): number {
    return Math.round(
      ingredients.map(
        i => i.weight / 100.0 * i.product.macronutrients.fats
      ).reduce((a, b) => a + b, 0)
    );
  }

}
