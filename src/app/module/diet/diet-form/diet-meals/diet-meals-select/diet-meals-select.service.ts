import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, noop, Observable, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { NotificationSeverity } from '../../../../../shared/component/notification/notification';
import { NotificationService } from '../../../../../shared/component/notification/notification.service';
import { MealView } from '../../../../../shared/model/domain/meal';
import { MealRestService } from '../../../../../shared/service/rest/meal-rest.service';

@Injectable()
export class DietMealsSelectService implements OnDestroy {

  private readonly loadAction: Subject<never> = new Subject<never>();

  private readonly meals: BehaviorSubject<MealView[]> = new BehaviorSubject<MealView[]>([]);
  private readonly loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  readonly meals$: Observable<MealView[]> = this.meals.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());

  private readonly subscription: Subscription;

  constructor(private restService: MealRestService,
              private notificationService: NotificationService) {

    this.subscription = this.loadEffect().subscribe(noop);
  }

  load(): void {
    this.loadAction.next();
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
      }),
      switchMap(() => this.restService.findAllActive().pipe(
        tap((meals: MealView[]) => {
          this.meals.next(meals);
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
