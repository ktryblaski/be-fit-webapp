import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginRequestDto} from './dto/login-request.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthRestService {

  private readonly API_URL = '/api/auth';


  constructor(private http: HttpClient) { }


  login(login: LoginRequestDto): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/login`, login);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/logout`, {});
  }

  checkAuthentication(): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/check-authentication`, {});
  }

}
