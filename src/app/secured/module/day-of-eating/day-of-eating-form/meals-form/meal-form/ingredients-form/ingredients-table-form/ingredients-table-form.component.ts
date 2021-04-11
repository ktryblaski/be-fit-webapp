import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MealFormGroup } from '../../../../-shared/day-of-eating-form';
import { DayOfEatingFormHandler } from '../../../../day-of-eating-form-handler';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FoodStats } from '../../../../../../../../shared/model/food-stats';
import { distinctUntilChanged } from 'rxjs/operators';
import { values$ } from '../../../../../../../../shared/form/typed-form/typed-utils';
import {
  ingredientsCalories,
  ingredientsCarbohydrates,
  ingredientsFats,
  ingredientsProteins, ingredientsWeight
} from '../../../../../../../../shared/util/calculator/ingredients-calculator';

@Component({
  selector: 'app-ingredients-table-form',
  templateUrl: './ingredients-table-form.component.html',
  styleUrls: ['./ingredients-table-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsTableFormComponent implements OnInit, OnDestroy {

  @Input() mealControl: MealFormGroup;
  @Input() mealIdx: number;
  @Output() removeIngredient = new EventEmitter<number>();

  private readonly stats = new BehaviorSubject<FoodStats | null>(null);

  readonly stats$: Observable<FoodStats | null> = this.stats.pipe(distinctUntilChanged());

  subscription: Subscription;

  constructor(public formHandler: DayOfEatingFormHandler) {}

  ngOnInit(): void {
    this.subscription = values$(
      this.formHandler.form.controls.meals.at(this.mealIdx).controls.ingredients
    ).subscribe(weights =>
      this.updateTotalData(weights)
    );
  }

  handleRemoveIngredient(idx: number): void {
    this.removeIngredient.emit(idx);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateTotalData(weights: number[]): void {
    const ingredients = weights.map((weight, idx) => ({
      id: this.formHandler.meals[this.mealIdx].ingredients[idx].id,
      weight,
      product: this.formHandler.meals[this.mealIdx].ingredients[idx].product,
    }));

    this.stats.next({
      proteins: Math.round(ingredientsProteins(ingredients)),
      fats: Math.round(ingredientsFats(ingredients)),
      carbohydrates: Math.round(ingredientsCarbohydrates(ingredients)),
      weight: ingredientsWeight(ingredients),
      calories: Math.round(ingredientsCalories(ingredients)),
    });
  }
}
