import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../model/domain/ingredient";

@Pipe({
  name: 'mealWeightCalculator'
})
export class MealWeightCalculatorPipe implements PipeTransform {

  transform(ingredients: Ingredient[]): number {
    return ingredients.reduce((a, b) => a + b.weight, 0);
  }

}
