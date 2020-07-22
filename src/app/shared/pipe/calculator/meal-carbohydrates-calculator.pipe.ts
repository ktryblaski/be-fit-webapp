import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../model/domain/ingredient";
import {calculateCarbohydratesForWeight} from "../../util/calculator";

@Pipe({
  name: 'mealCarbohydratesCalculator'
})
export class MealCarbohydratesCalculatorPipe implements PipeTransform {

  transform(ingredients: Ingredient[]): number {
    const carbohydrates = ingredients.map(i => calculateCarbohydratesForWeight(i.product.macronutrients, i.weight));

    return Math.round(
      carbohydrates.reduce((a, b) => a + b, 0)
    );
  }

}
