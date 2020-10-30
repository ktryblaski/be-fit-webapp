import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MealFormHandler } from './meal-form-handler';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
})
export class MealFormComponent {
  @Input() formHandler: MealFormHandler;
  @Input() new = false;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  handleSubmit(): void {
    this.save.emit();
  }

  handleCancel(): void {
    this.cancel.emit();
  }
}
