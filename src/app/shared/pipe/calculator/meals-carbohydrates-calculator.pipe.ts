import { Pipe, PipeTransform } from '@angular/core';
import {DietMeal} from "../../model/domain/diet";
import {mealsCarbohydrates} from "../../util/calculator";

@Pipe({
  name: 'mealsCarbohydratesCalculator'
})
export class MealsCarbohydratesCalculatorPipe implements PipeTransform {

  transform(meals: DietMeal[]): number {
    return Math.round(
      mealsCarbohydrates(meals.map(m => m.meal))
    );
  }

}
