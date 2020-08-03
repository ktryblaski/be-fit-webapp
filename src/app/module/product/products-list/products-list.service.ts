import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription} from "rxjs";
import {Product} from "../../../shared/model/domain/product";
import {catchError, distinctUntilChanged, ignoreElements, switchMap, tap} from "rxjs/operators";
import {ProductRestService} from "../../../shared/service/rest/product-rest.service";
import {NotificationService} from "../../../shared/component/notification/notification.service";
import {NotificationSeverity} from "../../../shared/component/notification/notification";

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

  constructor(private restService: ProductRestService,
              private notificationService: NotificationService) {
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
          this.loading.next(false);
          this.notificationService.show({
            message: 'An error has occurred',
            severity: NotificationSeverity.DANGER
          })
          return EMPTY;
        })
      )),
      ignoreElements()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
