import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MealView} from "../model/domain/meal";

@Injectable({
  providedIn: "root"
})
export class MealRestService {

  private readonly API_URL = '/api/meals/lite';

  constructor(private http: HttpClient) {}

  getMealsLite(): Observable<MealView[]> {
    return this.http.get<MealView[]>(this.API_URL);
  }

}
