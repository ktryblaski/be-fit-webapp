import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayOfEatingFormComponent } from './day-of-eating-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CalculatorModule } from '../../../../shared/pipe/calculator/calculator.module';
import { HelperModule } from '../../../../shared/helper/helper.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MealStatsComponent } from './meals-form/meal-stats/meal-stats.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RawButtonModule } from '../../../../shared/component/raw-button/raw-button.module';
import { DayOfEatingStatsComponent } from './meals-form/day-of-eating-stats/day-of-eating-stats.component';
import { MacronutrientsChartModule } from '../../../../shared/component/macronutrients-chart/macronutrients-chart.module';
import { MealsFormComponent } from './meals-form/meals-form.component';
import { CanMoveUpPipe } from './meals-form/meal-form/can-move-up.pipe';
import { CanMoveDownPipe } from './meals-form/meal-form/can-move-down.pipe';
import { MealFormComponent } from './meals-form/meal-form/meal-form.component';
import { FormHelperModule } from '../../../../shared/pipe/form/form-helper.module';
import { CopyExistingMealFormDialogComponent } from './copy-existing-meal-form-dialog/copy-existing-meal-form-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IngredientsFormComponent } from './meals-form/meal-form/ingredients-form/ingredients-form.component';
import { IngredientsTableFormComponent } from './meals-form/meal-form/ingredients-form/ingredients-table-form/ingredients-table-form.component';
import { ProductFormComponent } from './meals-form/meal-form/ingredients-form/product-form/product-form.component';
import { ProductSelectFormComponent } from './meals-form/meal-form/ingredients-form/product-form/product-select-form/product-select-form.component';
import { FilterProductsPipe } from './meals-form/meal-form/ingredients-form/product-form/product-select-form/filter-products.pipe';
import { SortProductsPipe } from './meals-form/meal-form/ingredients-form/product-form/product-select-form/sort-products.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    CalculatorModule,
    HelperModule,
    MatExpansionModule,
    FontAwesomeModule,
    RawButtonModule,
    MacronutrientsChartModule,
    FormHelperModule,
    MatAutocompleteModule,
  ],
  declarations: [
    DayOfEatingFormComponent,
    MealStatsComponent,
    DayOfEatingStatsComponent,
    MealsFormComponent,
    CanMoveUpPipe,
    CanMoveDownPipe,
    MealFormComponent,
    CopyExistingMealFormDialogComponent,
    IngredientsFormComponent,
    IngredientsTableFormComponent,
    ProductFormComponent,
    ProductSelectFormComponent,
    FilterProductsPipe,
    SortProductsPipe,
  ],
  exports: [DayOfEatingFormComponent],
})
export class DayOfEatingFormModule {}
