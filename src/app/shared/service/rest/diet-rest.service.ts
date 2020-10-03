import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Diet, DietDTO, DietView} from '../../model/domain/diet';

@Injectable({
  providedIn: 'root'
})
export class DietRestService {

  private readonly API_URL = '/api/diets';

  constructor(private http: HttpClient) {}

  getDietsLite(): Observable<DietView[]> {
    return this.http.get<DietView[]>(`${this.API_URL}/lite`);
  }

  getDiet(dietId: number): Observable<Diet> {
    return this.http.get<Diet>(`${this.API_URL}/${dietId}`);
  }

  create(diet: DietDTO): Observable<number> {
    return this.http.post<number>(`${this.API_URL}`, diet);
  }

  update(diet: DietDTO, dietId: number): Observable<Diet> {
    diet.id = dietId; // TODO
    return this.http.put<Diet>(`${this.API_URL}/${diet.id}`, diet);
  }

}
