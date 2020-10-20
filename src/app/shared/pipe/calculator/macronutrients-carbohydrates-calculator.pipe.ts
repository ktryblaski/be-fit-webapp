import { Pipe, PipeTransform } from '@angular/core';
import { Macronutrients } from '../../model/domain/macronutrients';
import { macronutrientsCarbohydratesForWeight } from '../../util/calculator/macronutrients-calculator';

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
