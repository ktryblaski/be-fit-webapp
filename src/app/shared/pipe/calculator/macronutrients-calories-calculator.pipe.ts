import { Pipe, PipeTransform } from '@angular/core';
import {Macronutrients} from "../../model/domain/macronutrients";
import {calculateMacronutrientsKCAL} from "../../util/macronutrients";

@Pipe({
  name: 'macronutrientsCaloriesCalculator'
})
export class MacronutrientsCaloriesCalculatorPipe implements PipeTransform {

  transform(macronutrients: Macronutrients, weight?: number): number {
    const multiplier = (weight != null ? weight : 100) / 100

    return Math.round(
      multiplier * (macronutrients.carbohydrates * 4 + macronutrients.proteins * 4 + macronutrients.fats * 9)
    );
  }

}
