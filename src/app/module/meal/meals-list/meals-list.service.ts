import {Injectable, OnDestroy} from '@angular/core';
import {MealRestService} from "../../../shared/rest/meal-rest.service";
import {BehaviorSubject, merge, noop, Observable, Subject, Subscription, throwError} from "rxjs";
import {catchError, distinctUntilChanged, ignoreElements, switchMap, tap} from "rxjs/operators";
import {MealView} from "../../../shared/model/domain/meal";

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

  constructor(private restService: MealRestService) {
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
      switchMap(() => this.restService.getMealsLite().pipe(
        tap((meals: MealView[]) => {
          this.meals.next(meals);
          this.loaded.next(true);
          this.loading.next(false);
        }),
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      )),
      ignoreElements()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
