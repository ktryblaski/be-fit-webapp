import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { DayOfEatingBeginFormHandler } from './day-of-eating-begin-form-handler';
import { DayOfEatingBeginFormDataSource } from './-shared/day-of-eating-begin-form-data-source';
import { DayOfEatingBeginFormValue } from './-shared/day-of-eating-begin-form-value';
import { noop, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { DayOfEatingBeginOrigin } from '../../../../shared/model/dto/day-of-eating-begin-dto';

@Component({
  selector: 'app-day-of-eating-begin-form',
  templateUrl: './day-of-eating-begin-form.component.html',
  styleUrls: ['./day-of-eating-begin-form.component.scss'],
  providers: [DayOfEatingBeginFormHandler]
})
export class DayOfEatingBeginFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() dataSource: DayOfEatingBeginFormDataSource;
  @Output() save = new EventEmitter<DayOfEatingBeginFormValue>();
  @Output() cancel = new EventEmitter();

  readonly DayOfEatingBeginOrigin = DayOfEatingBeginOrigin;

  private availableMoments: moment.Moment[];

  private subscription: Subscription;

  constructor(public formHandler: DayOfEatingBeginFormHandler) { }

  dateFilter = (date: Date) => {
    const dateMoment = moment(date);
    return this.availableMoments.some(availableMoment => availableMoment.isSame(dateMoment, 'day'));
  }

  ngOnInit(): void {
    this.subscription = this.formHandler.origin.values.pipe(
      filter(origin => DayOfEatingBeginOrigin.AS_COPY === origin),
      tap(() => {
        this.formHandler.setOriginDayDateValue(this.resolveDefaultOriginDayDate());
      })
    ).subscribe(noop);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataSource) {
      this.availableMoments = this.dataSource.dayOfEatings.map(doe => moment(doe.dayDate));
    }
  }

  handleSubmit(): void {
    this.save.emit(this.formHandler.getValue());
  }

  handleCancel(): void {
    this.cancel.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private resolveDefaultOriginDayDate(): Date {
    if (this.availableMoments.length === 0) {
      return null;
    }

    return moment.max(this.availableMoments).toDate();
  }

}
