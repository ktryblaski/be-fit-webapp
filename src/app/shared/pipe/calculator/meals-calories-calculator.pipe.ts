import { Pipe, PipeTransform } from '@angular/core';
import {DietMeal} from "../../model/domain/diet";
import {calculateMacronutrientsKCALForWeight} from "../../util/calculator";

@Pipe({
  name: 'mealsCaloriesCalculator'
})
export class MealsCaloriesCalculatorPipe implements PipeTransform {

  transform(meals: DietMeal[]): number {
    const mealsKCALs = meals.map(m =>
      m.meal.ingredients.reduce((a, b) => a + calculateMacronutrientsKCALForWeight(b.product.macronutrients, b.weight), 0)
    );

    return Math.round(
      mealsKCALs.reduce((a, b) => a + b, 0)
    );
  }


}
