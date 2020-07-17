import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../model/domain/ingredient";

@Pipe({
  name: 'mealCaloriesCalculator'
})
export class MealCaloriesCalculatorPipe implements PipeTransform {

  transform(ingredients: Ingredient[]): number {
    return Math.round(
      ingredients.map(i =>
        i.weight / 100.0 *
        (i.product.macronutrients.carbohydrates * 4 + i.product.macronutrients.proteins * 4 + i.product.macronutrients.fats * 9)
      ).reduce((a, b) => a + b)
    );
  }

}
