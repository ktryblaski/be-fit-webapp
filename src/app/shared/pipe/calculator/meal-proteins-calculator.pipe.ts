import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../model/domain/ingredient";
import {calculateProteinsForWeight} from "../../util/calculator";

@Pipe({
  name: 'mealProteinsCalculator'
})
export class MealProteinsCalculatorPipe implements PipeTransform {

  transform(ingredients: Ingredient[]): number {
    const proteins = ingredients.map(i => calculateProteinsForWeight(i.product.macronutrients, i.weight));

    return Math.round(
      proteins.reduce((a, b) => a + b, 0)
    );
  }

}
