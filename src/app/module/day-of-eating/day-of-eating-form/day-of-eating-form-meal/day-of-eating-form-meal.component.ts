import { Component, Input } from '@angular/core';
import { DayOfEatingFormHandler } from '../day-of-eating-form-handler';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { DayOfEatingFormDataSource } from '../-shared/day-of-eating-form-data-source';

@Component({
  selector: 'app-day-of-eating-form-meal',
  templateUrl: './day-of-eating-form-meal.component.html',
  styleUrls: ['./day-of-eating-form-meal.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class DayOfEatingFormMealComponent {
  @Input() mealIdx: number;
  @Input() dataSource: DayOfEatingFormDataSource;

  constructor(public formHandler: DayOfEatingFormHandler) {}

  get control(): FormGroup {
    return this.formHandler.meals.at(this.mealIdx) as FormGroup;
  }

  get name(): FormControl {
    return this.control.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.control.get('description') as FormControl;
  }
}
