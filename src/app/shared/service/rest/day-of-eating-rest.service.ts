import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealTemplate, MealTemplateCU } from '../../model/domain/meal-template';
import { DayOfEating, DayOfEatingLite } from '../../model/domain/day-of-eating';

class DayOfEatingBegin {
}

@Injectable({
  providedIn: 'root'
})
export class DayOfEatingRestService {

  private readonly API_URL = '/api/days-of-eating';

  constructor(private http: HttpClient) {}

  get(id: number): Observable<DayOfEating> {
    return this.http.get<DayOfEating>(`${this.API_URL}/${id}`);
  }

  findAllLites(): Observable<DayOfEatingLite[]> {
    return this.http.get<DayOfEatingLite[]>(`${this.API_URL}/lite`);
  }

  begin(): Observable<number> {
    return this.http.post<number>(`${this.API_URL}`, {});
  }

  canBeginDayOfEating(): Observable<boolean> {
    return this.http.get<boolean>(`${this.API_URL}/can-begin-day-of-eating`);
  }

  update(mealTemplate: MealTemplateCU): Observable<MealTemplate> {
    return this.http.put<MealTemplate>(`${this.API_URL}/${mealTemplate.id}`, mealTemplate);
  }

  create(begin: DayOfEatingBegin): Observable<number> {
    return this.http.post<number>(`${this.API_URL}`, begin);
  }

  // update(mealTemplate: MealTemplateCU, mealId: number): Observable<MealTemplate> {
  //   mealTemplate.id = mealId; // TODO
  //   return this.http.put<MealTemplate>(`${this.API_URL}/${mealTemplate.id}`, mealTemplate);
  // }

}
