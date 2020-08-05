import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Meal, MealDTO, MealView} from "../../model/domain/meal";
import {map} from "rxjs/operators";
import {ApiResponse, mapResponse} from "../../model/domain/response";

@Injectable({
  providedIn: "root"
})
export class MealRestService {

  private readonly API_URL = '/api/meals';

  constructor(private http: HttpClient) {}

  getMealsLite(): Observable<MealView[]> {
    return this.http.get<ApiResponse<MealView[]>>(`${this.API_URL}/lite`)
      .pipe(map(mapResponse));
  }

  getMeal(mealId: number): Observable<Meal> {
    return this.http.get<ApiResponse<Meal>>(`${this.API_URL}/${mealId}`)
      .pipe(map(mapResponse));
  }

  create(meal: MealDTO): Observable<number> {
    return this.http.post<ApiResponse<number>>(`${this.API_URL}`, meal)
      .pipe(map(mapResponse));
  }

  update(meal: MealDTO, mealId: number): Observable<Meal> {
    meal.id = mealId;
    return this.http.put<ApiResponse<Meal>>(`${this.API_URL}/${meal.id}`, meal)
      .pipe(map(mapResponse));
  }

}
