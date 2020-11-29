import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MealTemplate } from '../../../../shared/model/domain/meal-template';

@Component({
  selector: 'app-meal-templates-table',
  templateUrl: './meal-templates-table.component.html',
  styleUrls: ['./meal-templates-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealTemplatesTableComponent {

  @Input() mealTemplates: MealTemplate[];
  @Output() clickRow = new EventEmitter<MealTemplate>();

  handleClickRow(mealTemplate: MealTemplate) {
    this.clickRow.next(mealTemplate);
  }
}
