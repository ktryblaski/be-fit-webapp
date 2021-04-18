import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class UserRestService {

  private readonly API_URL = `${environment.API_URL}/api/user`;

  constructor(private http: HttpClient) {}

}
