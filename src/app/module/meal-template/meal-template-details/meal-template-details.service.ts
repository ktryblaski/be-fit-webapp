import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, EMPTY, noop, Observable, Subject, Subscription} from 'rxjs';
import {catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap} from 'rxjs/operators';
import {NotificationService} from '../../../shared/component/notification/notification.service';
import {NotificationSeverity} from '../../../shared/component/notification/notification';
import {MealTemplate} from '../../../shared/model/domain/meal-template';
import {MealTemplateRestService} from '../../../shared/service/rest/meal-template-rest.service';

@Injectable()
export class MealTemplateDetailsService implements OnDestroy {

  private readonly loadAction = new Subject<number>();

  private readonly mealTemplate = new BehaviorSubject<MealTemplate>(null);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);

  private subscription: Subscription;

  readonly mealTemplate$: Observable<MealTemplate> = this.mealTemplate.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());

  constructor(private restService: MealTemplateRestService,
              private notificationService: NotificationService) {

    this.subscription = this.loadEffect().subscribe(noop);
  }

  load(mealTemplateId: number): void {
    this.loadAction.next(mealTemplateId);
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
      }),
      switchMap(mealTemplateId => this.restService.get(mealTemplateId).pipe(
        tap(mealTemplate => {
          this.mealTemplate.next(mealTemplate);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
