import {Component, Input} from '@angular/core';
import {Macronutrients} from "../../../../../shared/model/domain/macronutrients";

@Component({
  selector: 'app-macronutrients-info',
  templateUrl: './macronutrients-info.component.html',
  styleUrls: ['./macronutrients-info.component.scss']
})
export class MacronutrientsInfoComponent {

  @Input() macronutrients: Macronutrients;

}
