import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MealRoutingModule} from "./meal-routing.module";
import { MealsListComponent } from './meals-list/meals-list.component';
import { MealsListTableComponent } from './meals-list/meals-list-table/meals-list-table.component';
import {I18nMealTypeModule} from "../../shared/pipe/i18n-meal-type/i18n-meal-type.module";
import {CaloriesCalculatorModule} from "../../shared/pipe/calories-calculator/calories-calculator.module";
import {SpinnerModule} from "../../shared/component/spinner/spinner.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    MealRoutingModule,
    I18nMealTypeModule,
    CaloriesCalculatorModule,
    SpinnerModule,
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
    MealsListComponent,
    MealsListTableComponent,
  ]
})
export class MealModule {

}
