import {Injectable, OnDestroy} from '@angular/core';
import {DietRestService} from "../../../shared/service/rest/diet-rest.service";
import {BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription} from "rxjs";
import {DietView} from "../../../shared/model/domain/diet";
import {catchError, distinctUntilChanged, ignoreElements, switchMap, tap} from "rxjs/operators";
import {NotificationService} from "../../../shared/service/notification.service";
import {NotificationSeverity} from "../../../shared/component/notification/notification";

@Injectable()
export class DietsListService implements OnDestroy {

  private readonly loadAction: Subject<never> = new Subject<never>();

  private readonly diets: BehaviorSubject<DietView[]> = new BehaviorSubject<DietView[]>(null);
  private readonly loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  readonly diets$: Observable<DietView[]> = this.diets.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: DietRestService,
              private notificationService: NotificationService) {

    this.subscription = merge(
      this.loadEffect()
    ).subscribe(noop);
  }

  load(): void {
    this.loadAction.next();
  }

  loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true)
      }),
      switchMap(() => this.restService.getDietsLite().pipe(
        tap((diets: DietView[]) => {
          this.diets.next(diets);
          this.loading.next(false);
          this.loaded.next(true);
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
