import { Component, Input } from '@angular/core';
import { Meal } from '../../../../shared/model/domain/meal';
import { InternationalizationService } from '../../../../shared/service/internationalization.service';

@Component({
  selector: 'app-meal-details-ui',
  templateUrl: './meal-details-ui.component.html',
  styleUrls: ['./meal-details-ui.component.scss']
})
export class MealDetailsUiComponent {

  readonly MEAL_TYPE;

  @Input() meal: Meal;

  constructor(private i18nService: InternationalizationService) {
    this.MEAL_TYPE = i18nService.MEAL_TYPE;
  }

}
