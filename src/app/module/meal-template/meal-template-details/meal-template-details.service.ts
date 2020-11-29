import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { NotificationService } from '../../../shared/component/notification/notification.service';
import { NotificationSeverity } from '../../../shared/component/notification/notification';
import { MealTemplate } from '../../../shared/model/domain/meal-template';
import { MealTemplateRestService } from '../../../shared/service/rest/meal-template-rest.service';
import { ErrorModalService } from '../../../shared/component/error-modal/error-modal.service';

@Injectable()
export class MealTemplateDetailsService implements OnDestroy {
  private readonly loadAction = new Subject<number>();
  private readonly activateAction = new Subject<void>();
  private readonly deactivateAction = new Subject<void>();

  private readonly mealTemplate = new BehaviorSubject<MealTemplate | null>(null);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);
  private readonly saving = new BehaviorSubject<boolean>(false);

  private subscription: Subscription;

  readonly mealTemplate$: Observable<MealTemplate | null> = this.mealTemplate.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly saving$: Observable<boolean> = this.saving.pipe(distinctUntilChanged());

  constructor(
    private restService: MealTemplateRestService,
    private notificationService: NotificationService,
    private errorModalService: ErrorModalService
  ) {
    this.subscription = merge(this.loadEffect(), this.activateEffect(), this.deactivateEffect()).subscribe(noop);
  }

  load(mealTemplateId: number): void {
    this.loadAction.next(mealTemplateId);
  }

  activate(): void {
    this.activateAction.next();
  }

  deactivate(): void {
    this.deactivateAction.next();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
      }),
      switchMap(mealTemplateId =>
        this.restService.getOne(mealTemplateId).pipe(
          tap(mealTemplate => {
            this.mealTemplate.next(mealTemplate);
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
        )
      ),
      ignoreElements()
    );
  }

  private activateEffect(): Observable<never> {
    return this.activateAction.pipe(
      tap(() => {
        this.saving.next(true);
      }),
      switchMap(() =>
        this.restService.activate(this.mealTemplate.value.id).pipe(
          tap(mealTemplate => {
            this.mealTemplate.next(mealTemplate);
            this.notificationService.show({
              message: 'The Meal Template has been activated',
              severity: NotificationSeverity.SUCCESS,
            });
          }),
          catchError(error => {
            console.error(error);
            this.errorModalService.showError('An error has occurred while activating meal template');
            return EMPTY;
          }),
          finalize(() => {
            this.saving.next(false);
          })
        )
      ),
      ignoreElements()
    );
  }

  private deactivateEffect(): Observable<never> {
    return this.deactivateAction.pipe(
      tap(() => {
        this.saving.next(true);
      }),
      switchMap(() =>
        this.restService.deactivate(this.mealTemplate.value.id).pipe(
          tap(mealTemplate => {
            this.mealTemplate.next(mealTemplate);
            this.notificationService.show({
              message: 'The Meal Template has been deactivated',
              severity: NotificationSeverity.SUCCESS,
            });
          }),
          catchError(error => {
            console.error(error);
            this.errorModalService.showError('An error has occurred while deactivating meal template');
            return EMPTY;
          }),
          finalize(() => {
            this.saving.next(false);
          })
        )
      ),
      ignoreElements()
    );
  }
}
