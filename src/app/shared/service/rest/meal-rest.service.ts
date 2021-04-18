import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meal, MealDTO, MealView } from '../../model/domain/meal';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class MealRestService {

  private readonly API_URL = `${environment.API_URL}/meals`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<MealView[]> {
    return this.http.get<MealView[]>(`${this.API_URL}`);
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
