import { Component, ChangeDetectionStrategy, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MealsFormArray } from '../-shared/day-of-eating-form';
import { Product } from '../../../../shared/model/domain/product';

@Component({
  selector: 'app-meals-form',
  templateUrl: './meals-form.component.html',
  styleUrls: ['./meals-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealsFormComponent {
  @Input() mealsControl: MealsFormArray;
  @Input() products: Product[];
  @Output() moveUpMeal = new EventEmitter<number>();
  @Output() moveDownMeal = new EventEmitter<number>();
  @Output() removeMeal = new EventEmitter<number>();

  @ViewChild(MatAccordion) accordion: MatAccordion;

  handleMoveUpMeal(idx: number): void {
    this.moveUpMeal.emit(idx);
  }

  handleMoveDownMeal(idx: number): void {
    this.moveDownMeal.emit(idx);
  }

  handleRemoveMeal(idx: number): void {
    this.removeMeal.emit(idx);
  }
}
