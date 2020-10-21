import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealTemplateEditComponent } from './meal-template-edit.component';
import { MealTemplateFormModule } from '../meal-template-form/meal-template-form.module';
import { SpinnerModule } from '../../../shared/component/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    MealTemplateFormModule,
    SpinnerModule
  ],
  declarations: [
    MealTemplateEditComponent
  ]
})
export class MealTemplateEditModule { }
