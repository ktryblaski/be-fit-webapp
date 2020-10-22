import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayOfEatingDetailsComponent } from './day-of-eating-details.component';
import { DayOfEatingDetailsUiComponent } from './day-of-eating-details-ui/day-of-eating-details-ui.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MealViewModule } from '../../../shared/component/meal/meal-view/meal-view.module';
import { DayOfEatingRoutingModule } from '../day-of-eating-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { HelperModule } from '../../../shared/helper/helper.module';
import { SpinnerModule } from '../../../shared/component/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MealViewModule,
    DayOfEatingRoutingModule,
    MatButtonModule,
    HelperModule,
    SpinnerModule
  ],
  declarations: [
    DayOfEatingDetailsComponent,
    DayOfEatingDetailsUiComponent
  ]
})
export class DayOfEatingDetailsModule { }
