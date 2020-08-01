import { Pipe, PipeTransform } from '@angular/core';
import {DietMeal} from "../../model/domain/diet";
import {calculateCarbohydratesForWeight} from "../../util/calculator";

@Pipe({
  name: 'mealsCarbohydratesCalculator'
})
export class MealsCarbohydratesCalculatorPipe implements PipeTransform {

  transform(meals: DietMeal[]): number {
    const mealsCarbohydrates = meals.map(m =>
      m.meal.ingredients.reduce((a, b) => a + calculateCarbohydratesForWeight(b.product.macronutrients, b.weight), 0)
    );

    return Math.round(
      mealsCarbohydrates.reduce((a, b) => a + b, 0)
    );
  }

}
