import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe, RecipeCU } from '../../../module/recipe/-model/recipe';
import { DayOfEating, DayOfEatingLite } from '../../model/domain/day-of-eating';

class DayOfEatingBegin {}

@Injectable({
  providedIn: 'root',
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

  update(recipe: RecipeCU): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.API_URL}/${recipe.id}`, recipe);
  }

  create(begin: DayOfEatingBegin): Observable<number> {
    return this.http.post<number>(`${this.API_URL}`, begin);
  }
}
