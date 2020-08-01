import { Pipe, PipeTransform } from '@angular/core';
import {DietMeal} from "../../model/domain/diet";
import {calculateFatsForWeight} from "../../util/calculator";

@Pipe({
  name: 'mealsFatsCalculator'
})
export class MealsFatsCalculatorPipe implements PipeTransform {

  transform(meals: DietMeal[]): number {
    const mealsFats = meals.map(m =>
      m.meal.ingredients.reduce((a, b) => a + calculateFatsForWeight(b.product.macronutrients, b.weight), 0)
    );

    return Math.round(
      mealsFats.reduce((a, b) => a + b, 0)
    );
  }

}
