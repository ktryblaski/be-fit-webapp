import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from '../../model/domain/ingredient';
import {ingredientsProteins} from '../../util/calculator';

@Pipe({
  name: 'ingredientsProteinsCalculator'
})
export class IngredientsProteinsCalculatorPipe implements PipeTransform {

  transform(ingredients: Ingredient[]): number {
    return Math.round(
      ingredientsProteins(ingredients)
    );
  }

}
