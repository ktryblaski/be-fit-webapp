import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MealRoutingModule} from "./meal-routing.module";
import { MealsListComponent } from './meals-list/meals-list.component';
import { MealsListTableComponent } from './meals-list/meals-list-table/meals-list-table.component';
import {CalculatorModule} from "../../shared/pipe/calculator/calculator.module";
import {SpinnerModule} from "../../shared/component/spinner/spinner.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealDetailsDataComponent } from './meal-details/meal-details-data/meal-details-data.component';
import { IngredientsTableComponent } from './meal-details/meal-details-data/ingredients-table/ingredients-table.component';
import { MealCreateComponent } from './meal-create/meal-create.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { SortIngredientsPipe } from './meal-details/meal-details-data/ingredients-table/sort-ingredients.pipe';

@NgModule({
  imports: [
    CommonModule,
    MealRoutingModule,
    CalculatorModule,
    SpinnerModule,
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
    MealsListComponent,
    MealsListTableComponent,
    MealDetailsComponent,
    MealDetailsDataComponent,
    IngredientsTableComponent,
    MealCreateComponent,
    MealEditComponent,
    SortIngredientsPipe,
  ]
})
export class MealModule {

}
