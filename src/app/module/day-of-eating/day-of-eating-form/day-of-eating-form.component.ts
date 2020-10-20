import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DayOfEating } from '../../../shared/model/domain/day-of-eating';
import { DayOfEatingFormDataSource } from './-shared/day-of-eating-form-data-source';
import { DayOfEatingFormHandler } from './day-of-eating-form-handler';
import { DayOfEatingFormValue } from './-shared/day-of-eating-form-value';

@Component({
  selector: 'app-day-of-eating-form',
  templateUrl: './day-of-eating-form.component.html',
  styleUrls: ['./day-of-eating-form.component.scss'],
  providers: [DayOfEatingFormHandler]
})
export class DayOfEatingFormComponent implements OnChanges {

  readonly DATE_FORMAT = 'dd-MM-yyy';

  @Input() dayOfEating: DayOfEating;
  @Input() dataSource: DayOfEatingFormDataSource;
  @Output() save = new EventEmitter<DayOfEatingFormValue>();
  @Output() cancel = new EventEmitter();

  constructor(public formHandler: DayOfEatingFormHandler) { }

  handleSubmit(): void {
    this.save.emit(this.formHandler.getValue());
  }

  handleCancel(): void {
    this.cancel.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dayOfEating) {
      this.formHandler.setValue(this.dayOfEating);
    }
  }

}
