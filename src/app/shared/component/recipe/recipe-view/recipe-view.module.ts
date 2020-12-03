import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeViewComponent } from './recipe-view.component';
import { IngredientsTableModule } from '../../ingredient/ingredients-table/ingredients-table.module';
import { FieldModule } from '../../field/field.module';

@NgModule({
  imports: [CommonModule, IngredientsTableModule, FieldModule],
  declarations: [RecipeViewComponent],
  exports: [RecipeViewComponent],
})
export class RecipeViewModule {}
