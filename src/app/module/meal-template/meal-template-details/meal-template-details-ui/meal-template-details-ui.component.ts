import {Component, Input} from '@angular/core';
import {MealTemplate} from '../../../../shared/model/domain/meal-template';

@Component({
  selector: 'app-meal-template-details-ui',
  templateUrl: './meal-template-details-ui.component.html',
  styleUrls: ['./meal-template-details-ui.component.scss']
})
export class MealTemplateDetailsUiComponent {

  @Input() mealTemplate: MealTemplate;

}
