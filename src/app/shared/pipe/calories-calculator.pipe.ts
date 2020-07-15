import { Pipe, PipeTransform } from '@angular/core';
import {Macronutrients} from "../model/domain/macronutrients";
import {calculateMacronutrientsKCAL} from "../util/macronutrients";

@Pipe({
  name: 'caloriesCalculator'
})
export class CaloriesCalculatorPipe implements PipeTransform {

  transform(macronutrients: Macronutrients): number {
    return calculateMacronutrientsKCAL(macronutrients);
  }

}
