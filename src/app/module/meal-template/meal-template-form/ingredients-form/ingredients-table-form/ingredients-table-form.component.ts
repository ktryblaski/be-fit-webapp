import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MealTemplateFormHandler } from '../../meal-template-form-handler';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FoodStats } from '../../../../../shared/model/food-stats';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  ingredientsCalories,
  ingredientsCarbohydrates,
  ingredientsFats,
  ingredientsProteins, ingredientsWeight
} from '../../../../../shared/util/calculator/ingredients-calculator';
import { values$ } from '../../../../../shared/form/typed-form/typed-utils';

@Component({
  selector: 'app-ingredients-table-form',
  templateUrl: './ingredients-table-form.component.html',
  styleUrls: ['./ingredients-table-form.component.scss']
})
export class IngredientsTableFormComponent implements OnInit, OnDestroy {

  @Output() removeIngredient = new EventEmitter<number>();

  private readonly stats = new BehaviorSubject<FoodStats | null>(null);

  readonly stats$: Observable<FoodStats | null> = this.stats.pipe(distinctUntilChanged());

  subscription: Subscription;

  constructor(public formHandler: MealTemplateFormHandler) { }

  ngOnInit(): void {
    this.subscription = values$(this.formHandler.form.controls.ingredients).subscribe(weights => this.updateTotalData(weights));
  }

  handleRemoveIngredient(idx: number): void {
    this.removeIngredient.emit(idx);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateTotalData(weights: number[]): void {
    const ingredients = weights.map((weight, idx) => ({
      id: this.formHandler.ingredients[idx].id,
      weight,
      product: this.formHandler.ingredients[idx].product
    }));

    this.stats.next({
      proteins: Math.round(ingredientsProteins(ingredients)),
      fats: Math.round(ingredientsFats(ingredients)),
      carbohydrates: Math.round(ingredientsCarbohydrates(ingredients)),
      weight: ingredientsWeight(ingredients),
      calories: Math.round(ingredientsCalories(ingredients))
    });
  }

}
