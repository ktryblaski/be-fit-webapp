import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MealTemplate, MealTemplateCU} from '../../model/domain/meal-template';

@Injectable({
  providedIn: 'root'
})
export class MealTemplateRestService {

  private readonly API_URL = '/api/meal-templates';

  constructor(private http: HttpClient) {}

  get(mealTemplateId: number): Observable<MealTemplate> {
    return this.http.get<MealTemplate>(`${this.API_URL}/${mealTemplateId}`);
  }

  findAll(): Observable<MealTemplate[]> {
    return this.http.get<MealTemplate[]>(`${this.API_URL}`);
  }

  create(mealTemplate: MealTemplateCU): Observable<number> {
    return this.http.post<number>(`${this.API_URL}`, mealTemplate);
  }

  update(mealTemplate: MealTemplateCU, mealId: number): Observable<MealTemplate> {
    mealTemplate.id = mealId; // TODO
    return this.http.put<MealTemplate>(`${this.API_URL}/${mealTemplate.id}`, mealTemplate);
  }

}
