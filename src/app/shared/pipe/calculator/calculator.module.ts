import {NgModule} from '@angular/core';
import {MacronutrientsCaloriesCalculatorPipe} from './macronutrients-calories-calculator.pipe';
import {IngredientsCaloriesCalculatorPipe} from './ingredients-calories-calculator.pipe';
import {IngredientsCarbohydratesCalculatorPipe} from './ingredients-carbohydrates-calculator.pipe';
import {IngredientsProteinsCalculatorPipe} from './ingredients-proteins-calculator.pipe';
import {IngredientsFatsCalculatorPipe} from './ingredients-fats-calculator.pipe';
import { MacronutrientsCarbohydratesCalculatorPipe } from './macronutrients-carbohydrates-calculator.pipe';
import { MacronutrientsProteinsCalculatorPipe } from './macronutrients-proteins-calculator.pipe';
import { MacronutrientsFatsCalculatorPipe } from './macronutrients-fats-calculator.pipe';
import { IngredientsWeightCalculatorPipe } from './ingredients-weight-calculator.pipe';
import { MealsCarbohydratesCalculatorPipe } from './meals-carbohydrates-calculator.pipe';
import { MealsProteinsCalculatorPipe } from './meals-proteins-calculator.pipe';
import { MealsFatsCalculatorPipe } from './meals-fats-calculator.pipe';
import { MealsCaloriesCalculatorPipe } from './meals-calories-calculator.pipe';
import { MealsWeightCalculatorPipe } from './meals-weight-calculator.pipe';

@NgModule({
  imports: [],
  declarations: [
    MacronutrientsCaloriesCalculatorPipe,
    IngredientsCaloriesCalculatorPipe,
    IngredientsCarbohydratesCalculatorPipe,
    IngredientsProteinsCalculatorPipe,
    IngredientsFatsCalculatorPipe,
    MacronutrientsCarbohydratesCalculatorPipe,
    MacronutrientsProteinsCalculatorPipe,
    MacronutrientsFatsCalculatorPipe,
    IngredientsWeightCalculatorPipe,
    MealsCarbohydratesCalculatorPipe,
    MealsProteinsCalculatorPipe,
    MealsFatsCalculatorPipe,
    MealsCaloriesCalculatorPipe,
    MealsWeightCalculatorPipe
  ],
  exports: [
    MacronutrientsCaloriesCalculatorPipe,
    IngredientsCaloriesCalculatorPipe,
    IngredientsCarbohydratesCalculatorPipe,
    IngredientsProteinsCalculatorPipe,
    IngredientsFatsCalculatorPipe,
    MacronutrientsCarbohydratesCalculatorPipe,
    MacronutrientsProteinsCalculatorPipe,
    MacronutrientsFatsCalculatorPipe,
    IngredientsWeightCalculatorPipe,
    MealsCarbohydratesCalculatorPipe,
    MealsWeightCalculatorPipe,
    MealsProteinsCalculatorPipe,
    MealsFatsCalculatorPipe,
    MealsCaloriesCalculatorPipe
  ]
})
export class CalculatorModule { }
