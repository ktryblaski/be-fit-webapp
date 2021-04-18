import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO
    return next.handle(req).pipe(
      catchError(error => this.redirectToLoginIfUnauthorized(error)),
    );
  }

  private redirectToLoginIfUnauthorized(event: HttpEvent<any>): Observable<HttpEvent<any>> {
    // TODO
    return throwError(event);
  }

}


