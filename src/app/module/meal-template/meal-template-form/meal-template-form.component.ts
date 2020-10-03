import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {MealTemplateFormHandler} from './meal-template-form-handler';
import {MealTemplateFormValue} from './-model/meal-template-form-value';
import {MealTemplateFormDataSource} from './-model/meal-template-form-data-source';
import {MealTemplate} from '../../../shared/model/domain/meal-template';

@Component({
  selector: 'app-meal-template-form',
  templateUrl: './meal-template-form.component.html',
  styleUrls: ['./meal-template-form.component.scss'],
  providers: [MealTemplateFormHandler]
})
export class MealTemplateFormComponent implements OnChanges {

  @Input() mealTemplate: MealTemplate;
  @Input() dataSource: MealTemplateFormDataSource;
  @Output() save: EventEmitter<MealTemplateFormValue> = new EventEmitter<MealTemplateFormValue>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(public formHandler: MealTemplateFormHandler) { }

  handleSubmit(): void {
    this.save.emit(this.formHandler.getValue());
  }

  handleCancel(): void {
    this.cancel.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.mealTemplate) {
      // TODO why
      setTimeout(() => {
        this.formHandler.setValue(this.mealTemplate);
      }, 0);
    }
  }

}
