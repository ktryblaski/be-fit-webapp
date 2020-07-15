import {Injectable, OnDestroy} from '@angular/core';
import {ProductRestService} from "../../../shared/rest/product-rest.service";
import {BehaviorSubject, merge, noop, Observable, Subject, Subscription, throwError} from "rxjs";
import {Product} from "../../../shared/model/domain/product";
import {catchError, distinctUntilChanged, ignoreElements, switchMap, tap} from "rxjs/operators";

@Injectable()
export class ProductDialogService implements OnDestroy {

  private readonly loadAction = new Subject<number>();

  private readonly product = new BehaviorSubject<Product>(null);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);

  readonly product$: Observable<Product> = this.product.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: ProductRestService) {
    this.subscription = merge(
      this.loadEffect()
    ).subscribe(noop);
  }

  load(productId: number): void {
    this.loadAction.next(productId);
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
      }),
      switchMap((productId: number) => this.restService.getProduct(productId).pipe(
        tap((product: Product) => {
          this.product.next(product);
          this.loaded.next(true);
          this.loading.next(false);
        }),
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      )),
      ignoreElements()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
