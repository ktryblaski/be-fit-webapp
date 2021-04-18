import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  addFoodStats,
  emptyFoodStats,
  FoodStats,
  foodStatsForMacronutrients,
  roundFoodStats,
} from '../../../../../shared/model/food-stats';
import { map } from 'rxjs/operators';
import { DayOfEatingFormHandler } from '../../day-of-eating-form-handler';
import { MealFormGroup } from '../../-shared/day-of-eating-form';
import { values$ } from '../../../../../shared/form/typed-form/typed-utils';

@Component({
  selector: 'app-meal-stats',
  templateUrl: './meal-stats.component.html',
  styleUrls: ['./meal-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealStatsComponent implements OnInit {
  @Input() mealIdx: number;
  @Input() mealControl: MealFormGroup;

  stats$: Observable<FoodStats>;

  constructor(private formHandler: DayOfEatingFormHandler) {}

  ngOnInit(): void {
    this.stats$ = values$(this.mealControl.controls.ingredients).pipe(
      map((weights: number[]) => {
        const foodStats = this.formHandler.meals[this.mealIdx].ingredients
          .map((ingredient, i) => foodStatsForMacronutrients(ingredient.product.macronutrients, weights[i]))
          .reduce((a: FoodStats, b: FoodStats) => addFoodStats(a, b), emptyFoodStats());

        return roundFoodStats(foodStats);
      })
    );
  }
}
