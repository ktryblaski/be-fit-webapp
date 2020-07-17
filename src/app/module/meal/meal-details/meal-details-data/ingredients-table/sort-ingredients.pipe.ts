import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../../../../shared/model/domain/ingredient";
import {localeCompare} from "../../../../../shared/util/locale-compare";

@Pipe({
  name: 'sortIngredients'
})
export class SortIngredientsPipe implements PipeTransform {

  transform(ingredients: Ingredient[]): Ingredient[] {
    return [...ingredients].sort(this.ingredientCompare);
  }

  private ingredientCompare(a: Ingredient, b: Ingredient) {
    if(a?.product && b?.product) {
      return localeCompare(a.product.name, b.product.name);
    }

    if(!a?.product && b?.product) {
      return -1;
    }

    if(a?.product && !b?.product) {
      return 1;
    }

    return 0;
  }

}
