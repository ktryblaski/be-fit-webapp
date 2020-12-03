import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, forkJoin, merge, noop, Observable, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { NotificationSeverity } from '../../../shared/component/notification/notification';
import { NotificationService } from '../../../shared/component/notification/notification.service';
import { Router } from '@angular/router';
import { RecipeFormValue } from '../recipe-form/-shared/recipe-form-value';
import { Recipe, RecipeCU } from '../../../shared/model/domain/recipe';
import { RecipeFormDataSource } from '../recipe-form/-shared/recipe-form-data-source';
import { ProductRestService } from '../../../shared/service/rest/product-rest.service';
import { RecipeRestService } from '../../../shared/service/rest/recipe-rest.service';
import { ErrorModalService } from '../../../shared/component/error-modal/error-modal.service';

@Injectable()
export class RecipeEditService {

  private readonly saveAction = new Subject<RecipeFormValue>();
  private readonly loadAction = new Subject<number>();

  private readonly saving = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly recipe = new BehaviorSubject<Recipe | null>(null);
  private readonly dataSource = new BehaviorSubject<RecipeFormDataSource | null>(null);

  readonly saving$: Observable<boolean> = this.saving.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly recipe$: Observable<Recipe | null> = this.recipe.pipe(distinctUntilChanged());
  readonly dataSource$: Observable<RecipeFormDataSource | null> = this.dataSource.pipe(distinctUntilChanged());

  private subscription: Subscription;

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

  load(recipeId: number): void {
    this.loadAction.next(recipeId);
  }

  save(formValue: RecipeFormValue): void {
    this.saveAction.next(formValue);
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
      }),
      switchMap(recipeId => forkJoin([
        this.restService.getOne(recipeId),
        this.productRestService.findAllLegacy()
      ]).pipe(
        tap(([recipe, products]) => {
          this.recipe.next(recipe);
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

  private saveEffect(): Observable<never> {
    return this.saveAction.pipe(
      tap(() => {
        this.saving.next(true);
      }),
      switchMap(formValue => this.restService.update(this.mapToUpdate(formValue)).pipe(
        tap(recipe => {
          this.router.navigate(['recipe', recipe.id]);
          this.notificationService.show({
            message: 'The meal has been saved',
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

  private mapToUpdate(formValue: RecipeFormValue): RecipeCU {
    return {
      id: this.recipe.value.id,
      name: formValue.name,
      description: formValue.description,
      ingredients: formValue.ingredients.map(i => ({ id: i.id, productId: i.product.id, weight: i.weight })),
      active: this.recipe.value.active,
    };
  }
}
