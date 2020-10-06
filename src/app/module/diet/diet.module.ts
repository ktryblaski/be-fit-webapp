import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietRoutingModule } from './diet-routing.module';
import { DietsListComponent } from './diets-list/diets-list.component';
import { DietsListUiComponent } from './diets-list/diets-list-ui/diets-list-ui.component';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from '../../shared/component/spinner/spinner.module';
import { CalculatorModule } from '../../shared/pipe/calculator/calculator.module';
import { DietCreateComponent } from './diet-create/diet-create.component';
import { DietEditComponent } from './diet-edit/diet-edit.component';
import { DietDetailsComponent } from './diet-details/diet-details.component';
import { DietDetailsUiComponent } from './diet-details/diet-details-ui/diet-details-ui.component';
import { DietDetailsMealsTableComponent } from './diet-details/diet-details-ui/diet-details-meals-table/diet-details-meals-table.component';
import { DietFormComponent } from './diet-form/diet-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DietMealsComponent } from './diet-form/diet-meals/diet-meals.component';
import { DietMealsSelectComponent } from './diet-form/diet-meals/diet-meals-select/diet-meals-select.component';
import { DietMealsTableComponent } from './diet-form/diet-meals/diet-meals-table/diet-meals-table.component';
import { DietMealsSelectUiComponent } from './diet-form/diet-meals/diet-meals-select/diet-meals-select-ui/diet-meals-select-ui.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FilterMealsPipe } from './diet-form/diet-meals/diet-meals-select/filter-meals.pipe';
import { IsAddingDisabledPipe } from './diet-form/diet-meals/diet-meals-select/is-adding-disabled.pipe';
import { HelperModule } from '../../shared/helper/helper.module';
import { NoTableDataModule } from '../../shared/component/no-table-data/no-table-data.module';

@NgModule({
  imports: [
    CommonModule,
    DietRoutingModule,
    MatButtonModule,
    SpinnerModule,
    CalculatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    HelperModule,
    NoTableDataModule
  ],
  declarations: [
    DietsListComponent,
    DietsListUiComponent,
    DietCreateComponent,
    DietEditComponent,
    DietDetailsComponent,
    DietDetailsUiComponent,
    DietDetailsMealsTableComponent,
    DietFormComponent,
    DietMealsComponent,
    DietMealsSelectComponent,
    DietMealsTableComponent,
    DietMealsSelectUiComponent,
    FilterMealsPipe,
    IsAddingDisabledPipe
  ],
  providers: [
    MatDatepickerModule,
  ],
})
export class DietModule { }
