import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MealRoutingModule} from "./meal-routing.module";
import { MealsListComponent } from './meals-list/meals-list.component';
import { MealsListUiComponent } from './meals-list/meals-list-ui/meals-list-ui.component';
import {CalculatorModule} from "../../shared/pipe/calculator/calculator.module";
import {SpinnerModule} from "../../shared/component/spinner/spinner.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealDetailsUiComponent } from './meal-details/meal-details-ui/meal-details-ui.component';
import { MealDetailsIngredientsTableComponent } from './meal-details/meal-details-ui/meal-details-ingredients-table/meal-details-ingredients-table.component';
import { MealCreateComponent } from './meal-create/meal-create.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { SortIngredientsPipe } from './meal-details/meal-details-ui/meal-details-ingredients-table/sort-ingredients.pipe';
import { MealFormComponent } from './meal-form/meal-form.component';

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
    MealsListUiComponent,
    MealDetailsComponent,
    MealDetailsUiComponent,
    MealDetailsIngredientsTableComponent,
    MealCreateComponent,
    MealEditComponent,
    SortIngredientsPipe,
    MealFormComponent,
  ]
})
export class MealModule {

}
