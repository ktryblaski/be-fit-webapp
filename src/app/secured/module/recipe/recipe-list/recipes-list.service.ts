import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, noop, Observable, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { RecipeRestService } from '../../../../shared/service/rest/recipe-rest.service';
import { ErrorModalService } from '../../../../shared/component/error-modal/error-modal.service';
import { RecipesSearchParams } from './-model/recipes.search-params';
import { RecipeLite } from '../-model/recipe-lite';
import { fromDTO, Paged } from '../../../../shared/model/table/paged';

@Injectable()
export class RecipesListService implements OnDestroy {

  private readonly loadAction = new Subject<RecipesSearchParams>();

  private readonly recipes = new BehaviorSubject<Paged<RecipeLite>>(null);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);

  private subscription: Subscription;

  readonly recipes$: Observable<Paged<RecipeLite>> = this.recipes.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());

  constructor(private restService: RecipeRestService, private errorModalService: ErrorModalService) {
    this.subscription = this.loadEffect().subscribe(noop);
  }

  load(params: RecipesSearchParams): void {
    this.loadAction.next(params);
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
      }),
      switchMap(params => this.restService.findAll(params).pipe(
        tap(recipes => {
          this.recipes.next(fromDTO(recipes));
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
