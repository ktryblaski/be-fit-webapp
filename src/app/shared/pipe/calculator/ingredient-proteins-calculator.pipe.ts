import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../model/domain/ingredient";
import {calculateProteinsForWeight} from "../../util/calculator";

@Pipe({
  name: 'ingredientProteinsCalculator'
})
export class IngredientProteinsCalculatorPipe implements PipeTransform {

  transform(ingredient: Ingredient): number {
    return Math.round(
      calculateProteinsForWeight(ingredient.product.macronutrients, ingredient.weight)
    );
  }

}
