import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MealTemplate } from '../../../../shared/model/domain/meal-template';

@Component({
  selector: 'app-meal-templates-list-ui',
  templateUrl: './meal-templates-list-ui.component.html',
  styleUrls: ['./meal-templates-list-ui.component.scss']
})
export class MealTemplatesListUiComponent {

  @Input() mealTemplates: MealTemplate[];
  @Output() clickRow: EventEmitter<MealTemplate> = new EventEmitter<MealTemplate>();

  handleClick(mealTemplate: MealTemplate) {
    this.clickRow.next(mealTemplate);
  }

}
