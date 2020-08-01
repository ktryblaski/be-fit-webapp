import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {DietRoutingModule} from "./diet-routing.module";
import { DietsListComponent } from './diets-list/diets-list.component';
import { DietsListUiComponent } from './diets-list/diets-list-ui/diets-list-ui.component';
import {MatButtonModule} from "@angular/material/button";
import {SpinnerModule} from "../../shared/component/spinner/spinner.module";
import {CalculatorModule} from "../../shared/pipe/calculator/calculator.module";
import { DietCreateComponent } from './diet-create/diet-create.component';
import { DietEditComponent } from './diet-edit/diet-edit.component';
import { DietDetailsComponent } from './diet-details/diet-details.component';
import { DietDetailsUiComponent } from './diet-details/diet-details-ui/diet-details-ui.component';
import { DietDetailsMealsTableComponent } from './diet-details/diet-details-ui/diet-details-meals-table/diet-details-meals-table.component';

@NgModule({
    imports: [
        CommonModule,
        DietRoutingModule,
        MatButtonModule,
        SpinnerModule,
        CalculatorModule,
    ],
  declarations: [

  DietsListComponent,

  DietsListUiComponent,

  DietCreateComponent,

  DietEditComponent,

  DietDetailsComponent,

  DietDetailsUiComponent,

  DietDetailsMealsTableComponent]
})
export class DietModule {

}
