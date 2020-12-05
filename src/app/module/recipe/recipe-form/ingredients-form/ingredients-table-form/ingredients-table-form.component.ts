import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { RecipeFormHandler } from '../../recipe-form-handler';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FoodStats } from '../../../../../shared/model/food-stats';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  ingredientsCalories,
  ingredientsCarbohydrates,
  ingredientsFats,
  ingredientsProteins,
  ingredientsWeight,
} from '../../../../../shared/util/calculator/ingredients-calculator';
import { values$ } from '../../../../../shared/form/typed-form/typed-utils';

@Component({
  selector: 'app-ingredients-table-form',
  templateUrl: './ingredients-table-form.component.html',
  styleUrls: ['./ingredients-table-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsTableFormComponent implements OnInit, OnDestroy {

  @Output() removeIngredient = new EventEmitter<number>();

  private readonly stats = new BehaviorSubject<FoodStats | null>(null);

  readonly stats$: Observable<FoodStats | null> = this.stats.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(public formHandler: RecipeFormHandler) { }

  ngOnInit(): void {
    this.subscription = values$(this.formHandler.form.controls.weights).subscribe(weights => this.updateTotalData(weights));
  }

  handleRemoveIngredient(idx: number): void {
    this.removeIngredient.emit(idx);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateTotalData(weights: number[]): void {
    const ingredients = weights.map((weight, idx) => {
      const ingredient = this.formHandler.ingredients[idx];
      const product = ingredient.product;

      return {
        id: ingredient.id,
        weight,
        product: {
          id: product.id,
          name: product.name,
          macronutrients: {
            proteins: product.proteins,
            fats: product.fats,
            carbohydrates: product.carbohydrates,
          },
          favourite: product.favourite
        }
      }
    });

    this.stats.next({
      proteins: Math.round(ingredientsProteins(ingredients)),
      fats: Math.round(ingredientsFats(ingredients)),
      carbohydrates: Math.round(ingredientsCarbohydrates(ingredients)),
      weight: ingredientsWeight(ingredients),
      calories: Math.round(ingredientsCalories(ingredients)),
    });
  }
}
