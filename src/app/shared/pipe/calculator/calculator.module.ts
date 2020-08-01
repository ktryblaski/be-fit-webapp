import {NgModule} from "@angular/core";
import {MacronutrientsCaloriesCalculatorPipe} from "./macronutrients-calories-calculator.pipe";
import {MealCaloriesCalculatorPipe} from "./meal-calories-calculator.pipe";
import {MealCarbohydratesCalculatorPipe} from "./meal-carbohydrates-calculator.pipe";
import {MealProteinsCalculatorPipe} from "./meal-proteins-calculator.pipe";
import {MealFatsCalculatorPipe} from "./meal-fats-calculator.pipe";
import { IngredientCarbohydratesCalculatorPipe } from './ingredient-carbohydrates-calculator.pipe';
import { IngredientProteinsCalculatorPipe } from './ingredient-proteins-calculator.pipe';
import { IngredientFatsCalculatorPipe } from './ingredient-fats-calculator.pipe';
import { MealWeightCalculatorPipe } from './meal-weight-calculator.pipe';
import { MealsCarbohydratesCalculatorPipe } from './meals-carbohydrates-calculator.pipe';
import { MealsProteinsCalculatorPipe } from './meals-proteins-calculator.pipe';
import { MealsFatsCalculatorPipe } from './meals-fats-calculator.pipe';
import { MealsCaloriesCalculatorPipe } from './meals-calories-calculator.pipe';
import { MealsWeightCalculatorPipe } from './meals-weight-calculator.pipe';

@NgModule({
  imports: [],
  declarations: [
    MacronutrientsCaloriesCalculatorPipe,
    MealCaloriesCalculatorPipe,
    MealCarbohydratesCalculatorPipe,
    MealProteinsCalculatorPipe,
    MealFatsCalculatorPipe,
    IngredientCarbohydratesCalculatorPipe,
    IngredientProteinsCalculatorPipe,
    IngredientFatsCalculatorPipe,
    MealWeightCalculatorPipe,
    MealsCarbohydratesCalculatorPipe,
    MealsProteinsCalculatorPipe,
    MealsFatsCalculatorPipe,
    MealsCaloriesCalculatorPipe,
    MealsWeightCalculatorPipe
  ],
  exports: [
    MacronutrientsCaloriesCalculatorPipe,
    MealCaloriesCalculatorPipe,
    MealCarbohydratesCalculatorPipe,
    MealProteinsCalculatorPipe,
    MealFatsCalculatorPipe,
    IngredientCarbohydratesCalculatorPipe,
    IngredientProteinsCalculatorPipe,
    IngredientFatsCalculatorPipe,
    MealWeightCalculatorPipe,
    MealsCarbohydratesCalculatorPipe,
    MealsWeightCalculatorPipe,
    MealsProteinsCalculatorPipe,
    MealsFatsCalculatorPipe,
    MealsCaloriesCalculatorPipe
  ]
})
export class CalculatorModule {

}
