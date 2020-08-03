import { Pipe, PipeTransform } from '@angular/core';
import {DietMeal} from "../../model/domain/diet";
import {mealsWeight} from "../../util/calculator";

@Pipe({
  name: 'mealsWeightCalculator'
})
export class MealsWeightCalculatorPipe implements PipeTransform {

  transform(meals: DietMeal[]): number {
    return Math.round(
      mealsWeight(meals.map(m => m.meal))
    );
  }

}
