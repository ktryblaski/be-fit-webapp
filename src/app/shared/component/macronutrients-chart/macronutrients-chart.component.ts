import { Component, Input } from '@angular/core';
import { Macronutrients } from '../../model/domain/macronutrients';
import { Color } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-macronutrients-chart',
  templateUrl: './macronutrients-chart.component.html',
  styleUrls: ['./macronutrients-chart.component.scss'],
})
export class MacronutrientsChartComponent {
  @Input() macronutrients: Macronutrients;

  readonly colors: Color[] = [
    {
      backgroundColor: ['#FE6847', '#FBB13C', '#00C49A'],
    },
  ];
  readonly options: ChartOptions = {
    tooltips: {
      enabled: false,
    },
  };
}
