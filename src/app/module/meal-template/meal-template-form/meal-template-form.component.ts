import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MealTemplateFormHandler } from './meal-template-form-handler';
import { MealTemplateFormValue } from './-shared/meal-template-form-value';
import { MealTemplateFormDataSource } from './-shared/meal-template-form-data-source';
import { MealTemplate } from '../../../shared/model/domain/meal-template';

@Component({
  selector: 'app-meal-template-form',
  templateUrl: './meal-template-form.component.html',
  styleUrls: ['./meal-template-form.component.scss'],
  providers: [MealTemplateFormHandler]
})
export class MealTemplateFormComponent implements OnChanges {

  @Input() mealTemplate: MealTemplate;
  @Input() dataSource: MealTemplateFormDataSource;
  @Output() save = new EventEmitter<MealTemplateFormValue>();
  @Output() cancel = new EventEmitter<void>();

  constructor(public formHandler: MealTemplateFormHandler) { }

  handleSubmit(): void {
    this.save.emit(this.formHandler.getValue());
  }

  handleCancel(): void {
    this.cancel.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.mealTemplate) {
      // TODO without setTimeout formHandler.hasIngredients$ does not catch the initial value
      setTimeout(() => {
        this.formHandler.setValue(this.mealTemplate);
      }, 0);
    }
  }

}
