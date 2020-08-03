import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../model/domain/ingredient";
import {ingredientsCarbohydrates} from "../../util/calculator";

@Pipe({
  name: 'ingredientsCarbohydratesCalculator'
})
export class IngredientsCarbohydratesCalculatorPipe implements PipeTransform {

  transform(ingredients: Ingredient[]): number {
    return Math.round(
      ingredientsCarbohydrates(ingredients)
    );
  }

}
