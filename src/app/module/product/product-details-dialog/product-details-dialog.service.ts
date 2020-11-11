import { Injectable, OnDestroy } from '@angular/core';
import { ProductRestService } from '../../../shared/service/rest/product-rest.service';
import { BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription } from 'rxjs';
import { Product } from '../../../shared/model/domain/product';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { ErrorModalService } from '../../../shared/error-modal/error-modal.service';
import { NotificationSeverity } from '../../../shared/component/notification/notification';
import { NotificationService } from '../../../shared/component/notification/notification.service';

@Injectable()
export class ProductDetailsDialogService implements OnDestroy {

  private readonly loadAction = new Subject<number>();
  private readonly favouriteAction = new Subject<void>();

  private readonly product = new BehaviorSubject<Product | null>(null);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);
  private readonly saving = new BehaviorSubject<boolean>(false);
  private readonly saved = new BehaviorSubject<boolean>(false);

  readonly product$: Observable<Product | null> = this.product.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly saving$: Observable<boolean> = this.saving.pipe(distinctUntilChanged());
  readonly saved$: Observable<boolean> = this.saved.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: ProductRestService,
              private notificationService: NotificationService,
              private errorModalService: ErrorModalService) {

    this.subscription = merge(
      this.loadEffect(),
      this.toggleFavouriteEffect()
    ).subscribe(noop);
  }

  load(productId: number): void {
    this.loadAction.next(productId);
  }

  toggleFavourite(): void {
    this.favouriteAction.next();
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => this.loading.next(true)),
      switchMap(productId => this.restService.getOne(productId).pipe(
        tap(product => {
          this.product.next(product);
          this.loaded.next(true);
        }),
        catchError(error => {
          console.error(error);
          this.errorModalService.showError('An error has occurred while creating new product');
          return EMPTY;
        }),
        finalize(() => this.loading.next(false))
      )),
      ignoreElements()
    );
  }

  private toggleFavouriteEffect(): Observable<never> {
    return this.favouriteAction.pipe(
      tap(() => this.saving.next(true)),
      switchMap(() => {
        const product = this.product.value;
        const action = product.favourite ? this.restService.unfavourite(product.id) : this.restService.favourite(product.id);

        return action.pipe(
          tap(savedProduct => {
            this.product.next(savedProduct);
            this.saved.next(true);
            this.notificationService.show({
              message: savedProduct.favourite ? 'Product has been been added to favourites' : 'Product has been removed from favourites',
              severity: NotificationSeverity.SUCCESS,
            });
          }),
          catchError(error => {
            console.error(error);
            this.errorModalService.showError(
              this.product.value.favourite
                ? 'An error has occurred while removing from favourites'
                : 'An error has occurred while adding to favourites'
            );
            return EMPTY;
          }),
          finalize(() => this.saving.next(false))
        );
      }),
      ignoreElements()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
