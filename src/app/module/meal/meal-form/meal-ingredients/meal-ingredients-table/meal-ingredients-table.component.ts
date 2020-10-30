import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MealFormHandler } from '../../meal-form-handler';
import { FormArray } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Ingredient } from '../../../../../shared/model/domain/ingredient';
import {
  ingredientsCarbohydrates,
  ingredientsFats,
  ingredientsKCAL,
  ingredientsProteins,
  ingredientsWeight,
} from '../../../../../shared/util/calculator';

@Component({
  selector: 'app-meal-ingredients-table',
  templateUrl: './meal-ingredients-table.component.html',
  styleUrls: ['./meal-ingredients-table.component.scss'],
})
export class MealIngredientsTableComponent implements OnInit, OnDestroy {
  private readonly carbohydrates = new BehaviorSubject<number>(0);
  private readonly proteins = new BehaviorSubject<number>(0);
  private readonly fats = new BehaviorSubject<number>(0);
  private readonly KCAL = new BehaviorSubject<number>(0);
  private readonly weight = new BehaviorSubject<number>(0);

  readonly carbohydrates$: Observable<number> = this.carbohydrates.pipe(distinctUntilChanged());
  readonly proteins$: Observable<number> = this.proteins.pipe(distinctUntilChanged());
  readonly fats$: Observable<number> = this.fats.pipe(distinctUntilChanged());
  readonly KCAL$: Observable<number> = this.KCAL.pipe(distinctUntilChanged());
  readonly weight$: Observable<number> = this.weight.pipe(distinctUntilChanged());

  @Input() formHandler: MealFormHandler;
  @Output() removeProduct: EventEmitter<number> = new EventEmitter<number>();

  subscription: Subscription;

  get ingredients(): FormArray {
    return this.formHandler.form.get('ingredients') as FormArray;
  }

  ngOnInit(): void {
    this.subscription = this.formHandler.form.get('ingredients').valueChanges.subscribe((ingredients: Ingredient[]) => {
      this.updateTotalData(ingredients);
    });

    this.updateTotalData(this.formHandler.form.get('ingredients').value);
  }

  removeIngredient(productId: number): void {
    this.removeProduct.emit(productId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateTotalData(ingredients: Ingredient[]): void {
    this.carbohydrates.next(Math.round(ingredientsCarbohydrates(ingredients)));
    this.proteins.next(Math.round(ingredientsProteins(ingredients)));
    this.fats.next(Math.round(ingredientsFats(ingredients)));
    this.KCAL.next(Math.round(ingredientsKCAL(ingredients)));
    this.weight.next(ingredientsWeight(ingredients));
  }
}
