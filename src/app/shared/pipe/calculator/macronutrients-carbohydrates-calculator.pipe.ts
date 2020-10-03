import { Pipe, PipeTransform } from '@angular/core';
import {macronutrientsCarbohydratesForWeight} from '../../util/calculator';
import {Macronutrients} from '../../model/domain/macronutrients';

@Pipe({
  name: 'macronutrientsCarbohydratesCalculator'
})
export class MacronutrientsCarbohydratesCalculatorPipe implements PipeTransform {

  transform(macronutrients: Macronutrients, weight?: number): number {
    return Math.round(
      macronutrientsCarbohydratesForWeight(macronutrients, weight)
    );
  }

}
