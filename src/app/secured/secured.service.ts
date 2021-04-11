import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, EMPTY, noop, Observable, Subject, Subscription} from 'rxjs';
import {catchError, distinctUntilChanged, ignoreElements, switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../shared/service/auth.service';
import {NotificationService} from '../shared/component/notification/notification.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationSeverity} from '../shared/component/notification/notification';

@Injectable()
export class SecuredService implements OnDestroy {

  private logoutAction = new Subject();

  private logouting = new BehaviorSubject<boolean>(false);

  logouting$: Observable<boolean> = this.logouting.pipe(distinctUntilChanged());

  private subscription: Subscription;


  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private router: Router) {

    this.subscription = this.logoutEffect().subscribe(noop);
  }


  logout(): void {
    this.logoutAction.next(true);
  }

  private logoutEffect(): Observable<never> {
    return this.logoutAction.pipe(
      tap(() => {
        this.logouting.next(true);
      }),
      switchMap(() => this.authService.logout().pipe(
        tap(() => {
          this.logouting.next(false);
          this.notificationService.show({
            message: 'User has been logged out',
            severity: NotificationSeverity.INFO
          });
          this.router.navigate(['']);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.logouting.next(false);
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
