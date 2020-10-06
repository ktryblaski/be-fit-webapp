import { Component, Input } from '@angular/core';
import { MealTemplate } from '../../../model/domain/meal-template';

@Component({
  selector: 'app-meal-template-view',
  templateUrl: './meal-template-view.component.html',
  styleUrls: ['./meal-template-view.component.scss']
})
export class MealTemplateViewComponent {

  @Input() mealTemplate: MealTemplate;

}
