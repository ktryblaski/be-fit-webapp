import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../model/domain/ingredient";

@Pipe({
  name: 'ingredientCarbohydratesCalculator'
})
export class IngredientCarbohydratesCalculatorPipe implements PipeTransform {

  transform(ingredient: Ingredient): unknown {
    return Math.round(
      ingredient.weight / 100.0 * ingredient.product.macronutrients.carbohydrates
    );
  }

}
