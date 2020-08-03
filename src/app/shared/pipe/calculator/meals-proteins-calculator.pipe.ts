import { Pipe, PipeTransform } from '@angular/core';
import {DietMeal} from "../../model/domain/diet";
import {mealsProteins} from "../../util/calculator";

@Pipe({
  name: 'mealsProteinsCalculator'
})
export class MealsProteinsCalculatorPipe implements PipeTransform {

  transform(meals: DietMeal[]): number {
    return Math.round(
      mealsProteins(meals.map(m => m.meal))
    );
  }

}
