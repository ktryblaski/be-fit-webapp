import { Pipe, PipeTransform } from '@angular/core';
import { Macronutrients } from '../../model/domain/macronutrients';

@Pipe({
  name: 'toCanvasData',
})
export class ToCanvasDataPipe implements PipeTransform {
  transform(macronutrients: Macronutrients): number[] {
    return [macronutrients.proteins, macronutrients.fats, macronutrients.carbohydrates];
  }
}
