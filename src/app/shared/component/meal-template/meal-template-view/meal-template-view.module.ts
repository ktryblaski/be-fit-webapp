import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealTemplateViewComponent } from './meal-template-view.component';
import { IngredientsTableModule } from '../../ingredient/ingredients-table/ingredients-table.module';
import { FieldModule } from '../../field/field.module';

@NgModule({
  imports: [CommonModule, IngredientsTableModule, FieldModule],
  declarations: [MealTemplateViewComponent],
  exports: [MealTemplateViewComponent],
})
export class MealTemplateViewModule {}
