import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Component} from "../model/domain/component";

@Injectable({
  providedIn: "root"
})
export class ComponentRestService {

  private readonly API_URL = '/api/components';

  constructor(private http: HttpClient) {}

  getComponents(): Observable<Component[]> {
    return this.http.get<Component[]>(this.API_URL);
  }

}
