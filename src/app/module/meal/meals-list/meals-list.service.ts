import { Injectable, OnDestroy } from '@angular/core';
import { MealRestService } from '../../../shared/service/rest/meal-rest.service';
import { BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { MealView } from '../../../shared/model/domain/meal';
import { NotificationService } from '../../../shared/component/notification/notification.service';
import { NotificationSeverity } from '../../../shared/component/notification/notification';

@Injectable()
export class MealsListService implements OnDestroy {

  private readonly loadAction = new Subject();

  private readonly meals = new BehaviorSubject<MealView[]>(null);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);

  readonly meals$: Observable<MealView[]> = this.meals.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: MealRestService,
              private notificationService: NotificationService) {
    this.subscription = merge(
      this.loadEffect()
    ).subscribe(noop);
  }

  load(): void {
    this.loadAction.next();
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
      }),
      switchMap(() => this.restService.findAll().pipe(
        tap((meals: MealView[]) => {
          this.meals.next(meals);
          this.loaded.next(true);
          this.loading.next(false);
        }),
        catchError(error => {
          console.error(error);
          this.loading.next(false);
          this.notificationService.show({
            message: 'An error has occurred',
            severity: NotificationSeverity.DANGER
          });
          return EMPTY;
        })
      )),
      ignoreElements()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
