import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { CopyExistingMealFormHandler } from './copy-existing-meal-form-handler';
import { MealTemplate } from '../../../../shared/model/domain/meal-template';

export type CopyExistingMealDialogResult = MealTemplate;
export type CopyExistingMealDialogData = MealTemplate[];

@Component({
  selector: 'app-copy-existing-meal-form-dialog',
  templateUrl: './copy-existing-meal-form-dialog.component.html',
  styleUrls: ['./copy-existing-meal-form-dialog.component.scss'],
  providers: [CopyExistingMealFormHandler],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyExistingMealFormDialogComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CopyExistingMealDialogData,
    public formHandler: CopyExistingMealFormHandler,
    private dialogRef: MatDialogRef<CopyExistingMealFormDialogComponent>
  ) {}

  displayFn(mealTemplate: MealTemplate): string {
    return mealTemplate?.name || '';
  }

  handleSubmit(): void {
    this.dialogRef.close(this.formHandler.getValue());
  }

  handleCancel(): void {
    this.dialogRef.close();
  }
}
