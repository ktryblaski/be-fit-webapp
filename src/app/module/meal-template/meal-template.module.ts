import { NgModule } from '@angular/core';
import { MealTemplateCreateModule } from './meal-template-create/meal-template-create.module';
import { MealTemplateDetailsModule } from './meal-template-details/meal-template-details.module';
import { MealTemplateEditModule } from './meal-template-edit/meal-template-edit.module';
import { MealTemplatesListModule } from './meal-templates-list/meal-templates-list.module';

@NgModule({
  imports: [
    MealTemplateCreateModule,
    MealTemplateDetailsModule,
    MealTemplateEditModule,
    MealTemplatesListModule
  ]
})
export class MealTemplateModule { }
