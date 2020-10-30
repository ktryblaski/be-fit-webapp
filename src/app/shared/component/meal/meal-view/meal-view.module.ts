import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealViewComponent } from './meal-view.component';
import { IngredientsTableModule } from '../../ingredient/ingredients-table/ingredients-table.module';
import { FieldModule } from '../../field/field.module';

@NgModule({
  imports: [CommonModule, IngredientsTableModule, FieldModule],
  declarations: [MealViewComponent],
  exports: [MealViewComponent],
})
export class MealViewModule {}
