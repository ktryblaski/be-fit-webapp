import {Component, Input, OnInit} from '@angular/core';
import {Macronutrients} from "../../model/domain/macronutrients";
import {Color} from "ng2-charts";
import {ChartOptions} from "chart.js";

@Component({
  selector: 'app-macronutrients-chart',
  templateUrl: './macronutrients-chart.component.html',
  styleUrls: ['./macronutrients-chart.component.scss']
})
export class MacronutrientsChartComponent implements OnInit {

  readonly labels: String[] = ['Carbohydrates', 'Proteins', 'Fats'];
  readonly colors: Color[] = [{
    backgroundColor: ['rgb(51, 255, 153)', 'rgb(105, 195, 255)', 'rgb(255, 220, 133)']
  }];
  readonly options: ChartOptions = {
    tooltips: {
      enabled: false
    },
    legend: {
      labels: {
        generateLabels: (chart: Chart) => {
          const data = chart.data.datasets[0];
          const labels = chart.data.labels;

          return [0, 1, 2].map(i => {
            return {
              datasetIndex: i,
              text: `${labels[i]} ${data.data[i]}`,
              fillStyle: `${data.backgroundColor[i]}`,
              strokeStyle: `${data.backgroundColor[i]}`
            } as Chart.ChartLegendLabelItem;
          });
        }
      }
    }
  };

  @Input() macronutrients: Macronutrients;

  data: number[]

  ngOnInit(): void {
    this.data = [
      this.macronutrients.carbohydrates,
      this.macronutrients.proteins,
      this.macronutrients.fats
    ];
  }

}
