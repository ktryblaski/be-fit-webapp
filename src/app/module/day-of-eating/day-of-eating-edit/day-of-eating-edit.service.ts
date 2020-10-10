import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, forkJoin, merge, noop, Observable, Subject, Subscription } from 'rxjs';
import { DayOfEating } from '../../../shared/model/domain/day-of-eating';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { DayOfEatingRestService } from '../../../shared/service/rest/day-of-eating-rest.service';
import { NotificationService } from '../../../shared/component/notification/notification.service';
import { NotificationSeverity } from '../../../shared/component/notification/notification';
import { DayOfEatingFormDataSource } from '../day-of-eating-form/-shared/day-of-eating-form-data-source';
import { DayOfEatingFormValue } from '../day-of-eating-form/-shared/day-of-eating-form-value';
import { ProductRestService } from '../../../shared/service/rest/product-rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MealTemplateRestService } from '../../../shared/service/rest/meal-template-rest.service';

@Injectable({
  providedIn: 'root'
})
export class DayOfEatingEditService implements OnDestroy {

  private loadAction = new Subject<number>();
  private saveAction = new Subject<DayOfEatingFormValue>();

  private readonly loading = new BehaviorSubject<boolean>(false);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly dayOfEating = new BehaviorSubject<DayOfEating | null>(null);
  private readonly dataSource = new BehaviorSubject<DayOfEatingFormDataSource | null>(null);
  private readonly saving = new BehaviorSubject<boolean>(false);

  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly dayOfEating$: Observable<DayOfEating | null> = this.dayOfEating.pipe(distinctUntilChanged());
  readonly dataSource$: Observable<DayOfEatingFormDataSource | null> = this.dataSource.pipe(distinctUntilChanged());
  readonly saving$: Observable<boolean> = this.saving.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: DayOfEatingRestService,
              private mealTemplateRestService: MealTemplateRestService,
              private productRestService: ProductRestService,
              private notificationService: NotificationService,
              private router: Router,
              private route: ActivatedRoute) {

    this.subscription = merge(
      this.loadEffect(),
      this.saveEffect()
    ).subscribe(noop);
  }

  load(id: number): void {
    this.loadAction.next(id);
  }

  save(formValue: DayOfEatingFormValue): void {
    this.saveAction.next(formValue);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
      }),
      switchMap(id => forkJoin([
        this.restService.get(id),
        this.mealTemplateRestService.findAllActive(),
        this.productRestService.findAll()
      ]).pipe(
        tap(([dayOfEating, mealTemplates, products]) => {
          this.dayOfEating.next(dayOfEating);
          this.dataSource.next({mealTemplates, products});
          this.loaded.next(true);
        }),
        catchError(error => {
          console.error(error);
          this.notificationService.show({
            message: 'An error has occurred',
            severity: NotificationSeverity.DANGER
          });
          return EMPTY;
        }),
        finalize(() => {
          this.loading.next(false);
        })
      )),
      ignoreElements()
    );
  }

  private saveEffect(): Observable<never> {
    return this.saveAction.pipe(
      tap(() => {
        this.saving.next(true);
      }),
      switchMap(formValue => this.restService.update(this.mapToSave(formValue)).pipe(
        tap(mealTemplate => {
          this.router.navigate(['../'], {relativeTo: this.route});
          this.notificationService.show({
            message: 'The meal has been saved',
            severity: NotificationSeverity.SUCCESS
          });
        }),
        catchError(error => {
          console.error(error);
          this.notificationService.show({
            message: 'An error has occurred',
            severity: NotificationSeverity.DANGER
          });
          return EMPTY;
        }),
        finalize(() => {
          this.saving.next(false);
        })
      )),
      ignoreElements()
    );
  }

  private mapToSave(formValue: DayOfEatingFormValue): any {
    return {
      id: this.dayOfEating.value.id,
      meals: formValue.meals.map(meal => {
        return {
          name: meal.name,
          description: meal.description,
          ingredients: meal.ingredients.map(i => ({productId: i.product.id, weight: i.weight}))
        };
      })
    };
  }

}
