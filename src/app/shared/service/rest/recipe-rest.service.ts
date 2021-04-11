import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe, RecipeCU } from '../../../secured/module/recipe/-model/recipe';
import { RecipeLite } from '../../../secured/module/recipe/-model/recipe-lite';
import { RecipesSearchParams } from '../../../secured/module/recipe/recipe-list/-model/recipes.search-params';
import { SortOrder } from '../../component/sort/-model/sort-order';
import { PagedDTO } from '../../dto/table/paged.dto';

@Injectable({
  providedIn: 'root',
})
export class RecipeRestService {
  private readonly API_URL = '/api/recipes';

  constructor(private http: HttpClient) {}

  getOne(recipeId: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.API_URL}/${recipeId}`);
  }

  findAll(params: RecipesSearchParams): Observable<PagedDTO<RecipeLite>> {
    const queryParams: { [key: string]: string | string[] } = { };

    if (params?.sort) {
      const order = params.sort.sortOrder === SortOrder.ASC ? '+' : '-';
      queryParams.sort = `${order}${params.sort.sortBy}`;
    }

    if (params?.pagination?.page && params?.pagination?.pageSize) {
      queryParams.page = String(params.pagination.page - 1);
      queryParams.pageSize = String(params.pagination.pageSize);
    }

    return this.http.get<PagedDTO<RecipeLite>>(`${this.API_URL}`, { params: queryParams });
  }

  findAllLegacy(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.API_URL}`);
  }

  findAllActiveLegacy(): Observable<Recipe[]> {
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
