import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { ProductRestService } from '../../../shared/service/rest/product-rest.service';
import { NotificationService } from '../../../shared/component/notification/notification.service';
import { ErrorModalService } from '../../../shared/component/error-modal/error-modal.service';
import { ProductParams } from './-model/product.params';
import { fromDTO, Paged } from '../../../shared/model/table/paged';
import { ProductLite } from '../-model/product-lite';

@Injectable()
export class ProductsListService implements OnDestroy {

  private readonly loadAction = new Subject<ProductParams>();

  private readonly products = new BehaviorSubject<Paged<ProductLite>>(null);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);

  readonly products$: Observable<Paged<ProductLite>> = this.products.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: ProductRestService,
              private notificationService: NotificationService,
              private errorModalService: ErrorModalService) {

    this.subscription = this.loadEffect().subscribe(noop);
  }

  load(params: ProductParams): void {
    this.loadAction.next(params);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => this.loading.next(true)),
      switchMap(params => this.restService.findAll(params).pipe(
        tap(products => {
          this.products.next(fromDTO(products));
          this.loaded.next(true);
        }),
        catchError(error => {
          console.error(error);
          this.errorModalService.showError('An error has occurred while loading data');
          return EMPTY;
        }),
        finalize(() => this.loading.next(false))
      )),
      ignoreElements()
    );
  }

}
