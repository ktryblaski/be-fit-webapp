import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, merge, noop, Observable, Subject, Subscription, throwError} from "rxjs";
import {Product} from "../../../shared/model/domain/product";
import {catchError, distinctUntilChanged, ignoreElements, switchMap, tap} from "rxjs/operators";
import {ProductRestService} from "../../../shared/rest/product-rest.service";

@Injectable()
export class ProductsListService implements OnDestroy {

  private readonly loadAction = new Subject();

  private readonly products = new BehaviorSubject<Product[]>(null);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);

  readonly products$: Observable<Product[]> = this.products.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: ProductRestService) {
    this.subscription = merge(
      this.loadEffect()
    ).subscribe(noop);
  }

  load(): void {
    this.loadAction.next();
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
      }),
      switchMap(() => this.restService.getProducts().pipe(
        tap((products: Product[]) => {
          this.products.next(products);
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
