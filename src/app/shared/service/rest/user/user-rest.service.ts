import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRestService {

  private readonly API_URL = '/api/user';

  constructor(private http: HttpClient) {}

  existsByEmail(email: string): Observable<boolean> {
    const queryParams: { [key: string]: string | string[] } = { email };

    return this.http.get<boolean>(`${this.API_URL}/exists-by-mail`, { params: queryParams });
  }

}
