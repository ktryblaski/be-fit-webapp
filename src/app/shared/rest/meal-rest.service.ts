import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Meal, MealView} from "../model/domain/meal";

@Injectable({
  providedIn: "root"
})
export class MealRestService {

  private readonly API_URL = '/api/meals';

  constructor(private http: HttpClient) {}

  getMealsLite(): Observable<MealView[]> {
    return this.http.get<MealView[]>(`${this.API_URL}/lite`);
  }

  getMeal(mealId: number): Observable<Meal> {
    return this.http.get<Meal>(`${this.API_URL}/${mealId}`);
  }

}
