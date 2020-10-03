import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from '../../model/domain/ingredient';
import {ingredientsKCAL} from '../../util/calculator';

@Pipe({
  name: 'ingredientsCaloriesCalculator'
})
export class IngredientsCaloriesCalculatorPipe implements PipeTransform {

  transform(ingredients: Ingredient[]): number {
    return Math.round(
      ingredientsKCAL(ingredients)
    );
  }

}
