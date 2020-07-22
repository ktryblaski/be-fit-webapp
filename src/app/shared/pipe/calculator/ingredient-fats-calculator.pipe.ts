import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../model/domain/ingredient";
import {calculateFatsForWeight} from "../../util/calculator";

@Pipe({
  name: 'ingredientFatsCalculator'
})
export class IngredientFatsCalculatorPipe implements PipeTransform {

  transform(ingredient: Ingredient): number {
    return Math.round(
      calculateFatsForWeight(ingredient.product.macronutrients, ingredient.weight)
    );
  }

}
