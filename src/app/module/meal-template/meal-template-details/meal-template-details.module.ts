import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealTemplateDetailsComponent } from './meal-template-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MealTemplateViewModule } from '../../../shared/component/meal-template/meal-template-view/meal-template-view.module';
import { SpinnerModule } from '../../../shared/component/spinner/spinner.module';
import { HelperModule } from '../../../shared/helper/helper.module';
import { MealTemplateRoutingModule } from '../meal-template-routing.module';

@NgModule({
  imports: [CommonModule, MatButtonModule, MealTemplateViewModule, SpinnerModule, HelperModule, MealTemplateRoutingModule],
  declarations: [MealTemplateDetailsComponent],
})
export class MealTemplateDetailsModule {}
