import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MacronutrientsChartComponent } from './macronutrients-chart.component';
import { ChartsModule } from 'ng2-charts';
import { CalculatorModule } from '../../pipe/calculator/calculator.module';
import { ToCanvasDataPipe } from './to-canvas-data.pipe';

@NgModule({
  imports: [CommonModule, ChartsModule, CalculatorModule],
  declarations: [MacronutrientsChartComponent, ToCanvasDataPipe],
  exports: [MacronutrientsChartComponent],
})
export class MacronutrientsChartModule {}
