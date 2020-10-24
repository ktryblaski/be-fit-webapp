import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DietFormHandler } from '../../diet-form-handler';
import { MealView } from '../../../../../shared/model/domain/meal';

@Component({
  selector: 'app-diet-meals-table',
  templateUrl: './diet-meals-table.component.html',
  styleUrls: ['./diet-meals-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DietMealsTableComponent {
  @Input() formHandler: DietFormHandler;
  @Output() removeMeal: EventEmitter<MealView> = new EventEmitter<MealView>();
}
