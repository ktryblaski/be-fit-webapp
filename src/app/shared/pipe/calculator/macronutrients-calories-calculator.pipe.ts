import { Pipe, PipeTransform } from '@angular/core';
import {Macronutrients} from "../../model/domain/macronutrients";
import {calculateMacronutrientsKCALForWeight} from "../../util/calculator";

@Pipe({
  name: 'macronutrientsCaloriesCalculator'
})
export class MacronutrientsCaloriesCalculatorPipe implements PipeTransform {

  transform(macronutrients: Macronutrients, weight?: number): number {
    return Math.round(
      calculateMacronutrientsKCALForWeight(macronutrients, weight)
    );
  }

}