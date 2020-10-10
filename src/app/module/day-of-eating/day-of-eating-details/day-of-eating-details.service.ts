import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, noop, Observable, Subject, Subscription } from 'rxjs';
import { DayOfEating } from '../../../shared/model/domain/day-of-eating';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { DayOfEatingRestService } from '../../../shared/service/rest/day-of-eating-rest.service';
import { ErrorModalService } from '../../../shared/error-modal/error-modal.service';

@Injectable()
export class DayOfEatingDetailsService implements OnDestroy {

  private loadAction = new Subject<number>();

  private readonly loading = new BehaviorSubject<boolean>(false);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly dayOfEating = new BehaviorSubject<DayOfEating | null>(null);

  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly dayOfEating$: Observable<DayOfEating | null> = this.dayOfEating.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: DayOfEatingRestService,
              private errorModalService: ErrorModalService) {

    this.subscription = this.loadEffect().subscribe(noop);
  }

  load(id: number): void {
    this.loadAction.next(id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
      }),
      switchMap(id => this.restService.get(id).pipe(
        tap(dayOfEating => {
          this.dayOfEating.next(dayOfEating);
          this.loaded.next(true);
        }),
        catchError(error => {
          console.error(error);
          this.errorModalService.showError('An error has occurred while loading data');
          return EMPTY;
        }),
        finalize(() => {
          this.loading.next(false);
        })
      )),
      ignoreElements()
    );
  }

}
