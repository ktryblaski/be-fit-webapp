import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealTemplatesListComponent } from './meal-templates-list.component';
import { MealTemplatesTableComponent } from './meal-templates-table/meal-templates-table.component';
import { HelperModule } from '../../../shared/helper/helper.module';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from '../../../shared/component/spinner/spinner.module';
import { CalculatorModule } from '../../../shared/pipe/calculator/calculator.module';
import { NoTableDataModule } from '../../../shared/component/no-table-data/no-table-data.module';

@NgModule({
  imports: [CommonModule, HelperModule, MatButtonModule, SpinnerModule, CalculatorModule, NoTableDataModule],
  declarations: [MealTemplatesListComponent, MealTemplatesTableComponent],
})
export class MealTemplatesListModule {}
