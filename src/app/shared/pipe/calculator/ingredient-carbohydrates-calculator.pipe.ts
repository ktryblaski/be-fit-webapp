import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../model/domain/ingredient";
import {calculateCarbohydratesForWeight} from "../../util/calculator";

@Pipe({
  name: 'ingredientCarbohydratesCalculator'
})
export class IngredientCarbohydratesCalculatorPipe implements PipeTransform {

  transform(ingredient: Ingredient): number {
    return Math.round(
      calculateCarbohydratesForWeight(ingredient.product.macronutrients, ingredient.weight)
    );
  }

}
