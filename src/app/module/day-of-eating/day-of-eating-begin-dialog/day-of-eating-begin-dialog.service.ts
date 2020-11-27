import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, noop, Observable, Subject, Subscription } from 'rxjs';
import { DayOfEatingBeginFormDataSource } from './day-of-eating-begin-form/model/day-of-eating-begin-form-data-source';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { DayOfEatingRestService } from '../../../shared/service/rest/day-of-eating-rest.service';
import { DayOfEatingBeginFormValue } from './day-of-eating-begin-form/model/day-of-eating-begin-form-value';
import * as moment from 'moment';
import { DayOfEatingBeginDTO, DayOfEatingBeginOrigin } from '../../../shared/model/dto/day-of-eating-begin-dto';
import { ErrorModalService } from '../../../shared/error-modal/error-modal.service';

@Injectable()
export class DayOfEatingBeginDialogService implements OnDestroy {

  private readonly loading = new BehaviorSubject<boolean>(false);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly dataSource = new BehaviorSubject<DayOfEatingBeginFormDataSource | null>(null);

  private loadAction = new Subject<void>();

  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly dataSource$: Observable<DayOfEatingBeginFormDataSource | null> = this.dataSource.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private dayOfEatingRestService: DayOfEatingRestService,
              private errorModalService: ErrorModalService) {

    this.subscription = this.loadEffect().subscribe(noop);
  }

  load(): void {
    this.loadAction.next();
  }

  mapDayOfEatingBegin(formValue: DayOfEatingBeginFormValue): DayOfEatingBeginDTO {
    return {
      origin: formValue.origin,
      originDayId: DayOfEatingBeginOrigin.AS_COPY === formValue.origin ? this.getDayByDate(formValue.originDayDate) : null,
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => this.loading.next(true)),
      switchMap(() =>
        this.dayOfEatingRestService.findAllLites().pipe(
          tap(daysOfEating => {
            this.dataSource.next({ daysOfEating });
            this.loaded.next(true);
          }),
          catchError(error => {
            console.error(error);
            this.errorModalService.showError('An error has occurred while loading data');
            return EMPTY;
          }),
          finalize(() => this.loading.next(false))
        )
      ),
      ignoreElements()
    );
  }

  private getDayByDate(date: Date): number {
    return this.dataSource.value.daysOfEating.find(
      day => moment(day.dayDate).isSame(moment(date), 'day')
    ).id;
  }
}
