import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealTemplateCreateComponent } from './meal-template-create.component';
import { MealTemplateFormModule } from '../meal-template-form/meal-template-form.module';
import { SpinnerModule } from '../../../shared/component/spinner/spinner.module';

@NgModule({
  imports: [CommonModule, MealTemplateFormModule, SpinnerModule],
  declarations: [MealTemplateCreateComponent],
})
export class MealTemplateCreateModule {}
