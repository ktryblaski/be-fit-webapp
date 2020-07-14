import { Pipe, PipeTransform } from '@angular/core';
import {Macronutrients} from "../model/domain/macronutrients";

@Pipe({
  name: 'caloriesCalculator'
})
export class CaloriesCalculatorPipe implements PipeTransform {

  transform(macronutrients: Macronutrients): number {
    if(!macronutrients) {
      return 0;
    }

    return macronutrients.carbohydrates * 4
      + macronutrients.proteins * 4
      + macronutrients.fats * 9;
  }

}
