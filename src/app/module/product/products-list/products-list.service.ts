import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription } from 'rxjs';
import { Product } from '../../../shared/model/domain/product';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { ProductRestService } from '../../../shared/service/rest/product-rest.service';
import { NotificationService } from '../../../shared/component/notification/notification.service';
import { NotificationSeverity } from '../../../shared/component/notification/notification';
import { ProductFormValue } from '../product-create-form/model/product-form-value';
import { ErrorModalService } from '../../../shared/error-modal/error-modal.service';

@Injectable()
export class ProductsListService implements OnDestroy {

  private readonly loadAction = new Subject();
  private readonly createAction = new Subject<ProductFormValue>();

  private readonly products = new BehaviorSubject<Product[]>([]);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);
  private readonly creating = new BehaviorSubject<boolean>(false);

  readonly products$: Observable<Product[]> = this.products.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly creating$: Observable<boolean> = this.creating.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: ProductRestService,
              private notificationService: NotificationService,
              private errorModalService: ErrorModalService) {

    this.subscription = merge(
      this.loadEffect(),
      this.createEffect()
    ).subscribe(noop);
  }

  load(): void {
    this.loadAction.next();
  }

  create(formValue: ProductFormValue): void {
    this.createAction.next(formValue);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private createEffect(): Observable<never> {
    return this.createAction.pipe(
      tap(() => this.creating.next(true)),
      switchMap(formValue =>
        this.restService.save(this.mapProduct(formValue)).pipe(
          tap(() => {
            this.notificationService.show({
              message: 'New product has been added',
              severity: NotificationSeverity.SUCCESS,
            });
            this.load();
          }),
          catchError(error => {
            console.error(error);
            this.errorModalService.showError('An error has occurred while creating new product');
            return EMPTY;
          }),
          finalize(() => this.creating.next(false))
        )
      ),
      ignoreElements()
    );
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => this.loading.next(true)),
      switchMap(() =>
        this.restService.findAll().pipe(
          tap(products => {
            this.products.next(products);
            this.loaded.next(true);
          }),
          catchError(error => {
            console.error(error);
            this.errorModalService.showError('An error has occurred while loading data');
            return EMPTY;
          }),
          finalize(() => this.loading.next(false))
        )
      ),
      ignoreElements()
    );
  }

  private mapProduct(formValue: ProductFormValue): Product {
    return {
      name: formValue.name,
      favourite: false,
      macronutrients: {
        carbohydrates: formValue.carbohydrates,
        proteins: formValue.proteins,
        fats: formValue.fats
      },
    };
  }

}
