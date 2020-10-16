import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ingredientWeight'
})
export class IngredientWeightPipe implements PipeTransform {

  transform(weight: number | null): number {
    return weight ?? 0;
  }

}
