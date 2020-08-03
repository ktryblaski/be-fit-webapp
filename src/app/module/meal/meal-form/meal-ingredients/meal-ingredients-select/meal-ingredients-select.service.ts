import {Injectable, OnDestroy} from "@angular/core";
import {ProductRestService} from "../../../../../shared/service/rest/product-rest.service";
import {BehaviorSubject, EMPTY, noop, Observable, Subject, Subscription} from "rxjs";
import {Product} from "../../../../../shared/model/domain/product";
import {catchError, distinctUntilChanged, ignoreElements, switchMap, tap} from "rxjs/operators";
import {NotificationSeverity} from "../../../../../shared/component/notification/notification";
import {NotificationService} from "../../../../../shared/component/notification/notification.service";

@Injectable()
export class MealIngredientsSelectService implements OnDestroy {

  private readonly loadAction: Subject<never> = new Subject<never>();

  private readonly products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private readonly loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  readonly products$: Observable<Product[]> = this.products.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());

  private readonly subscription: Subscription;

  constructor(private restService: ProductRestService,
              private notificationService: NotificationService) {

    this.subscription = this.loadEffect().subscribe(noop);
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
          this.products.next(products)
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
