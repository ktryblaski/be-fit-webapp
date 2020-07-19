import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, noop, Observable, Subject, Subscription, throwError} from "rxjs";
import {catchError, distinctUntilChanged, ignoreElements, switchMap, tap} from "rxjs/operators";
import {ProductFormHandler} from "./product-form-handler";
import {ProductRestService} from "../../../shared/rest/product-rest.service";
import {Product} from "../../../shared/model/domain/product";

@Injectable()
export class ProductCreateService implements OnDestroy {

  private readonly createAction = new Subject<ProductFormHandler>();

  private readonly saved = new BehaviorSubject<boolean>(false);
  private readonly saving = new BehaviorSubject<boolean>(false);

  readonly saved$: Observable<boolean> = this.saved.pipe(distinctUntilChanged());
  readonly saving$: Observable<boolean> = this.saving.pipe(distinctUntilChanged());

  private readonly subscription: Subscription;

  constructor(private restService: ProductRestService) {
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
          tap(() =>{
            this.saving.next(false);
            this.saved.next(true);
          }),
          catchError((error) => {
            console.error(error);
            return throwError(error);
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
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
