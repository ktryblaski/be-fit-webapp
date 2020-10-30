import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from '../../model/domain/ingredient';
import { ingredientsCalories } from '../../util/calculator/ingredients-calculator';

@Pipe({
  name: 'ingredientsCaloriesCalculator',
})
export class IngredientsCaloriesCalculatorPipe implements PipeTransform {
  transform(ingredients: Ingredient[]): number {
    return Math.round(ingredientsCalories(ingredients));
  }
}
