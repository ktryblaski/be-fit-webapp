import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list.component';
import { RecipesTableComponent } from './recipe-table/recipes-table.component';
import { HelperModule } from '../../../shared/helper/helper.module';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from '../../../shared/component/spinner/spinner.module';
import { CalculatorModule } from '../../../shared/pipe/calculator/calculator.module';
import { NoTableDataModule } from '../../../shared/component/no-table-data/no-table-data.module';

@NgModule({
  imports: [
    CommonModule,
    HelperModule,
    MatButtonModule,
    SpinnerModule,
    CalculatorModule,
    NoTableDataModule
  ],
  declarations: [
    RecipesListComponent,
    RecipesTableComponent
  ]
})
export class RecipesListModule {}