import { Pipe, PipeTransform } from '@angular/core';
import { Macronutrients } from '../../model/domain/macronutrients';
import { macronutrientsProteinsForWeight } from '../../util/calculator/macronutrients-calculator';

@Pipe({
  name: 'macronutrientsProteinsCalculator',
})
export class MacronutrientsProteinsCalculatorPipe implements PipeTransform {
  transform(macronutrients: Macronutrients, weight?: number): number {
    return Math.round(macronutrientsProteinsForWeight(macronutrients, weight));
  }
}
