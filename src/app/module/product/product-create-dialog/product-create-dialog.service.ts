import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, EMPTY, noop, Observable, Subject, Subscription} from 'rxjs';
import {catchError, distinctUntilChanged, ignoreElements, switchMap, tap} from 'rxjs/operators';
import {ProductFormHandler} from './product-form-handler';
import {ProductRestService} from '../../../shared/service/rest/product-rest.service';
import {Product} from '../../../shared/model/domain/product';
import {NotificationService} from '../../../shared/component/notification/notification.service';
import {NotificationSeverity} from '../../../shared/component/notification/notification';

@Injectable()
export class ProductCreateDialogService implements OnDestroy {

  private readonly createAction = new Subject<ProductFormHandler>();

  private readonly saved = new BehaviorSubject<boolean>(false);
  private readonly saving = new BehaviorSubject<boolean>(false);

  readonly saved$: Observable<boolean> = this.saved.pipe(distinctUntilChanged());
  readonly saving$: Observable<boolean> = this.saving.pipe(distinctUntilChanged());

  private readonly subscription: Subscription;

  constructor(private restService: ProductRestService,
              private notificationService: NotificationService) {
    this.subscription = this.createEffect().subscribe(noop);
  }

  create(formHandler: ProductFormHandler): void {
    this.createAction.next(formHandler);
  }

  private createEffect(): Observable<never> {
    return this.createAction.pipe(
      tap(() => {
        this.saving.next(true);
      }),
      switchMap((formHandler: ProductFormHandler) =>
        this.restService.saveProduct(this.mapProduct(formHandler)).pipe(
          tap(() => {
            this.saving.next(false);
            this.saved.next(true);
            this.notificationService.show({
              message: 'New product has been added',
              severity: NotificationSeverity.SUCCESS
            });
          }),
          catchError((error) => {
            console.error(error);
            this.saving.next(false);
            this.notificationService.show({
              message: 'An error has occurred',
              severity: NotificationSeverity.DANGER
            });
            return EMPTY;
          })
        )),
      ignoreElements()
    );
  }

  private mapProduct(formHandler: ProductFormHandler): Product {
    const form = formHandler.form;

    return {
      name: form.get('name').value,
      macronutrients: {
        carbohydrates: form.get('carbohydrates').value,
        proteins: form.get('proteins').value,
        fats: form.get('fats').value
      }
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
