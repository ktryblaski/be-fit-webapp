import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, EMPTY, noop, Observable, Subject, Subscription} from 'rxjs';
import {catchError, distinctUntilChanged, ignoreElements, switchMap, tap} from 'rxjs/operators';
import {LoginRequestDto} from '../../shared/service/rest/auth/dto/login-request.dto';
import {AuthService} from '../../shared/service/auth.service';
import {NotificationService} from '../../shared/component/notification/notification.service';
import {Router} from '@angular/router';
import {NotificationSeverity} from '../../shared/component/notification/notification';

@Injectable()
export class LoginService implements OnDestroy {

  private readonly loginAction = new Subject<LoginRequestDto>();

  private readonly logging = new BehaviorSubject<boolean>(false);

  readonly logging$: Observable<boolean> = this.logging.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private router: Router) {

    this.subscription = this.loginEffect().subscribe(noop);
  }

  login(login: LoginRequestDto) {
    this.loginAction.next(login);
  }

  private loginEffect(): Observable<never> {
    return this.loginAction.pipe(
      tap(() => {
        this.logging.next(true);
      }),
      switchMap(login => this.authService.login(login).pipe(
        tap(() => {
          this.notificationService.show({
            message: 'Login successful',
            severity: NotificationSeverity.INFO
          });
          this.logging.next(false);
          this.router.navigate(['']);
        }),
        catchError(() => {
          this.logging.next(false);
          this.notificationService.show({
            message: 'E-mail or password are invalid',
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
