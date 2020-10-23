import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from '../../../model/domain/ingredient';
import { handleNullArray, stringCompare } from '../../../util/commons';

@Pipe({
  name: 'sortIngredients'
})
export class SortIngredientsPipe implements PipeTransform {

  transform(ingredients: Ingredient[]): Ingredient[] {
    return [...handleNullArray(ingredients)].sort(this.ingredientCompare);
  }

  private ingredientCompare(a: Ingredient, b: Ingredient) {
    return stringCompare(a.product.name, b.product.name);
  }

}
