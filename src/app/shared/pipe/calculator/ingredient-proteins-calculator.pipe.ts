import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../model/domain/ingredient";

@Pipe({
  name: 'ingredientProteinsCalculator'
})
export class IngredientProteinsCalculatorPipe implements PipeTransform {

  transform(ingredient: Ingredient): unknown {
    return Math.round(
      ingredient.weight / 100.0 * ingredient.product.macronutrients.proteins
    );
  }

}
