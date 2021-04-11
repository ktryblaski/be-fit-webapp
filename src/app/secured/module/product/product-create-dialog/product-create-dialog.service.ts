import { Injectable } from '@angular/core';
import { ProductRestService } from '../../../../shared/service/rest/product-rest.service';
import { BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription } from 'rxjs';
import { ProductFormValue } from '../product-create-form/model/product-form-value';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { NotificationSeverity } from '../../../../shared/component/notification/notification';
import { NotificationService } from '../../../../shared/component/notification/notification.service';
import { ErrorModalService } from '../../../../shared/component/error-modal/error-modal.service';
import { Product } from '../-model/product';

@Injectable()
export class ProductCreateDialogService {

  private readonly createAction = new Subject<ProductFormValue>();

  private readonly created = new BehaviorSubject<boolean>(false);
  private readonly creating = new BehaviorSubject<boolean>(false);

  readonly creating$: Observable<boolean> = this.creating.pipe(distinctUntilChanged());
  readonly created$: Observable<boolean> = this.created.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: ProductRestService,
              private notificationService: NotificationService,
              private errorModalService: ErrorModalService) {

    this.subscription = this.createEffect().subscribe(noop);
  }


  create(formValue: ProductFormValue): void {
    this.createAction.next(formValue);
  }

  private createEffect(): Observable<never> {
    return this.createAction.pipe(
      tap(() => this.creating.next(true)),
      switchMap(formValue => this.restService.save(this.mapProduct(formValue)).pipe(
        tap(() => {
          this.notificationService.show({
            message: 'New product has been added',
            severity: NotificationSeverity.SUCCESS
          });
          this.created.next(true);
        }),
        catchError(error => {
          console.error(error);
          this.errorModalService.showError('An error has occurred while creating new product');
          return EMPTY;
        }),
        finalize(() => this.creating.next(false))
      )),
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
      }
    };
  }


}
