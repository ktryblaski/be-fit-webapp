import { Pipe, PipeTransform } from '@angular/core';
import {DietMeal} from "../../model/domain/diet";
import {mealsKCAL} from "../../util/calculator";

@Pipe({
  name: 'mealsCaloriesCalculator'
})
export class MealsCaloriesCalculatorPipe implements PipeTransform {

  transform(meals: DietMeal[]): number {
    return Math.round(
      mealsKCAL(meals.map(m => m.meal))
    );
  }

}
