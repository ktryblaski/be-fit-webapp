import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import {RegisterRestService} from '../../shared/service/rest/register/register-rest.service';
import {ErrorModalService} from '../../shared/component/error-modal/error-modal.service';
import {NotificationService} from '../../shared/component/notification/notification.service';
import {RegisterUserRequestDto} from '../../shared/service/rest/register/-model/register-user-request.dto';
import {NotificationSeverity} from '../../shared/component/notification/notification';
import {Router} from '@angular/router';

@Injectable()
export class RegisterService implements OnDestroy {

  private readonly registerAction = new Subject<RegisterUserRequestDto>();

  private readonly registering = new BehaviorSubject<boolean>(false);
  private readonly registered = new BehaviorSubject<boolean>(false);

  readonly registering$: Observable<boolean> = this.registering.pipe(distinctUntilChanged());
  readonly registered$: Observable<boolean> = this.registered.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private errorModalService: ErrorModalService,
              private notificationService: NotificationService,
              private restService: RegisterRestService,
              private router: Router) {

    this.subscription = merge(
      this.registerEffect()
    ).subscribe(noop);
  }

  register(user: RegisterUserRequestDto): void {
    this.registerAction.next(user);
  }

  private registerEffect(): Observable<never> {
    return this.registerAction.pipe(
      tap(() => this.registering.next(true)),
      switchMap(user => this.restService.register(user).pipe(
        tap(() => {
          this.registered.next(true);
          this.notificationService.show({
            message: 'Register successful',
            severity: NotificationSeverity.SUCCESS
          });
          this.router.navigate(['login']);
        }),
        catchError(error => {
          console.error(error);
          this.errorModalService.showError('An error has occurred while registering new user');
          return EMPTY;
        }),
        finalize(() => this.registering.next(false))
      )),
      ignoreElements()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
