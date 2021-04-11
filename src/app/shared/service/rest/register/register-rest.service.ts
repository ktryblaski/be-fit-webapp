import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RegisterUserRequestDto} from './-model/register-user-request.dto';

@Injectable({
  providedIn: 'root',
})
export class RegisterRestService {

  private readonly API_URL = '/api/registration';

  constructor(private http: HttpClient) { }

  register(user: RegisterUserRequestDto): Observable<never> {
    return this.http.post<never>(`${this.API_URL}/register`, user);
  }

}
