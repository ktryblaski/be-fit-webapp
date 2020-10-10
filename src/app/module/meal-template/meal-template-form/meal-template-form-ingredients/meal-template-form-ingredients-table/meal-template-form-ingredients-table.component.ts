import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MealTemplateFormHandler } from '../../meal-template-form-handler';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Ingredient } from '../../../../../shared/model/domain/ingredient';
import {
  ingredientsCarbohydrates,
  ingredientsFats, ingredientsKCAL,
  ingredientsProteins,
  ingredientsWeight
 } from '../../../../../shared/util/calculator';
import { Product } from '../../../../../shared/model/domain/product';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-meal-template-ingredients-table',
  templateUrl: './meal-template-form-ingredients-table.component.html',
  styleUrls: ['./meal-template-form-ingredients-table.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class MealTemplateFormIngredientsTableComponent implements OnInit, OnDestroy {

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

  @Output() removeProduct = new EventEmitter<Product>();

  subscription: Subscription;

  constructor(public formHandler: MealTemplateFormHandler) { }

  ngOnInit(): void {
    this.subscription = this.formHandler.ingredients.values.subscribe((ingredients: Ingredient[]) => {
      this.updateTotalData(ingredients);
    });

    this.updateTotalData(this.formHandler.ingredients.value);
  }

  removeIngredient(product: Product): void {
    this.removeProduct.emit(product);
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
