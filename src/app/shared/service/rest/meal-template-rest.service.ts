import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealTemplate, MealTemplateCU } from '../../model/domain/meal-template';

@Injectable({
  providedIn: 'root',
})
export class MealTemplateRestService {
  private readonly API_URL = '/api/meal-templates';

  constructor(private http: HttpClient) {}

  getOne(mealTemplateId: number): Observable<MealTemplate> {
    return this.http.get<MealTemplate>(`${this.API_URL}/${mealTemplateId}`);
  }

  findAll(): Observable<MealTemplate[]> {
    return this.http.get<MealTemplate[]>(`${this.API_URL}`);
  }

  findAllActive(): Observable<MealTemplate[]> {
    const params = {
      onlyActive: String(true),
    };

    return this.http.get<MealTemplate[]>(`${this.API_URL}`, { params });
  }

  create(mealTemplate: MealTemplateCU): Observable<number> {
    return this.http.post<number>(`${this.API_URL}`, mealTemplate);
  }

  update(mealTemplate: MealTemplateCU): Observable<MealTemplate> {
    return this.http.put<MealTemplate>(`${this.API_URL}/${mealTemplate.id}`, mealTemplate);
  }

  activate(mealTemplateId: number): Observable<MealTemplate> {
    return this.http.post<MealTemplate>(`${this.API_URL}/${mealTemplateId}/activate`, {});
  }

  deactivate(mealTemplateId: number): Observable<MealTemplate> {
    return this.http.post<MealTemplate>(`${this.API_URL}/${mealTemplateId}/deactivate`, {});
  }
}
