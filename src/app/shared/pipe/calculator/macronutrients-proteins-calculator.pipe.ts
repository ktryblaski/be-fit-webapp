import { Pipe, PipeTransform } from '@angular/core';
import {macronutrientsProteinsForWeight} from "../../util/calculator";
import {Macronutrients} from "../../model/domain/macronutrients";

@Pipe({
  name: 'macronutrientsProteinsCalculator'
})
export class MacronutrientsProteinsCalculatorPipe implements PipeTransform {

  transform(macronutrients: Macronutrients, weight?: number): number {
    return Math.round(
      macronutrientsProteinsForWeight(macronutrients, weight)
    );
  }

}
