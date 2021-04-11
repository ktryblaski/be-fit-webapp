import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { NotificationSeverity } from '../../../../shared/component/notification/notification';
import { NotificationService } from '../../../../shared/component/notification/notification.service';
import { Router } from '@angular/router';
import { RecipeFormValue } from '../recipe-form/-shared/recipe-form-value';
import { RecipeRestService } from '../../../../shared/service/rest/recipe-rest.service';
import { ProductRestService } from '../../../../shared/service/rest/product-rest.service';
import { RecipeFormDataSource } from '../recipe-form/-shared/recipe-form-data-source';
import { RecipeCU } from '../-model/recipe';
import { ErrorModalService } from '../../../../shared/component/error-modal/error-modal.service';

@Injectable()
export class RecipeCreateService {

  private readonly saveAction = new Subject<RecipeFormValue>();
  private readonly loadAction = new Subject<void>();

  private readonly saving = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly dataSource = new BehaviorSubject<RecipeFormDataSource | null>(null);

  private subscription: Subscription;

  readonly saving$: Observable<boolean> = this.saving.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly dataSource$: Observable<RecipeFormDataSource | null> = this.dataSource.pipe(distinctUntilChanged());

  constructor(private restService: RecipeRestService,
              private productRestService: ProductRestService,
              private notificationService: NotificationService,
              private errorModalService: ErrorModalService,
              private router: Router) {

    this.subscription = merge(
      this.loadEffect(),
      this.saveEffect()
    ).subscribe(noop);
  }

  load(): void {
    this.loadAction.next();
  }

  save(formValue: RecipeFormValue): void {
    this.saveAction.next(formValue);
  }

  private saveEffect(): Observable<never> {
    return this.saveAction.pipe(
      tap(() => {
        this.saving.next(true);
      }),
      switchMap(formValue => this.restService.create(this.mapToCreate(formValue)).pipe(
        tap(id => {
          this.router.navigate(['recipe', id]);
          this.notificationService.show({
            message: 'New meal has been added',
            severity: NotificationSeverity.SUCCESS,
          });
        }),
        catchError(error => {
          console.error(error);
          this.errorModalService.showError('An error has occurred while saving recipe');
          return EMPTY;
        }),
        finalize(() => {
          this.saving.next(false);
        })
      )),
      ignoreElements()
    );
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
      }),
      switchMap(() => this.productRestService.findAll().pipe(
        tap(products => {
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
      )),
      ignoreElements()
    );
  }

  private mapToCreate(formValue: RecipeFormValue): RecipeCU {
    return {
      id: null,
      name: formValue.name,
      description: formValue.description,
      ingredients: formValue.ingredients.map(i => ({ id: null, productId: i.product.id, weight: i.weight }))
    };
  }
}
