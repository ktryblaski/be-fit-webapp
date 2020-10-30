import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from '../../model/domain/ingredient';
import { ingredientsWeight } from '../../util/calculator/ingredients-calculator';

@Pipe({
  name: 'ingredientsWeightCalculator',
})
export class IngredientsWeightCalculatorPipe implements PipeTransform {
  transform(ingredients: Ingredient[]): number {
    return ingredientsWeight(ingredients);
  }
}
