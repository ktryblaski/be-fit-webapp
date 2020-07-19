import {Component, Input} from '@angular/core';
import {Meal} from "../../../../shared/model/domain/meal";
import {InternationalizationService} from "../../../../shared/service/internationalization.service";

@Component({
  selector: 'app-meal-details-data',
  templateUrl: './meal-details-data.component.html',
  styleUrls: ['./meal-details-data.component.scss']
})
export class MealDetailsDataComponent {

  readonly MEAL_TYPE;

  @Input() meal: Meal;

  constructor(private i18nService: InternationalizationService) {
    this.MEAL_TYPE = i18nService.MEAL_TYPE;
  }

}
