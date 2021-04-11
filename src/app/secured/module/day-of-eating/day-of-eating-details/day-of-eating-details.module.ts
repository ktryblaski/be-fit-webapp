import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayOfEatingDetailsComponent } from './day-of-eating-details.component';
import { DayOfEatingDetailsUiComponent } from './day-of-eating-details-ui/day-of-eating-details-ui.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MealViewModule } from '../../../../shared/component/meal/meal-view/meal-view.module';
import { DayOfEatingRoutingModule } from '../day-of-eating-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { HelperModule } from '../../../../shared/helper/helper.module';
import { SpinnerModule } from '../../../../shared/component/spinner/spinner.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { CalculatorModule } from '../../../../shared/pipe/calculator/calculator.module';
import { RawButtonModule } from '../../../../shared/component/raw-button/raw-button.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MacronutrientsChartModule } from '../../../../shared/component/macronutrients-chart/macronutrients-chart.module';
import { ToMacronutrientsPipe } from './day-of-eating-details-ui/to-macronutrients.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MealViewModule,
    DayOfEatingRoutingModule,
    MatButtonModule,
    HelperModule,
    SpinnerModule,
    MatExpansionModule,
    CalculatorModule,
    RawButtonModule,
    FontAwesomeModule,
    MacronutrientsChartModule
  ],
  declarations: [
    DayOfEatingDetailsComponent,
    DayOfEatingDetailsUiComponent,
    ToMacronutrientsPipe
  ],
})
export class DayOfEatingDetailsModule { }
