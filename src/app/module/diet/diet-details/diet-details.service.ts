import {Injectable, OnDestroy} from '@angular/core';
import {DietRestService} from '../../../shared/service/rest/diet-rest.service';
import {NotificationService} from '../../../shared/component/notification/notification.service';
import {BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription} from 'rxjs';
import {catchError, distinctUntilChanged, ignoreElements, switchMap, tap} from 'rxjs/operators';
import {NotificationSeverity} from '../../../shared/component/notification/notification';
import {Diet} from '../../../shared/model/domain/diet';

@Injectable()
export class DietDetailsService implements OnDestroy {

  private readonly loadAction = new Subject<number>();

  private readonly diet = new BehaviorSubject<Diet>(null);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);

  readonly diet$: Observable<Diet> = this.diet.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: DietRestService,
              private notificationService: NotificationService) {

    this.subscription = merge(
      this.loadEffect()
    ).subscribe(noop);
  }

  load(dietId: number): void {
    this.loadAction.next(dietId);
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
      }),
      switchMap((dietId: number) => this.restService.getDiet(dietId).pipe(
        tap((diet: Diet) => {
          this.diet.next(diet);
          this.loaded.next(true);
          this.loading.next(false);
        }),
        catchError((error) => {
          console.error(error);
          this.loading.next(false);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
