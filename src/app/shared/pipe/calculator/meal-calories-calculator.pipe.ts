import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../model/domain/ingredient";
import {calculateMacronutrientsKCALForWeight} from "../../util/calculator";

@Pipe({
  name: 'mealCaloriesCalculator'
})
export class MealCaloriesCalculatorPipe implements PipeTransform {

  transform(ingredients: Ingredient[]): number {
    const calories = ingredients.map(i => calculateMacronutrientsKCALForWeight(i.product.macronutrients, i.weight));

    return Math.round(
      calories.reduce((a, b) => a + b, 0)
    );
  }

}
