import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe, RecipeCU } from '../../model/domain/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeRestService {
  private readonly API_URL = '/api/recipes';

  constructor(private http: HttpClient) {}

  getOne(recipeId: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.API_URL}/${recipeId}`);
  }

  findAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.API_URL}`);
  }

  findAllActive(): Observable<Recipe[]> {
    const params = {
      onlyActive: String(true),
    };

    return this.http.get<Recipe[]>(`${this.API_URL}`, { params });
  }

  create(recipe: RecipeCU): Observable<number> {
    return this.http.post<number>(`${this.API_URL}`, recipe);
  }

  update(recipe: RecipeCU): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.API_URL}/${recipe.id}`, recipe);
  }

  activate(recipeId: number): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.API_URL}/${recipeId}/activate`, {});
  }

  deactivate(recipeId: number): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.API_URL}/${recipeId}/deactivate`, {});
  }
}
