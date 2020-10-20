import { Pipe, PipeTransform } from '@angular/core';
import { Macronutrients } from '../../model/domain/macronutrients';
import { macronutrientsFatsForWeight } from '../../util/calculator/macronutrients-calculator';

@Pipe({
  name: 'macronutrientsFatsCalculator'
})
export class MacronutrientsFatsCalculatorPipe implements PipeTransform {

  transform(macronutrients: Macronutrients, weight?: number): number {
    return Math.round(
      macronutrientsFatsForWeight(macronutrients, weight)
    );
  }

}
