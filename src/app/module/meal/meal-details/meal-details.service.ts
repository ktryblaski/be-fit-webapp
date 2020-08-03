import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription} from "rxjs";
import {catchError, distinctUntilChanged, ignoreElements, switchMap, tap} from "rxjs/operators";
import {Meal} from "../../../shared/model/domain/meal";
import {MealRestService} from "../../../shared/service/rest/meal-rest.service";
import {NotificationService} from "../../../shared/component/notification/notification.service";
import {NotificationSeverity} from "../../../shared/component/notification/notification";

@Injectable()
export class MealDetailsService implements OnDestroy {

  private readonly loadAction = new Subject<number>();

  private readonly meal = new BehaviorSubject<Meal>(null);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);

  readonly meal$: Observable<Meal> = this.meal.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: MealRestService,
              private notificationService: NotificationService) {

    this.subscription = merge(
      this.loadEffect()
    ).subscribe(noop);
  }

  load(mealId: number): void {
    this.loadAction.next(mealId);
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
      }),
      switchMap((mealId: number) => this.restService.getMeal(mealId).pipe(
        tap((meal: Meal) => {
          this.meal.next(meal);
          this.loaded.next(true);
          this.loading.next(false);
        }),
        catchError((error) => {
          console.error(error);
          this.loading.next(false);
          this.notificationService.show({
            message: 'An error has occurred',
            severity: NotificationSeverity.DANGER
          })
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
