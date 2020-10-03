import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MealFormHandler} from './meal-form-handler';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent {

  @Input() formHandler: MealFormHandler;
  @Input() new = false;
  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  handleSubmit(): void {
    this.save.emit();
  }

  handleCancel(): void {
    this.cancel.emit();
  }

}
