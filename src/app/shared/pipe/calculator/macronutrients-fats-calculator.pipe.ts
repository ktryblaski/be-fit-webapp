import { Pipe, PipeTransform } from '@angular/core';
import {macronutrientsFatsForWeight} from "../../util/calculator";
import {Macronutrients} from "../../model/domain/macronutrients";

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
