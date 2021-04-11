import { Injectable } from '@angular/core';
import {AuthRestService} from './rest/auth/auth-rest.service';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginRequestDto} from './rest/auth/dto/login-request.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated: boolean = null;


  constructor(private restService: AuthRestService) { }


  login(login: LoginRequestDto): Observable<void> {
    return this.restService.login(login).pipe(
      tap(() => {
        this.authenticated = true;
      }),
      catchError((error: HttpErrorResponse) => {
        this.authenticated = false;
        return throwError(error);
      })
    );
  }

  logout(): Observable<void> {
    return this.restService.logout().pipe(
      tap(() => {
        this.authenticated = false;
      })
    );
  }

  checkAuthentication(): Observable<boolean> {
    return this.restService.checkAuthentication().pipe(
      map(() => {
        return this.authenticated = true;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authenticated = false;
          return of(false);
        }

        return throwError(error);
      })
    );
  }

  invalidAuthentication(): void {
    this.authenticated = false;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

}
