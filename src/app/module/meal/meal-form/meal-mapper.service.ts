import { Injectable } from '@angular/core';
import { MealFormHandler } from './meal-form-handler';
import { FormArray } from '@angular/forms';
import { Product } from '../../../shared/model/domain/product';
import { MealDTO } from '../../../shared/model/domain/meal';
import { IngredientDTO } from '../../../shared/model/domain/ingredient';

@Injectable({
  providedIn: 'root'
})
export class MealMapperService {

  map(formHandler: MealFormHandler): MealDTO {
    return {
      name: formHandler.form.get('name').value,
      description: formHandler.form.get('description').value,
      ingredients: this.mapIngredients(formHandler)
    };
  }

  mapIngredients(formHandler: MealFormHandler): IngredientDTO[] {
    const ingredients = formHandler.form.get('ingredients') as FormArray;
    return ingredients.controls.map((ingredient) => {
      return {
        productId: (ingredient.get('product').value as Product).id,
        weight: ingredient.get('weight').value
      };
    });
  }

}
