import {Component, Input, OnInit} from '@angular/core';
import {DietMeal} from "../../../../../shared/model/domain/diet";
import {InternationalizationService} from "../../../../../shared/service/internationalization.service";

@Component({
  selector: 'app-diet-details-meals-table',
  templateUrl: './diet-details-meals-table.component.html',
  styleUrls: ['./diet-details-meals-table.component.scss']
})
export class DietDetailsMealsTableComponent {

  readonly MEAL_TYPE: {[key: string]: string};

  @Input() meals: DietMeal[];

  constructor(private i18nService: InternationalizationService) {
    this.MEAL_TYPE = i18nService.MEAL_TYPE;
  }

}
