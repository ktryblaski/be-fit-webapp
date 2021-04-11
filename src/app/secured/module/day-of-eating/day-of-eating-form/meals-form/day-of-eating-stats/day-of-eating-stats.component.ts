import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { defer, Observable } from 'rxjs';
import { Macronutrients } from '../../../../../../shared/model/domain/macronutrients';
import { map, startWith } from 'rxjs/operators';
import { DayOfEatingFormMealValue } from '../../-shared/day-of-eating-form-value';
import {
  macronutrientsCaloriesForWeight,
  macronutrientsCarbohydratesForWeight,
  macronutrientsFatsForWeight,
  macronutrientsProteinsForWeight,
} from '../../../../../../shared/util/calculator/macronutrients-calculator';
import { DayOfEatingFormHandler } from '../../day-of-eating-form-handler';
import { MealsFormArray } from '../../-shared/day-of-eating-form';
import { values$ } from '../../../../../../shared/form/typed-form/typed-utils';

@Component({
  selector: 'app-day-of-eating-stats',
  templateUrl: './day-of-eating-stats.component.html',
  styleUrls: ['./day-of-eating-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayOfEatingStatsComponent implements OnInit {
  @Input() mealsControl: MealsFormArray;

  macronutrients$: Observable<Macronutrients>;

  constructor(private formHandler: DayOfEatingFormHandler) {}

  ngOnInit(): void {
    this.macronutrients$ = values$(this.mealsControl).pipe(
      map(mealValues => {
        let proteins = 0;
        let fats = 0;
        let carbohydrates = 0;
        let calories = 0;

        mealValues.forEach((mealValue, mealIdx) => {
          const meal = this.formHandler.meals[mealIdx];
          const weights = mealValues[mealIdx].ingredients;

          meal.ingredients.forEach((ingredient, ingredientIdx) => {
            proteins += macronutrientsProteinsForWeight(ingredient.product.macronutrients, weights[ingredientIdx]);
            fats += macronutrientsFatsForWeight(ingredient.product.macronutrients, weights[ingredientIdx]);
            carbohydrates += macronutrientsCarbohydratesForWeight(ingredient.product.macronutrients, weights[ingredientIdx]);
            calories += macronutrientsCaloriesForWeight(ingredient.product.macronutrients, weights[ingredientIdx]);
          });
        });

        return {
          proteins: Math.round(proteins),
          fats: Math.round(fats),
          carbohydrates: Math.round(carbohydrates),
          weight: 0, // it is not needed
          calories: Math.round(calories),
        };
      })
    );
  }
}
