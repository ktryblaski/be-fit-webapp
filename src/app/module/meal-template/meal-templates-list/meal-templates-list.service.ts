import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, noop, Observable, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { MealTemplateRestService } from '../../../shared/service/rest/meal-template-rest.service';
import { MealTemplate } from '../../../shared/model/domain/meal-template';
import { ErrorModalService } from '../../../shared/error-modal/error-modal.service';

@Injectable()
export class MealTemplatesListService implements OnDestroy {

  private readonly loadAction = new Subject();

  private readonly mealTemplates = new BehaviorSubject<MealTemplate[]>(null);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);

  private subscription: Subscription;

  readonly mealTemplates$: Observable<MealTemplate[]> = this.mealTemplates.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());

  constructor(private restService: MealTemplateRestService,
              private errorModalService: ErrorModalService) {

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
      switchMap(() => this.restService.findAll().pipe(
        tap(mealTemplates => {
          this.mealTemplates.next(mealTemplates);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
