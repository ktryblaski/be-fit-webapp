import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  readonly DISABLED_URLS = ['/api/auth/check-authentication', '/api/auth/login'];

  constructor(private authService: AuthService,
              private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => this.redirectToLoginIfUnauthorized(error)),
    );
  }

  private redirectToLoginIfUnauthorized(event: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (event instanceof HttpErrorResponse && event.status === 401 && !this.isDisabledURL(event.url)) {
      this.authService.invalidAuthentication();
      this.router.navigate(['/', 'login']);

      return EMPTY;
    }

    return throwError(event);
  }

  isDisabledURL(requestURL: string): boolean {
    console.log(requestURL);
    return this.DISABLED_URLS.some(url => requestURL.indexOf(url) !== -1);
  }

}


