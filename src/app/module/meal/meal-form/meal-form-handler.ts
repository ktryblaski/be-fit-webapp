import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Meal } from '../../../shared/model/domain/meal';
import { Ingredient } from '../../../shared/model/domain/ingredient';
import { Product } from '../../../shared/model/domain/product';

export class MealFormHandler {

  form: FormGroup;

  constructor(meal?: Meal) {
    this.form = this.createEmptyForm();

    if (meal) {
      this.patchMeal(meal);
    }
  }

  public addIngredient(product: Product, weight: number): void {
    (this.form.get('ingredients') as FormArray).push(
      new FormGroup({
        product: new FormControl(product, Validators.required),
        weight: new FormControl(weight, Validators.required)
      })
    );
  }

  public addNewIngredient(product: Product): void {
    this.addIngredient(product, 100);
  }

  public removeIngredient(productId: number): void {
    const formArray = this.form.get('ingredients') as FormArray;

    for (let i = 0 ; i < formArray.length ; ++i) {
      const currentProduct = formArray.at(i).get('product').value as Product;

      if (currentProduct.id === productId) {
        formArray.removeAt(i);
        break;
      }
    }
  }

  private createEmptyForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      ingredients: new FormArray([], Validators.required),
      product: new FormControl(null),
    });
  }

  private patchMeal(meal: Meal): void {
    this.form.patchValue({
      name: meal.name,
      description: meal.description
    });

    (meal.ingredients || []).forEach((ingredient: Ingredient) => {
      this.addIngredient(ingredient.product, ingredient.weight);
    });
  }

}
