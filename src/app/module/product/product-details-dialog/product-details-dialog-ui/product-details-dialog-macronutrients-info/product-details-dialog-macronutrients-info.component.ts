import {Component, Input} from '@angular/core';
import {Macronutrients} from "../../../../../shared/model/domain/macronutrients";

@Component({
  selector: 'app-product-details-dialog-macronutrients-info',
  templateUrl: './product-details-dialog-macronutrients-info.component.html',
  styleUrls: ['./product-details-dialog-macronutrients-info.component.scss']
})
export class ProductDetailsDialogMacronutrientsInfoComponent {

  @Input() macronutrients: Macronutrients;

}
