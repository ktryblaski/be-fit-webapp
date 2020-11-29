import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, forkJoin, merge, noop, Observable, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { NotificationSeverity } from '../../../shared/component/notification/notification';
import { NotificationService } from '../../../shared/component/notification/notification.service';
import { Router } from '@angular/router';
import { MealTemplateFormValue } from '../meal-template-form/-shared/meal-template-form-value';
import { MealTemplate, MealTemplateCU } from '../../../shared/model/domain/meal-template';
import { MealTemplateFormDataSource } from '../meal-template-form/-shared/meal-template-form-data-source';
import { ProductRestService } from '../../../shared/service/rest/product-rest.service';
import { MealTemplateRestService } from '../../../shared/service/rest/meal-template-rest.service';
import { ErrorModalService } from '../../../shared/component/error-modal/error-modal.service';

@Injectable()
export class MealTemplateEditService {
  private readonly saveAction = new Subject<MealTemplateFormValue>();
  private readonly loadAction = new Subject<number>();

  private readonly saving = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly mealTemplate = new BehaviorSubject<MealTemplate | null>(null);
  private readonly dataSource = new BehaviorSubject<MealTemplateFormDataSource | null>(null);

  readonly saving$: Observable<boolean> = this.saving.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly mealTemplate$: Observable<MealTemplate | null> = this.mealTemplate.pipe(distinctUntilChanged());
  readonly dataSource$: Observable<MealTemplateFormDataSource | null> = this.dataSource.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(
    private restService: MealTemplateRestService,
    private productRestService: ProductRestService,
    private notificationService: NotificationService,
    private errorModalService: ErrorModalService,
    private router: Router
  ) {
    this.subscription = merge(this.loadEffect(), this.saveEffect()).subscribe(noop);
  }

  load(mealTemplateId: number): void {
    this.loadAction.next(mealTemplateId);
  }

  save(formValue: MealTemplateFormValue): void {
    this.saveAction.next(formValue);
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
      }),
      switchMap(mealTemplateId =>
        forkJoin([this.restService.getOne(mealTemplateId), this.productRestService.findAll()]).pipe(
          tap(([mealTemplate, products]) => {
            this.mealTemplate.next(mealTemplate);
            this.dataSource.next({ products: products.content });
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

  private saveEffect(): Observable<never> {
    return this.saveAction.pipe(
      tap(() => {
        this.saving.next(true);
      }),
      switchMap(formValue =>
        this.restService.update(this.mapToUpdate(formValue)).pipe(
          tap(mealTemplate => {
            this.router.navigate(['meal-template', mealTemplate.id]);
            this.notificationService.show({
              message: 'The meal has been saved',
              severity: NotificationSeverity.SUCCESS,
            });
          }),
          catchError(error => {
            console.error(error);
            this.errorModalService.showError('An error has occurred while saving meal template');
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

  private mapToUpdate(formValue: MealTemplateFormValue): MealTemplateCU {
    return {
      id: this.mealTemplate.value.id,
      name: formValue.name,
      description: formValue.description,
      ingredients: formValue.ingredients.map(i => ({ id: i.id, productId: i.product.id, weight: i.weight })),
      active: this.mealTemplate.value.active,
    };
  }
}
