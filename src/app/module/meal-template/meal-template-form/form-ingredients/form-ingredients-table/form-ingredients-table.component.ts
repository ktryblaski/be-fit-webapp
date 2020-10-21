import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MealTemplateFormHandler } from '../../meal-template-form-handler';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Ingredient } from '../../../../../shared/model/domain/ingredient';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { FoodStats } from '../../../../../shared/model/food-stats';
import {
  ingredientsCalories,
  ingredientsCarbohydrates,
  ingredientsFats,
  ingredientsProteins, ingredientsWeight
} from '../../../../../shared/util/calculator/ingredients-calculator';

@Component({
  selector: 'app-ingredients-table',
  templateUrl: './form-ingredients-table.component.html',
  styleUrls: ['./form-ingredients-table.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class FormIngredientsTableComponent implements OnInit, OnDestroy {

  @Output() removeIngredient = new EventEmitter<number>();

  private readonly stats = new BehaviorSubject<FoodStats | null>(null);

  readonly stats$: Observable<FoodStats | null> = this.stats.pipe(distinctUntilChanged());

  subscription: Subscription;

  constructor(public formHandler: MealTemplateFormHandler) { }

  ngOnInit(): void {
    this.subscription = this.formHandler.ingredients.values.subscribe((ingredients: Ingredient[]) => {
      this.updateTotalData(ingredients);
    });
  }

  handleRemoveIngredient(idx: number): void {
    this.removeIngredient.emit(idx);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateTotalData(ingredients: Ingredient[]): void {
    this.stats.next({
      proteins: Math.round(ingredientsProteins(ingredients)),
      fats: Math.round(ingredientsFats(ingredients)),
      carbohydrates: Math.round(ingredientsCarbohydrates(ingredients)),
      weight: ingredientsWeight(ingredients),
      kcal: Math.round(ingredientsCalories(ingredients))
    });
  }

}
