import { Pipe, PipeTransform } from '@angular/core';
import {DietMeal} from "../../model/domain/diet";
import {calculateProteinsForWeight} from "../../util/calculator";

@Pipe({
  name: 'mealsProteinsCalculator'
})
export class MealsProteinsCalculatorPipe implements PipeTransform {

  transform(meals: DietMeal[]): number {
    const mealsProteins = meals.map(m =>
      m.meal.ingredients.reduce((a, b) => a + calculateProteinsForWeight(b.product.macronutrients, b.weight), 0)
    );

    return Math.round(
      mealsProteins.reduce((a, b) => a + b, 0)
    );
  }

}
