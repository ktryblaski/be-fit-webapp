import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MealRoutingModule} from './meal-routing.module';
import { MealsListComponent } from './meals-list/meals-list.component';
import { MealsListUiComponent } from './meals-list/meals-list-ui/meals-list-ui.component';
import {CalculatorModule} from '../../shared/pipe/calculator/calculator.module';
import {SpinnerModule} from '../../shared/component/spinner/spinner.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealDetailsUiComponent } from './meal-details/meal-details-ui/meal-details-ui.component';
import { MealDetailsIngredientsTableComponent } from './meal-details/meal-details-ui/meal-details-ingredients-table/meal-details-ingredients-table.component';
import { MealCreateComponent } from './meal-create/meal-create.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { SortIngredientsPipe } from './meal-details/meal-details-ui/meal-details-ingredients-table/sort-ingredients.pipe';
import { MealFormComponent } from './meal-form/meal-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import { MealIngredientsComponent } from './meal-form/meal-ingredients/meal-ingredients.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MealIngredientsTableComponent } from './meal-form/meal-ingredients/meal-ingredients-table/meal-ingredients-table.component';
import { MealIngredientsSelectComponent } from './meal-form/meal-ingredients/meal-ingredients-select/meal-ingredients-select.component';
import { MealIngredientsSelectUiComponent } from './meal-form/meal-ingredients/meal-ingredients-select/meal-ingredients-select-ui/meal-ingredients-select-ui.component';
import { ProductPipe } from './meal-form/meal-ingredients/meal-ingredients-table/product.pipe';
import { IsAddingDisabledPipe } from './meal-form/meal-ingredients/meal-ingredients-select/is-adding-disabled.pipe';
import { FilterProductsPipe } from './meal-form/meal-ingredients/meal-ingredients-select/filter-products.pipe';
import {HelperModule} from '../../shared/helper/helper.module';
import {NoTableDataModule} from '../../shared/component/no-table-data/no-table-data.module';

@NgModule({
  imports: [
    CommonModule,
    MealRoutingModule,
    CalculatorModule,
    SpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    HelperModule,
    NoTableDataModule,
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
    MealIngredientsComponent,
    MealIngredientsTableComponent,
    MealIngredientsSelectComponent,
    MealIngredientsSelectUiComponent,
    ProductPipe,
    IsAddingDisabledPipe,
    FilterProductsPipe,
  ]
})
export class MealModule { }
