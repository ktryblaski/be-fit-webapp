import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DayOfEatingBeginFormHandler } from './day-of-eating-begin-form-handler';
import { DayOfEatingBeginFormDataSource } from './model/day-of-eating-begin-form-data-source';
import { DayOfEatingBeginFormValue } from './model/day-of-eating-begin-form-value';
import { noop, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { values$ } from '../../../../shared/form/typed-form/typed-utils';
import { DayOfEatingBeginOrigin } from '../-model/day-of-eating-begin-origin';

@Component({
  selector: 'app-day-of-eating-begin-form',
  templateUrl: './day-of-eating-begin-form.component.html',
  styleUrls: ['./day-of-eating-begin-form.component.scss'],
  providers: [DayOfEatingBeginFormHandler],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayOfEatingBeginFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() dataSource: DayOfEatingBeginFormDataSource;
  @Output() save = new EventEmitter<DayOfEatingBeginFormValue>();
  @Output() cancel = new EventEmitter();

  readonly DayOfEatingBeginOrigin = DayOfEatingBeginOrigin;

  private availableMoments: moment.Moment[];

  private subscription: Subscription;

  dateFilter = (date: Date) => {
    const dateMoment = moment(date);
    return this.availableMoments.some(availableMoment => availableMoment.isSame(dateMoment, 'day'));
  }

  constructor(public formHandler: DayOfEatingBeginFormHandler) { }

  ngOnInit(): void {
    this.subscription = values$(this.formHandler.form.controls.origin).pipe(
      filter(origin => DayOfEatingBeginOrigin.AS_COPY === origin),
      tap(() => this.formHandler.setOriginDayDateValue(this.resolveDefaultOriginDayDate()))
    ).subscribe(noop);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataSource) {
      this.availableMoments = this.dataSource.daysOfEating.map(doe => moment(doe.dayDate));
    }
  }

  handleSubmit(): void {
    if (this.formHandler.form.invalid) {
      return;
    }

    this.save.emit(this.formHandler.getValue());
  }

  handleCancel(): void {
    this.cancel.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private resolveDefaultOriginDayDate(): Date | null {
    return this.availableMoments.length > 0
      ? moment.max(this.availableMoments).toDate()
      : null;
  }
}
