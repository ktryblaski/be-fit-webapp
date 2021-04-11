import { Injectable, OnDestroy } from '@angular/core';
import { DayOfEatingRestService } from '../../../../shared/service/rest/day-of-eating-rest.service';
import { BehaviorSubject, EMPTY, forkJoin, merge, noop, Observable, Subject, Subscription } from 'rxjs';
import { DayOfEatingLite } from '../../../../shared/model/domain/day-of-eating';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { NotificationSeverity } from '../../../../shared/component/notification/notification';
import { NotificationService } from '../../../../shared/component/notification/notification.service';
import { DayOfEatingBeginDTO } from '../day-of-eating-begin-dialog/-dto/day-of-eating-begin.dto';
import { Router } from '@angular/router';
import { ErrorModalService } from '../../../../shared/component/error-modal/error-modal.service';

@Injectable()
export class DayOfEatingListService implements OnDestroy {

  private readonly loadAction = new Subject();
  private readonly saveAction = new Subject<DayOfEatingBeginDTO>();

  private readonly loading = new BehaviorSubject<boolean>(false);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly daysOfEating = new BehaviorSubject<DayOfEatingLite[]>([]);
  private readonly canBeginDayOfEating = new BehaviorSubject<boolean>(false);
  private readonly saving = new BehaviorSubject<boolean>(false);

  private subscription: Subscription;

  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly daysOfEating$: Observable<DayOfEatingLite[]> = this.daysOfEating.pipe(distinctUntilChanged());
  readonly canBeginDayOfEating$: Observable<boolean> = this.canBeginDayOfEating.pipe(distinctUntilChanged());
  readonly saving$: Observable<boolean> = this.saving.pipe(distinctUntilChanged());

  constructor(private restService: DayOfEatingRestService,
              private notificationService: NotificationService,
              private errorModalService: ErrorModalService,
              private router: Router) {

    this.subscription = merge(
      this.loadEffect(),
      this.saveEffect()
    ).subscribe(noop);
  }

  load(): void {
    this.loadAction.next();
  }

  save(dayOfEatingBegin: DayOfEatingBeginDTO): void {
    this.saveAction.next(dayOfEatingBegin);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => this.loading.next(true)),
      switchMap(() => forkJoin([this.restService.findAllLites(), this.restService.canBeginDayOfEating()]).pipe(
        tap(([daysOfEating, canBeginDayOfEating]) => {
          this.loaded.next(true);
          this.daysOfEating.next(daysOfEating);
          this.canBeginDayOfEating.next(canBeginDayOfEating);
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

  private saveEffect(): Observable<never> {
    return this.saveAction.pipe(
      tap(() => this.saving.next(true)),
      switchMap(dayOfEatingBegin => this.restService.create(dayOfEatingBegin).pipe(
        tap(id => {
          this.router.navigate(['day-of-eating', id]);
          this.notificationService.show({
            message: 'Day of Eating has been created',
            severity: NotificationSeverity.SUCCESS,
          });
        }),
        catchError(error => {
          console.error(error);
          this.notificationService.show({
            message: 'An error has occurred',
            severity: NotificationSeverity.DANGER,
          });
          return EMPTY;
        }),
        finalize(() => this.saving.next(false))
        )
      ),
      ignoreElements()
    );
  }
}
