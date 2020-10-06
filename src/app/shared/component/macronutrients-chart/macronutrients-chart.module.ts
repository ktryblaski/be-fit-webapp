import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MacronutrientsChartComponent } from './macronutrients-chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [
    MacronutrientsChartComponent
  ],
  exports: [
    MacronutrientsChartComponent
  ]
})
export class MacronutrientsChartModule { }
