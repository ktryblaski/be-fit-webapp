import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MealFormGroup } from '../../-shared/day-of-eating-form';
import { Product } from '../../../../../shared/model/domain/product';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealFormComponent {
  @Input() mealIdx: number;
  @Input() mealsNumber: number;
  @Input() mealControl: MealFormGroup;
  @Input() products: Product[];
  @Output() removeMeal = new EventEmitter();
  @Output() moveUpMeal = new EventEmitter();
  @Output() moveDownMeal = new EventEmitter();

  handleMoveUp(): void {
    this.moveUpMeal.next();
  }

  handleMoveDown(): void {
    this.moveDownMeal.next();
  }

  handleRemove(): void {
    this.removeMeal.next();
  }
}
