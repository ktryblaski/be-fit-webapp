import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Meal, MealDTO, MealView} from '../../model/domain/meal';

@Injectable({
  providedIn: 'root'
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

  create(meal: MealDTO): Observable<number> {
    return this.http.post<number>(`${this.API_URL}`, meal);
  }

  update(meal: MealDTO, mealId: number): Observable<Meal> {
    meal.id = mealId; // TODO
    return this.http.put<Meal>(`${this.API_URL}/${meal.id}`, meal);
  }

}
