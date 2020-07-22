import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../model/domain/ingredient";
import {calculateFatsForWeight} from "../../util/calculator";

@Pipe({
  name: 'mealFatsCalculator'
})
export class MealFatsCalculatorPipe implements PipeTransform {

  transform(ingredients: Ingredient[]): number {
    const fats = ingredients.map(i => calculateFatsForWeight(i.product.macronutrients, i.weight));

    return Math.round(
      fats.reduce((a, b) => a + b, 0)
    );
  }

}
