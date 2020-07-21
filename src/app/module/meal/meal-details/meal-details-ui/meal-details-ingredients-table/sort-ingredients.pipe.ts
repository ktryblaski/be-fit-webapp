import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../../../../../shared/model/domain/ingredient";
import {localeCompare} from "../../../../../shared/util/locale-compare";
import {handleNullArray} from "../../../../../shared/util/commons";

@Pipe({
  name: 'sortIngredients'
})
export class SortIngredientsPipe implements PipeTransform {

  transform(ingredients: Ingredient[]): Ingredient[] {
    return [...handleNullArray(ingredients)].sort(this.ingredientCompare);
  }

  private ingredientCompare(a: Ingredient, b: Ingredient) {
    return localeCompare(a.product.name, b.product.name);
  }

}
