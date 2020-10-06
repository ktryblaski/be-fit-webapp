import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsTableComponent } from './ingredients-table.component';
import { HelperModule } from '../../../helper/helper.module';
import { SortIngredientsPipe } from './sort-ingredients.pipe';
import { CalculatorModule } from '../../../pipe/calculator/calculator.module';

@NgModule({
  imports: [
    CommonModule,
    HelperModule,
    CalculatorModule
  ],
  declarations: [
    IngredientsTableComponent,
    SortIngredientsPipe
  ],
  exports: [
    IngredientsTableComponent
  ]
})
export class IngredientsTableModule { }
