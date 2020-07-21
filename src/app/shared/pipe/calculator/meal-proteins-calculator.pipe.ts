import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../model/domain/ingredient";

@Pipe({
  name: 'mealProteinsCalculator'
})
export class MealProteinsCalculatorPipe implements PipeTransform {

  transform(ingredients: Ingredient[]): number {
    return Math.round(
      ingredients.map(
        i => i.weight / 100.0 * i.product.macronutrients.proteins
      ).reduce((a, b) => a + b, 0)
    );
  }

}
