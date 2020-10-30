import { Pipe, PipeTransform } from '@angular/core';
import { Macronutrients } from '../../model/domain/macronutrients';
import { macronutrientsCaloriesForWeight } from '../../util/calculator/macronutrients-calculator';

@Pipe({
  name: 'macronutrientsCaloriesCalculator',
})
export class MacronutrientsCaloriesCalculatorPipe implements PipeTransform {
  transform(macronutrients: Macronutrients, weight?: number): number {
    return Math.round(macronutrientsCaloriesForWeight(macronutrients, weight));
  }
}
