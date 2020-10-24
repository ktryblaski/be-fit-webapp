import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Meal } from '../../../model/domain/meal';

@Component({
  selector: 'app-meal-view',
  templateUrl: './meal-view.component.html',
  styleUrls: ['./meal-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealViewComponent {
  @Input() meal: Meal;
}
