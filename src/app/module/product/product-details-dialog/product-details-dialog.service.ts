import { Injectable, OnDestroy } from '@angular/core';
import { ProductRestService } from '../../../shared/service/rest/product-rest.service';
import { BehaviorSubject, EMPTY, noop, Observable, Subject, Subscription } from 'rxjs';
import { Product } from '../../../shared/model/domain/product';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { ErrorModalService } from '../../../shared/error-modal/error-modal.service';

@Injectable()
export class ProductDetailsDialogService implements OnDestroy {

  private readonly loadAction = new Subject<number>();

  private readonly product = new BehaviorSubject<Product | null>(null);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);

  readonly product$: Observable<Product | null> = this.product.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: ProductRestService,
              private errorModalService: ErrorModalService) {

    this.subscription = this.loadEffect().subscribe(noop);
  }

  load(productId: number): void {
    this.loadAction.next(productId);
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
      }),
      switchMap(productId => this.restService.getOne(productId).pipe(
        tap(product => {
          this.product.next(product);
          this.loaded.next(true);
        }),
        catchError(error => {
          console.error(error);
          this.loading.next(false);
          this.errorModalService.showError('An error has occurred while creating new product');
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
