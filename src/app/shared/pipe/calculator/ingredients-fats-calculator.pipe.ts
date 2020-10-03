import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from '../../model/domain/ingredient';
import {ingredientsFats} from '../../util/calculator';

@Pipe({
  name: 'ingredientsFatsCalculator'
})
export class IngredientsFatsCalculatorPipe implements PipeTransform {

  transform(ingredients: Ingredient[]): number {
    return Math.round(
      ingredientsFats(ingredients)
    );
  }

}
