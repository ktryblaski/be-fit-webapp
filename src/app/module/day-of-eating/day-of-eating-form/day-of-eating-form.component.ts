import { ChangeDetectionStrategy, Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DayOfEating } from '../../../shared/model/domain/day-of-eating';
import { DayOfEatingFormDataSource } from './-shared/day-of-eating-form-data-source';
import { DayOfEatingFormHandler } from './day-of-eating-form-handler';
import { DayOfEatingFormValue } from './-shared/day-of-eating-form-value';
import { MatDialog } from '@angular/material/dialog';
import {
  CopyExistingMealDialogResult,
  CopyExistingMealFormDialogComponent,
} from './copy-existing-meal-form-dialog/copy-existing-meal-form-dialog.component';

@Component({
  selector: 'app-day-of-eating-form',
  templateUrl: './day-of-eating-form.component.html',
  styleUrls: ['./day-of-eating-form.component.scss'],
  providers: [DayOfEatingFormHandler],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayOfEatingFormComponent implements OnChanges {
  @Input() dayOfEating: DayOfEating;
  @Input() dataSource: DayOfEatingFormDataSource;
  @Output() save = new EventEmitter<DayOfEatingFormValue>();
  @Output() cancel = new EventEmitter();

  readonly DATE_FORMAT = 'dd-MM-yyy';

  constructor(public formHandler: DayOfEatingFormHandler, private dialog: MatDialog) {}

  handleSubmit(): void {
    this.save.emit(this.formHandler.getValue());
  }

  handleCancel(): void {
    this.cancel.emit();
  }

  handleCopyExistingMeal(): void {
    this.dialog
      .open(CopyExistingMealFormDialogComponent, {
        width: '400px',
        data: this.dataSource.mealTemplates,
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((result: CopyExistingMealDialogResult) => {
        if (result) {
          this.formHandler.addMealFromTemplate(result);
        }
      });
  }

  handleAddNewMeal(): void {
    this.formHandler.addMeal({
      name: 'New Meal',
      description: null,
      ingredients: [],
    });
  }

  handleMoveUpMeal(idx: number): void {
    this.formHandler.moveUpMeal(idx);
  }

  handleMoveDownMeal(idx: number): void {
    this.formHandler.moveDownMeal(idx);
  }

  handleRemoveMeal(idx: number): void {
    this.formHandler.removeMeal(idx);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dayOfEating) {
      this.formHandler.setValue(this.dayOfEating);
    }
  }
}
